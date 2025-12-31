import { FluidRevealImage } from './FluidRevealImage';
import { ArrowRight, Zap, Brain, Coins, Clock, Users, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section with Fluid Reveal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300">AI-Powered Queue Intelligence</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                  ZeroQ
                </h1>
                <p className="text-4xl lg:text-5xl font-bold text-white">
                  Smart Queue Management
                </p>
                <p className="text-xl text-slate-300 max-w-lg">
                  Eliminate physical waiting lines with AI-powered predictive ETAs, real-time tracking, and blockchain rewards.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onGetStarted}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-purple-400">98%</div>
                  <div className="text-sm text-slate-400">ETA Accuracy</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-400">45min</div>
                  <div className="text-sm text-slate-400">Avg. Time Saved</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-purple-400">50k+</div>
                  <div className="text-sm text-slate-400">Active Users</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Fluid Reveal Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-500/20">
                <FluidRevealImage
                  topImage="https://images.unsplash.com/photo-1765698304057-19515c74569b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBxdWV1ZSUyMHdhaXRpbmd8ZW58MXx8fHwxNzY3MTkxNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  bottomImage="https://images.unsplash.com/photo-1609391144572-83e4bae1d35d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzY3MTY4MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  className="w-full aspect-[4/3]"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-white text-sm">
                    <span className="text-purple-400 font-semibold">Hover to reveal:</span> Transform traditional queues into intelligent waiting experiences
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-5xl font-bold text-white">Why ZeroQ?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Combining AI, ML, and Blockchain for the ultimate queue management experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered ETAs',
                description: 'Machine learning predicts accurate wait times using historical data and real-time queue analysis.',
                color: 'purple',
              },
              {
                icon: Zap,
                title: 'Real-Time Updates',
                description: 'Socket.IO powered live queue tracking keeps you informed every second.',
                color: 'blue',
              },
              {
                icon: Coins,
                title: 'Blockchain Rewards',
                description: 'Earn $ZQX tokens for waiting, giving feedback, and referring businesses.',
                color: 'purple',
              },
              {
                icon: Clock,
                title: 'Predictive Analytics',
                description: 'Dynamic peak-hour detection helps organizations optimize staffing.',
                color: 'blue',
              },
              {
                icon: Users,
                title: 'Multi-Industry',
                description: 'Perfect for hospitals, banks, events, government offices, and more.',
                color: 'purple',
              },
              {
                icon: TrendingUp,
                title: 'Scalable Architecture',
                description: 'Microservices design ready to handle millions of concurrent users.',
                color: 'blue',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-600 to-${feature.color}-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-bold text-white">Ready to Transform Waiting?</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Join thousands of users and organizations experiencing intelligent queue management.
              </p>
              <button
                onClick={onGetStarted}
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 text-lg font-semibold"
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
