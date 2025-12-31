import { useEffect, useRef, useState } from 'react';

interface FluidRevealImageProps {
  topImage: string;
  bottomImage: string;
  className?: string;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

export function FluidRevealImage({ topImage, bottomImage, className = '' }: FluidRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topImgRef = useRef<HTMLImageElement>(null);
  const bottomImgRef = useRef<HTMLImageElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const pointsRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number>();
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    // Initialize blob points around the cursor
    const numPoints = 16;
    const radius = 80;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      pointsRef.current.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        targetX: Math.cos(angle) * radius,
        targetY: Math.sin(angle) * radius,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (!ctx || !topImgRef.current || !bottomImgRef.current) return;

      // Smooth mouse following with delay
      const easing = 0.15;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * easing;
      mouseRef.current.y += (targetMouseRef.current.y - targetMouseRef.current.y) * easing;

      // Update blob points with inertia and deformation
      const points = pointsRef.current;
      const baseRadius = 80;
      const deformAmount = 15;
      
      points.forEach((point, i) => {
        const angle = (i / points.length) * Math.PI * 2;
        
        // Add wave-like deformation to the edge
        const time = Date.now() * 0.001;
        const wave = Math.sin(time * 2 + i * 0.5) * deformAmount;
        const dynamicRadius = baseRadius + wave;
        
        // Target position with deformation
        point.targetX = Math.cos(angle) * dynamicRadius;
        point.targetY = Math.sin(angle) * dynamicRadius;
        
        // Spring physics for smooth, organic motion
        const dx = point.targetX - point.x;
        const dy = point.targetY - point.y;
        
        const springStrength = 0.05;
        const damping = 0.85;
        
        point.vx += dx * springStrength;
        point.vy += dy * springStrength;
        
        point.vx *= damping;
        point.vy *= damping;
        
        point.x += point.vx;
        point.y += point.vy;
      });

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bottom image (revealed image)
      ctx.drawImage(bottomImgRef.current, 0, 0, canvas.width, canvas.height);

      // Create fluid blob mask using metaballs algorithm
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Only apply mask if mouse is in bounds
      if (mouseRef.current.x > -500 && mouseRef.current.y > -500) {
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            
            // Calculate metaball influence from all blob points
            let influence = 0;
            points.forEach(point => {
              const px = mouseRef.current.x + point.x;
              const py = mouseRef.current.y + point.y;
              const pdx = x - px;
              const pdy = y - py;
              const dist = Math.sqrt(pdx * pdx + pdy * pdy);
              
              if (dist > 0) {
                influence += 1000 / (dist * dist);
              }
            });

            // Threshold for blob visibility with soft falloff
            const threshold = 1.5;
            const idx = (y * canvas.width + x) * 4;
            
            if (influence < threshold) {
              // Outside blob - draw top image
              const topCtx = document.createElement('canvas').getContext('2d');
              if (topCtx) {
                const tempCanvas = topCtx.canvas;
                tempCanvas.width = topImgRef.current.width;
                tempCanvas.height = topImgRef.current.height;
                topCtx.drawImage(topImgRef.current, 0, 0);
                
                const sx = (x / canvas.width) * topImgRef.current.width;
                const sy = (y / canvas.height) * topImgRef.current.height;
                const topPixel = topCtx.getImageData(sx, sy, 1, 1).data;
                
                data[idx] = topPixel[0];
                data[idx + 1] = topPixel[1];
                data[idx + 2] = topPixel[2];
                data[idx + 3] = topPixel[3];
              }
            } else {
              // Add soft glow at edges
              const edgeFactor = Math.min((influence - threshold) / 0.5, 1);
              const glowAmount = (1 - edgeFactor) * 20;
              
              data[idx] = Math.min(255, data[idx] + glowAmount);
              data[idx + 1] = Math.min(255, data[idx + 1] + glowAmount);
              data[idx + 2] = Math.min(255, data[idx + 2] + glowAmount);
            }
          }
        }
      } else {
        // Mouse out of bounds - show only top image
        ctx.drawImage(topImgRef.current, 0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (imagesLoaded === 2) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={topImgRef}
        src={topImage}
        alt="Top layer"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      <img
        ref={bottomImgRef}
        src={bottomImage}
        alt="Bottom layer"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: imagesLoaded === 2 ? 'block' : 'none' }}
      />
      {imagesLoaded < 2 && (
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 animate-pulse" />
      )}
    </div>
  );
}
