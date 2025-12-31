import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Users, TrendingUp, Coins, Star, Search, Building2, CheckCircle2 } from 'lucide-react';

interface Queue {
  id: string;
  name: string;
  organization: string;
  currentWait: number;
  peopleAhead: number;
  category: string;
  location: string;
  peakHours: string;
}

interface UserDashboardProps {
  onBack: () => void;
}

export function UserDashboard({ onBack }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'join' | 'active' | 'rewards'>('join');
  const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [joined, setJoined] = useState(false);
  const [position, setPosition] = useState(0);
  const [eta, setEta] = useState(0);
  const [tokens, setTokens] = useState(127);

  const queues: Queue[] = [
    {
      id: '1',
      name: 'General Consultation',
      organization: 'City Hospital',
      currentWait: 25,
      peopleAhead: 8,
      category: 'Healthcare',
      location: 'Downtown',
      peakHours: '9AM - 12PM',
    },
    {
      id: '2',
      name: 'Account Services',
      organization: 'National Bank',
      currentWait: 15,
      peopleAhead: 5,
      category: 'Banking',
      location: 'Main Branch',
      peakHours: '10AM - 2PM',
    },
    {
      id: '3',
      name: 'License Renewal',
      organization: 'DMV Office',
      currentWait: 45,
      peopleAhead: 15,
      category: 'Government',
      location: 'Central',
      peakHours: '8AM - 11AM',
    },
    {
      id: '4',
      name: 'COVID Vaccination',
      organization: 'Community Health Center',
      currentWait: 12,
      peopleAhead: 4,
      category: 'Healthcare',
      location: 'East Side',
      peakHours: '2PM - 5PM',
    },
  ];

  const filteredQueues = queues.filter(
    q =>
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (joined) {
      const interval = setInterval(() => {
        setPosition(prev => {
          if (prev > 1) return prev - 1;
          return prev;
        });
        setEta(prev => {
          if (prev > 0) return Math.max(0, prev - 1);
          return prev;
        });
        setTokens(prev => prev + 0.5);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [joined]);

  const handleJoinQueue = (queue: Queue) => {
    setSelectedQueue(queue);
    setPosition(queue.peopleAhead);
    setEta(queue.currentWait);
    setJoined(true);
    setActiveTab('active');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
              <span className="text-2xl font-bold text-white">ZeroQ</span>
            </button>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">{tokens.toFixed(1)} ZQX</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
          {[
            { id: 'join', label: 'Join Queue', icon: Search },
            { id: 'active', label: 'Active Queue', icon: Clock },
            { id: 'rewards', label: 'My Rewards', icon: Coins },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'join' && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search queues, organizations, or categories..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Queue Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredQueues.map((queue, index) => (
                  <motion.div
                    key={queue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-slate-400">{queue.organization}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{queue.name}</h3>
                      </div>
                      <div className="px-3 py-1 bg-purple-600/20 rounded-lg text-sm text-purple-300 border border-purple-500/30">
                        {queue.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Current Wait</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">{queue.currentWait} min</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Users className="w-4 h-4" />
                          <span>People Ahead</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">{queue.peopleAhead}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>{queue.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>Peak: {queue.peakHours}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinQueue(queue)}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                    >
                      Join Queue
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {joined && selectedQueue ? (
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Status Card */}
                  <div className="relative p-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-green-300 text-sm font-semibold">In Queue</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedQueue.name}</h2>
                        <p className="text-slate-300">{selectedQueue.organization}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                          <div className="text-5xl font-bold text-purple-400 mb-2">{position}</div>
                          <div className="text-slate-400">Position in Queue</div>
                        </div>
                        <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                          <div className="text-5xl font-bold text-blue-400 mb-2">{eta}</div>
                          <div className="text-slate-400">Minutes Remaining</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((selectedQueue.peopleAhead - position) / selectedQueue.peopleAhead) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-slate-400">
                          <span>Joined</span>
                          <span>Your Turn</span>
                        </div>
                      </div>

                      {/* Earning Tokens */}
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                              <Coins className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                              <div className="text-white font-semibold">Earning Rewards</div>
                              <div className="text-sm text-slate-400">+0.5 ZQX per 5 minutes</div>
                            </div>
                          </div>
                          <div className="text-yellow-400 font-bold text-xl">+{((selectedQueue.currentWait - eta) * 0.5 / 5).toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Updates */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Live Updates
                    </h3>
                    <div className="space-y-3">
                      {[
                        { time: 'Just now', text: 'Position updated: You moved up 1 spot' },
                        { time: '2 min ago', text: 'ETA recalculated based on service speed' },
                        { time: '5 min ago', text: 'Earned +0.5 ZQX tokens for waiting' },
                      ].map((update, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <div className="text-slate-500 min-w-[80px]">{update.time}</div>
                          <div className="text-slate-300">{update.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                    <Clock className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Active Queue</h3>
                  <p className="text-slate-400 mb-6">Join a queue to start tracking your wait time</p>
                  <button
                    onClick={() => setActiveTab('join')}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl"
                  >
                    Browse Queues
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Token Balance */}
              <div className="relative p-8 bg-gradient-to-br from-yellow-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-yellow-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.1),transparent_50%)]" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-slate-400 mb-2">Total Balance</div>
                      <div className="text-6xl font-bold text-white">{tokens.toFixed(1)} <span className="text-3xl text-yellow-400">ZQX</span></div>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                      <Coins className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                      <div className="text-slate-400 text-sm mb-1">Today</div>
                      <div className="text-2xl font-bold text-green-400">+12.5</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                      <div className="text-slate-400 text-sm mb-1">This Week</div>
                      <div className="text-2xl font-bold text-blue-400">+47.0</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                      <div className="text-slate-400 text-sm mb-1">All Time</div>
                      <div className="text-2xl font-bold text-purple-400">{tokens.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earning Activities */}
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Earning Activities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: '🎯', action: 'Join Queue', reward: '+1 ZQX', color: 'purple' },
                    { icon: '⏱️', action: 'Wait in Queue (per 5 min)', reward: '+0.5 ZQX', color: 'blue' },
                    { icon: '⭐', action: 'Provide Feedback', reward: '+2 ZQX', color: 'yellow' },
                    { icon: '🤝', action: 'Refer Organization', reward: '+5 ZQX', color: 'green' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-3xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{activity.action}</div>
                        <div className={`text-${activity.color}-400 font-bold`}>{activity.reward}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Earned', amount: '+2.0', desc: 'Provided feedback - City Hospital', time: '10 min ago' },
                    { type: 'Earned', amount: '+1.0', desc: 'Joined queue - National Bank', time: '1 hour ago' },
                    { type: 'Earned', amount: '+0.5', desc: 'Wait time reward', time: '1 hour ago' },
                    { type: 'Redeemed', amount: '-10.0', desc: 'Coupon redemption', time: '2 days ago' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'Earned' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {tx.type === 'Earned' ? <Star className="w-5 h-5 text-green-400" /> : <Coins className="w-5 h-5 text-red-400" />}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{tx.desc}</div>
                          <div className="text-sm text-slate-400">{tx.time}</div>
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${tx.type === 'Earned' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.amount} ZQX
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
