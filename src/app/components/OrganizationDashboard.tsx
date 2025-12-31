import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Clock,
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface OrganizationDashboardProps {
  onBack: () => void;
}

export function OrganizationDashboard({ onBack }: OrganizationDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'queues' | 'analytics'>('overview');
  const [showCreateQueue, setShowCreateQueue] = useState(false);

  const queueData = [
    { name: 'General Consultation', active: 12, avgWait: 25, status: 'busy', served: 45 },
    { name: 'Account Services', active: 5, avgWait: 15, status: 'normal', served: 32 },
    { name: 'License Renewal', active: 18, avgWait: 45, status: 'critical', served: 28 },
    { name: 'COVID Vaccination', active: 4, avgWait: 12, status: 'low', served: 67 },
  ];

  const peakHourData = [
    { hour: '8AM', count: 15 },
    { hour: '9AM', count: 28 },
    { hour: '10AM', count: 42 },
    { hour: '11AM', count: 38 },
    { hour: '12PM', count: 25 },
    { hour: '1PM', count: 18 },
    { hour: '2PM', count: 30 },
    { hour: '3PM', count: 35 },
    { hour: '4PM', count: 22 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'red';
      case 'busy':
        return 'yellow';
      case 'normal':
        return 'blue';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
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
              <div>
                <span className="text-2xl font-bold text-white">ZeroQ</span>
                <span className="block text-xs text-slate-400">Organization Portal</span>
              </div>
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <Settings className="w-6 h-6 text-slate-400" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'queues', label: 'Manage Queues', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Active Queues', value: '4', icon: Activity, color: 'purple', change: '+12%' },
                  { label: 'People in Queue', value: '39', icon: Users, color: 'blue', change: '+8%' },
                  { label: 'Avg Wait Time', value: '24min', icon: Clock, color: 'yellow', change: '-15%' },
                  { label: 'Served Today', value: '172', icon: CheckCircle2, color: 'green', change: '+23%' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-600 to-${stat.color}-400 flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-green-400 text-sm font-semibold">{stat.change}</div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Live Queue Status */}
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Queue Status
                  </h3>
                  <button
                    onClick={() => setShowCreateQueue(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Queue</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {queueData.map((queue, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${getStatusColor(queue.status)}-500 animate-pulse`} />
                          <div>
                            <h4 className="text-white font-semibold">{queue.name}</h4>
                            <div className="text-sm text-slate-400 capitalize">{queue.status} Load</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{queue.active}</div>
                            <div className="text-xs text-slate-400">In Queue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{queue.avgWait}m</div>
                            <div className="text-xs text-slate-400">Avg Wait</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{queue.served}</div>
                            <div className="text-xs text-slate-400">Served</div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${getStatusColor(queue.status)}-600 to-${getStatusColor(queue.status)}-400 transition-all duration-500`}
                          style={{ width: `${Math.min((queue.active / 20) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Insights */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Peak Hours Today
                  </h3>
                  <div className="space-y-3">
                    {peakHourData.slice(0, 5).map((hour, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-slate-400 w-16">{hour.hour}</div>
                        <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-end pr-3 transition-all duration-500"
                            style={{ width: `${(hour.count / 45) * 100}%` }}
                          >
                            <span className="text-white text-sm font-semibold">{hour.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">AI Recommendations</h3>
                  <div className="space-y-4">
                    {[
                      {
                        type: 'warning',
                        icon: AlertCircle,
                        title: 'High Load Detected',
                        desc: 'License Renewal queue needs +2 staff members',
                      },
                      {
                        type: 'success',
                        icon: CheckCircle2,
                        title: 'Optimal Performance',
                        desc: 'COVID Vaccination running efficiently',
                      },
                      {
                        type: 'info',
                        icon: TrendingUp,
                        title: 'Peak Hour Alert',
                        desc: 'Expect surge at 10AM - prepare resources',
                      },
                    ].map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            rec.type === 'warning'
                              ? 'bg-yellow-500/20'
                              : rec.type === 'success'
                              ? 'bg-green-500/20'
                              : 'bg-blue-500/20'
                          }`}
                        >
                          <rec.icon
                            className={`w-5 h-5 ${
                              rec.type === 'warning'
                                ? 'text-yellow-400'
                                : rec.type === 'success'
                                ? 'text-green-400'
                                : 'text-blue-400'
                            }`}
                          />
                        </div>
                        <div>
                          <div className="text-white font-semibold mb-1">{rec.title}</div>
                          <div className="text-sm text-slate-400">{rec.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'queues' && (
            <motion.div
              key="queues"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Queue Management</h2>
                <button
                  onClick={() => setShowCreateQueue(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Queue</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {queueData.map((queue, i) => (
                  <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{queue.name}</h3>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${getStatusColor(queue.status)}-500/20 border border-${getStatusColor(queue.status)}-500/30 rounded-full`}>
                          <div className={`w-2 h-2 rounded-full bg-${getStatusColor(queue.status)}-500 animate-pulse`} />
                          <span className={`text-${getStatusColor(queue.status)}-300 text-sm capitalize`}>{queue.status}</span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <Settings className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{queue.active}</div>
                        <div className="text-xs text-slate-400">Active</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{queue.avgWait}m</div>
                        <div className="text-xs text-slate-400">Avg Wait</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-green-400 mb-1">{queue.served}</div>
                        <div className="text-xs text-slate-400">Served</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white rounded-xl transition-all">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Analytics & Insights</h2>

              {/* Peak Hours Chart */}
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Queue Volume by Hour</h3>
                <div className="h-64 flex items-end gap-2">
                  {peakHourData.map((hour, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative group">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-blue-600 rounded-t-lg transition-all duration-300 hover:from-purple-500 hover:to-blue-500 cursor-pointer"
                          style={{ height: `${(hour.count / 45) * 240}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {hour.count} people
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">{hour.hour}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Service Rate</div>
                      <div className="text-2xl font-bold text-white">94.2%</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-400">+5.3% from last week</div>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Abandonment Rate</div>
                      <div className="text-2xl font-bold text-white">3.8%</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-400">-1.2% from last week</div>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Customer Satisfaction</div>
                      <div className="text-2xl font-bold text-white">4.7/5</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-400">+0.3 from last week</div>
                </div>
              </div>

              {/* Weekly Trends */}
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Weekly Trends</h3>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => {
                    const value = [145, 162, 158, 171, 189, 95, 67][i];
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="text-slate-400 w-24">{day}</div>
                        <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-end pr-4 transition-all duration-500"
                            style={{ width: `${(value / 200) * 100}%` }}
                          >
                            <span className="text-white font-semibold">{value}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Queue Modal */}
      {showCreateQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-8 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Queue</h3>
              <button
                onClick={() => setShowCreateQueue(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-2">Queue Name</label>
                <input
                  type="text"
                  placeholder="e.g., General Consultation"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-2">Category</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                  <option>Healthcare</option>
                  <option>Banking</option>
                  <option>Government</option>
                  <option>Retail</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-2">Expected Service Time (minutes)</label>
                <input
                  type="number"
                  placeholder="15"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateQueue(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateQueue(false)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white rounded-xl transition-all"
                >
                  Create Queue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
