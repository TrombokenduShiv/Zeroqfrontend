import { FluidRevealImage } from './FluidRevealImage';
import { ArrowRight, Zap, Brain, Coins, Clock, Users, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20 relative overflow-hidden">
      {/* Japanese Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]" />
      
      {/* Soft Gradient Orbs - Japanese ink wash style */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-200/15 rounded-full blur-3xl" />

      {/* Hero Section with Fluid Reveal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-rose-200/50 rounded-full shadow-sm">
                <Brain className="w-4 h-4 text-rose-500" />
                <span className="text-rose-900/70 text-sm font-light tracking-wide">AI-Powered Queue Intelligence</span>
              </div>

              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-7xl lg:text-8xl font-light tracking-tight text-stone-800"
                >
                  ZeroQ
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl lg:text-4xl font-light text-stone-700"
                >
                  Smart Queue Management
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-lg text-stone-600/80 max-w-lg font-light leading-relaxed"
                >
                  Eliminate physical waiting lines with AI-powered predictive ETAs, real-time tracking, and blockchain rewards.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={onGetStarted}
                  className="group px-10 py-4 bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white rounded-full transition-all duration-700 ease-out flex items-center gap-3 shadow-lg shadow-rose-300/30 hover:shadow-rose-400/40 hover:scale-105"
                >
                  <span className="font-light tracking-wide">Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </button>
                <button className="px-10 py-4 bg-white/70 hover:bg-white backdrop-blur-md text-stone-700 rounded-full border border-stone-200/50 transition-all duration-700 font-light tracking-wide hover:shadow-lg hover:scale-105">
                  Watch Demo
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                <div className="space-y-2">
                  <div className="text-4xl font-light text-rose-500">98%</div>
                  <div className="text-sm text-stone-500 font-light">ETA Accuracy</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-light text-amber-500">45min</div>
                  <div className="text-sm text-stone-500 font-light">Avg. Time Saved</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-light text-indigo-500">50k+</div>
                  <div className="text-sm text-stone-500 font-light">Active Users</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Fluid Reveal Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/40 border border-white/60 bg-white/30 backdrop-blur-sm">
                <FluidRevealImage
                  topImage="https://images.unsplash.com/photo-1765698304057-19515c74569b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBxdWV1ZSUyMHdhaXRpbmd8ZW58MXx8fHwxNzY3MTkxNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  bottomImage="https://images.unsplash.com/photo-1609391144572-83e4bae1d35d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzY3MTY4MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  className="w-full aspect-[4/3]"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/60 shadow-lg"
                >
                  <p className="text-stone-700 text-sm font-light leading-relaxed">
                    <span className="text-rose-500 font-normal">Hover to reveal:</span> Transform traditional queues into intelligent waiting experiences
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-6xl font-light text-stone-800">Why ZeroQ?</h2>
            <p className="text-xl text-stone-600/80 max-w-2xl mx-auto font-light leading-relaxed">
              Combining AI, ML, and Blockchain for the ultimate queue management experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered ETAs',
                description: 'Machine learning predicts accurate wait times using historical data and real-time queue analysis.',
                color: 'rose',
              },
              {
                icon: Zap,
                title: 'Real-Time Updates',
                description: 'Socket.IO powered live queue tracking keeps you informed every second.',
                color: 'amber',
              },
              {
                icon: Coins,
                title: 'Blockchain Rewards',
                description: 'Earn $ZQX tokens for waiting, giving feedback, and referring businesses.',
                color: 'indigo',
              },
              {
                icon: Clock,
                title: 'Predictive Analytics',
                description: 'Dynamic peak-hour detection helps organizations optimize staffing.',
                color: 'teal',
              },
              {
                icon: Users,
                title: 'Multi-Industry',
                description: 'Perfect for hospitals, banks, events, government offices, and more.',
                color: 'rose',
              },
              {
                icon: TrendingUp,
                title: 'Scalable Architecture',
                description: 'Microservices design ready to handle millions of concurrent users.',
                color: 'amber',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-stone-200/50 hover:border-rose-200 hover:shadow-2xl hover:shadow-stone-300/20 transition-all duration-700 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-200 to-${feature.color}-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700 shadow-lg shadow-${feature.color}-200/50`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-2xl font-light text-stone-800 mb-4">{feature.title}</h3>
                <p className="text-stone-600/80 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-16 bg-gradient-to-br from-white/80 via-rose-50/50 to-amber-50/50 backdrop-blur-xl rounded-[3rem] border border-white/60 text-center overflow-hidden shadow-2xl shadow-stone-300/30"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,207,232,0.3),transparent_70%)]" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-5xl font-light text-stone-800">Ready to Transform Waiting?</h2>
              <p className="text-xl text-stone-600/80 max-w-2xl mx-auto font-light leading-relaxed">
                Join thousands of users and organizations experiencing intelligent queue management.
              </p>
              <button
                onClick={onGetStarted}
                className="px-12 py-5 bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white rounded-full transition-all duration-700 shadow-xl shadow-rose-300/40 hover:shadow-rose-400/50 text-lg font-light tracking-wide hover:scale-105"
              >
                Launch Application
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}