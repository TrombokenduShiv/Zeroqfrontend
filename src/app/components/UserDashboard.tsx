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
  const [myTicket, setMyTicket] = useState<{ id: string } | null>(null); // <-- Add this line

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

  const handleCheckIn = async (scannedQrToken: string) => {
    if (!myTicket || !selectedQueue) return; // Guard clause
    const payload = {
        ticketId: myTicket.id,
        queueId: selectedQueue.id,
        qrToken: scannedQrToken
    };
    // Call backend...
    // If success -> Update UI to show "Verified - Green Status"
  };

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
    setMyTicket({ id: Math.random().toString(36).substr(2, 9) }); // <-- Generate a ticket id
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-rose-50/10">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-300/40 group-hover:shadow-rose-400/60 transition-all duration-500 group-hover:scale-105">
                <span className="text-2xl">🧠</span>
              </div>
              <span className="text-3xl font-light text-stone-800 tracking-tight">ZeroQ</span>
            </button>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-100/60 to-rose-100/60 backdrop-blur-md rounded-full border border-amber-200/50 shadow-sm">
                <Coins className="w-5 h-5 text-amber-600" />
                <span className="text-stone-800 font-light tracking-wide">{tokens.toFixed(1)} <span className="text-amber-600">ZQX</span></span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-300 to-amber-300 shadow-lg" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-3 bg-white/60 p-2 rounded-3xl backdrop-blur-md border border-stone-200/50 shadow-lg"
        >
          {[
            { id: 'join', label: 'Join Queue', icon: Search },
            { id: 'active', label: 'Active Queue', icon: Clock },
            { id: 'rewards', label: 'My Rewards', icon: Coins },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl transition-all duration-500 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-xl shadow-rose-300/40 scale-[1.02]'
                  : 'text-stone-500 hover:text-stone-700 hover:bg-white/40'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-light tracking-wide">{tab.label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'join' && (
            <motion.div
              key="join"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search queues, organizations, or categories..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/70 backdrop-blur-md border border-stone-200/50 rounded-3xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300 focus:shadow-lg transition-all duration-500 font-light"
                />
              </div>

              {/* Queue Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredQueues.map((queue, index) => (
                  <motion.div
                    key={queue.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 hover:border-rose-200 hover:shadow-2xl hover:shadow-stone-300/20 transition-all duration-700 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="w-4 h-4 text-rose-400" />
                          <span className="text-sm text-stone-500 font-light">{queue.organization}</span>
                        </div>
                        <h3 className="text-2xl font-light text-stone-800 mb-2">{queue.name}</h3>
                      </div>
                      <div className="px-4 py-2 bg-rose-100/60 backdrop-blur-sm rounded-2xl text-sm text-rose-600 border border-rose-200/50 font-light">
                        {queue.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-stone-500 text-sm font-light">
                          <Clock className="w-4 h-4" />
                          <span>Current Wait</span>
                        </div>
                        <div className="text-3xl font-light text-rose-500">{queue.currentWait} min</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-stone-500 text-sm font-light">
                          <Users className="w-4 h-4" />
                          <span>People Ahead</span>
                        </div>
                        <div className="text-3xl font-light text-amber-500">{queue.peopleAhead}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-stone-200/50">
                      <div className="flex items-center gap-2 text-sm text-stone-500 font-light">
                        <MapPin className="w-4 h-4" />
                        <span>{queue.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-500 font-light">
                        <TrendingUp className="w-4 h-4" />
                        <span>Peak: {queue.peakHours}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinQueue(queue)}
                      className="w-full py-4 bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white rounded-2xl transition-all duration-700 font-light tracking-wide shadow-lg shadow-rose-300/30 hover:shadow-rose-400/50 hover:scale-[1.02]"
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {joined && selectedQueue ? (
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Status Card */}
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative p-10 bg-gradient-to-br from-white/80 via-rose-50/40 to-amber-50/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,207,232,0.2),transparent_60%)]" />
                    
                    <div className="relative z-10 space-y-8">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100/60 backdrop-blur-md border border-emerald-200/50 rounded-full mb-6 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 text-sm font-light tracking-wide">In Queue</span>
                        </div>
                        <h2 className="text-4xl font-light text-stone-800 mb-3">{selectedQueue.name}</h2>
                        <p className="text-stone-600 font-light">{selectedQueue.organization}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg">
                          <div className="text-6xl font-light text-rose-500 mb-3">{position}</div>
                          <div className="text-stone-600 font-light">Position in Queue</div>
                        </div>
                        <div className="text-center p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg">
                          <div className="text-6xl font-light text-amber-500 mb-3">{eta}</div>
                          <div className="text-stone-600 font-light">Minutes Remaining</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="h-3 bg-stone-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className="h-full bg-gradient-to-r from-rose-400 to-amber-400 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((selectedQueue.peopleAhead - position) / selectedQueue.peopleAhead) * 100}%` }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-stone-500 font-light">
                          <span>Joined</span>
                          <span>Your Turn</span>
                        </div>
                      </div>

                      {/* Earning Tokens */}
                      <div className="p-6 bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-3xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center shadow-lg">
                              <Coins className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="text-stone-800 font-light text-lg">Earning Rewards</div>
                              <div className="text-sm text-stone-600 font-light">+0.5 ZQX per 5 minutes</div>
                            </div>
                          </div>
                          <div className="text-amber-600 text-2xl font-light">+{((selectedQueue.currentWait - eta) * 0.5 / 5).toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Live Updates */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
                  >
                    <h3 className="text-stone-800 font-light text-xl mb-6 flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      Live Updates
                    </h3>
                    <div className="space-y-4">
                      {[
                        { time: 'Just now', text: 'Position updated: You moved up 1 spot' },
                        { time: '2 min ago', text: 'ETA recalculated based on service speed' },
                        { time: '5 min ago', text: 'Earned +0.5 ZQX tokens for waiting' },
                      ].map((update, i) => (
                        <motion.div 
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-start gap-4 text-sm font-light"
                        >
                          <div className="text-stone-400 min-w-[80px]">{update.time}</div>
                          <div className="text-stone-700">{update.text}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-32"
                >
                  <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-white/70 backdrop-blur-md flex items-center justify-center border border-stone-200/50 shadow-lg">
                    <Clock className="w-12 h-12 text-stone-400" />
                  </div>
                  <h3 className="text-3xl font-light text-stone-800 mb-3">No Active Queue</h3>
                  <p className="text-stone-600 mb-8 font-light">Join a queue to start tracking your wait time</p>
                  <button
                    onClick={() => setActiveTab('join')}
                    className="px-10 py-4 bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white rounded-full transition-all duration-700 shadow-lg shadow-rose-300/30 hover:shadow-rose-400/50 font-light tracking-wide hover:scale-105"
                  >
                    Browse Queues
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Token Balance */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-10 bg-gradient-to-br from-white/80 via-amber-50/50 to-rose-50/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(252,211,77,0.2),transparent_60%)]" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-stone-500 mb-3 font-light">Total Balance</div>
                      <div className="text-7xl font-light text-stone-800">{tokens.toFixed(1)} <span className="text-4xl text-amber-500">ZQX</span></div>
                    </div>
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-amber-400/50">
                      <Coins className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-stone-200/50 shadow-lg">
                      <div className="text-stone-500 text-sm mb-2 font-light">Today</div>
                      <div className="text-3xl font-light text-emerald-500">+12.5</div>
                    </div>
                    <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-stone-200/50 shadow-lg">
                      <div className="text-stone-500 text-sm mb-2 font-light">This Week</div>
                      <div className="text-3xl font-light text-indigo-500">+47.0</div>
                    </div>
                    <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-stone-200/50 shadow-lg">
                      <div className="text-stone-500 text-sm mb-2 font-light">All Time</div>
                      <div className="text-3xl font-light text-rose-500">{tokens.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Earning Activities */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
              >
                <h3 className="text-2xl font-light text-stone-800 mb-8">Earning Activities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: '🎯', action: 'Join Queue', reward: '+1 ZQX', color: 'rose' },
                    { icon: '⏱️', action: 'Wait in Queue (per 5 min)', reward: '+0.5 ZQX', color: 'amber' },
                    { icon: '⭐', action: 'Provide Feedback', reward: '+2 ZQX', color: 'indigo' },
                    { icon: '🤝', action: 'Refer Organization', reward: '+5 ZQX', color: 'emerald' },
                  ].map((activity, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:border-rose-200 transition-all duration-500 hover:shadow-lg"
                    >
                      <div className="text-4xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="text-stone-800 font-light mb-1">{activity.action}</div>
                        <div className={`text-${activity.color}-500 font-light text-lg`}>{activity.reward}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Transactions */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
              >
                <h3 className="text-2xl font-light text-stone-800 mb-8">Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Earned', amount: '+2.0', desc: 'Provided feedback - City Hospital', time: '10 min ago' },
                    { type: 'Earned', amount: '+1.0', desc: 'Joined queue - National Bank', time: '1 hour ago' },
                    { type: 'Earned', amount: '+0.5', desc: 'Wait time reward', time: '1 hour ago' },
                    { type: 'Redeemed', amount: '-10.0', desc: 'Coupon redemption', time: '2 days ago' },
                  ].map((tx, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:shadow-lg transition-all duration-500"
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                          tx.type === 'Earned' ? 'bg-gradient-to-br from-emerald-300 to-emerald-400' : 'bg-gradient-to-br from-rose-300 to-rose-400'
                        }`}>
                          {tx.type === 'Earned' ? <Star className="w-7 h-7 text-white" /> : <Coins className="w-7 h-7 text-white" />}
                        </div>
                        <div>
                          <div className="text-stone-800 font-light mb-1">{tx.desc}</div>
                          <div className="text-sm text-stone-500 font-light">{tx.time}</div>
                        </div>
                      </div>
                      <div className={`text-2xl font-light ${tx.type === 'Earned' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {tx.amount} ZQX
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}