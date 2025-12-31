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
        return { bg: 'rose', text: 'rose', dot: 'bg-rose-500' };
      case 'busy':
        return { bg: 'amber', text: 'amber', dot: 'bg-amber-500' };
      case 'normal':
        return { bg: 'indigo', text: 'indigo', dot: 'bg-indigo-500' };
      case 'low':
        return { bg: 'emerald', text: 'emerald', dot: 'bg-emerald-500' };
      default:
        return { bg: 'stone', text: 'stone', dot: 'bg-stone-500' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-indigo-50/20 to-amber-50/10">
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-300/40 group-hover:shadow-indigo-400/60 transition-all duration-500 group-hover:scale-105">
                <span className="text-2xl">🧠</span>
              </div>
              <div>
                <span className="text-3xl font-light text-stone-800 tracking-tight">ZeroQ</span>
                <span className="block text-xs text-stone-500 font-light">Organization Portal</span>
              </div>
            </button>

            <div className="flex items-center gap-4">
              <button className="p-3 hover:bg-white/60 rounded-2xl transition-all duration-500 hover:shadow-lg">
                <Settings className="w-6 h-6 text-stone-500" />
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-300 to-amber-300 shadow-lg" />
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
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'queues', label: 'Manage Queues', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl transition-all duration-500 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-400 to-amber-400 text-white shadow-xl shadow-indigo-300/40 scale-[1.02]'
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Active Queues', value: '4', icon: Activity, gradient: 'from-rose-300 to-rose-400', change: '+12%' },
                  { label: 'People in Queue', value: '39', icon: Users, gradient: 'from-indigo-300 to-indigo-400', change: '+8%' },
                  { label: 'Avg Wait Time', value: '24min', icon: Clock, gradient: 'from-amber-300 to-amber-400', change: '-15%' },
                  { label: 'Served Today', value: '172', icon: CheckCircle2, gradient: 'from-emerald-300 to-emerald-400', change: '+23%' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-emerald-600 text-sm font-light">{stat.change}</div>
                    </div>
                    <div className="text-4xl font-light text-stone-800 mb-2">{stat.value}</div>
                    <div className="text-stone-600 text-sm font-light">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Live Queue Status */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-light text-stone-800 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    Live Queue Status
                  </h3>
                  <button
                    onClick={() => setShowCreateQueue(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-amber-400 text-white rounded-full hover:shadow-xl transition-all duration-500 hover:scale-105 shadow-lg shadow-indigo-300/40 font-light"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Queue</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {queueData.map((queue, i) => {
                    const statusColor = getStatusColor(queue.status);
                    return (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:border-indigo-200 transition-all duration-500 hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${statusColor.dot} animate-pulse`} />
                            <div>
                              <h4 className="text-stone-800 font-light text-lg">{queue.name}</h4>
                              <div className={`text-sm text-${statusColor.text}-600 font-light capitalize`}>{queue.status} Load</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <div className="text-3xl font-light text-rose-500">{queue.active}</div>
                              <div className="text-xs text-stone-500 font-light">In Queue</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-light text-indigo-500">{queue.avgWait}m</div>
                              <div className="text-xs text-stone-500 font-light">Avg Wait</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-light text-emerald-500">{queue.served}</div>
                              <div className="text-xs text-stone-500 font-light">Served</div>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-stone-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className={`h-full bg-gradient-to-r from-${statusColor.bg}-400 to-${statusColor.bg}-500 rounded-full`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min((queue.active / 20) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Quick Insights */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
                >
                  <h3 className="text-2xl font-light text-stone-800 mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-indigo-500" />
                    Peak Hours Today
                  </h3>
                  <div className="space-y-4">
                    {peakHourData.slice(0, 5).map((hour, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-4"
                      >
                        <div className="text-stone-500 w-20 font-light">{hour.hour}</div>
                        <div className="flex-1 h-10 bg-stone-200/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-400 to-amber-400 flex items-center justify-end pr-4 rounded-2xl"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(hour.count / 45) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="text-white text-sm font-light">{hour.count}</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
                >
                  <h3 className="text-2xl font-light text-stone-800 mb-6">AI Recommendations</h3>
                  <div className="space-y-4">
                    {[
                      {
                        type: 'warning',
                        icon: AlertCircle,
                        title: 'High Load Detected',
                        desc: 'License Renewal queue needs +2 staff members',
                        bg: 'amber',
                      },
                      {
                        type: 'success',
                        icon: CheckCircle2,
                        title: 'Optimal Performance',
                        desc: 'COVID Vaccination running efficiently',
                        bg: 'emerald',
                      },
                      {
                        type: 'info',
                        icon: TrendingUp,
                        title: 'Peak Hour Alert',
                        desc: 'Expect surge at 10AM - prepare resources',
                        bg: 'indigo',
                      },
                    ].map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:shadow-lg transition-all duration-500"
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-${rec.bg}-200 to-${rec.bg}-300 shadow-lg`}>
                          <rec.icon className={`w-6 h-6 text-${rec.bg}-600`} />
                        </div>
                        <div>
                          <div className="text-stone-800 font-light mb-1">{rec.title}</div>
                          <div className="text-sm text-stone-600 font-light">{rec.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'queues' && (
            <motion.div
              key="queues"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-light text-stone-800">Queue Management</h2>
                <button
                  onClick={() => setShowCreateQueue(true)}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-400 to-amber-400 text-white rounded-full hover:shadow-xl transition-all duration-500 hover:scale-105 shadow-lg shadow-indigo-300/40 font-light"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Queue</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {queueData.map((queue, i) => {
                  const statusColor = getStatusColor(queue.status);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-700"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-2xl font-light text-stone-800 mb-3">{queue.name}</h3>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-${statusColor.bg}-100/60 backdrop-blur-sm border border-${statusColor.bg}-200/50 rounded-full`}>
                            <div className={`w-2 h-2 rounded-full ${statusColor.dot} animate-pulse`} />
                            <span className={`text-${statusColor.text}-600 text-sm font-light capitalize`}>{queue.status}</span>
                          </div>
                        </div>
                        <button className="p-3 hover:bg-white/60 rounded-2xl transition-all duration-500">
                          <Settings className="w-5 h-5 text-stone-500" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50">
                          <div className="text-3xl font-light text-rose-500 mb-2">{queue.active}</div>
                          <div className="text-xs text-stone-600 font-light">Active</div>
                        </div>
                        <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50">
                          <div className="text-3xl font-light text-indigo-500 mb-2">{queue.avgWait}m</div>
                          <div className="text-xs text-stone-600 font-light">Avg Wait</div>
                        </div>
                        <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50">
                          <div className="text-3xl font-light text-emerald-500 mb-2">{queue.served}</div>
                          <div className="text-xs text-stone-600 font-light">Served</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-stone-700 rounded-2xl transition-all duration-500 border border-stone-200/50 font-light hover:shadow-lg">
                          View Details
                        </button>
                        <button className="flex-1 py-3 bg-gradient-to-r from-indigo-400 to-amber-400 hover:shadow-xl text-white rounded-2xl transition-all duration-500 font-light hover:scale-[1.02]">
                          Manage
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-light text-stone-800">Analytics & Insights</h2>

              {/* Peak Hours Chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
              >
                <h3 className="text-2xl font-light text-stone-800 mb-8">Queue Volume by Hour</h3>
                <div className="h-64 flex items-end gap-3">
                  {peakHourData.map((hour, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                      <div className="w-full relative group">
                        <motion.div
                          className="w-full bg-gradient-to-t from-indigo-400 to-amber-400 rounded-t-2xl transition-all duration-500 hover:from-indigo-500 hover:to-amber-500 cursor-pointer"
                          initial={{ height: 0 }}
                          animate={{ height: `${(hour.count / 45) * 240}px` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl text-stone-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-stone-200/50 shadow-lg font-light">
                            {hour.count} people
                          </div>
                        </motion.div>
                      </div>
                      <div className="text-xs text-stone-500 font-light">{hour.hour}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle2, label: 'Service Rate', value: '94.2%', change: '+5.3%', gradient: 'from-emerald-300 to-emerald-400' },
                  { icon: Clock, label: 'Abandonment Rate', value: '3.8%', change: '-1.2%', gradient: 'from-amber-300 to-amber-400' },
                  { icon: TrendingUp, label: 'Customer Satisfaction', value: '4.7/5', change: '+0.3', gradient: 'from-rose-300 to-rose-400' },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg`}>
                        <metric.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-stone-600 text-sm font-light">{metric.label}</div>
                        <div className="text-3xl font-light text-stone-800">{metric.value}</div>
                      </div>
                    </div>
                    <div className="text-sm text-emerald-600 font-light">{metric.change} from last week</div>
                  </motion.div>
                ))}
              </div>

              {/* Weekly Trends */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/50 shadow-lg"
              >
                <h3 className="text-2xl font-light text-stone-800 mb-8">Weekly Trends</h3>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => {
                    const value = [145, 162, 158, 171, 189, 95, 67][i];
                    return (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-5"
                      >
                        <div className="text-stone-600 w-28 font-light">{day}</div>
                        <div className="flex-1 h-12 bg-stone-200/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-400 to-amber-400 flex items-center justify-end pr-5 rounded-2xl"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(value / 200) * 100}%` }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="text-white font-light">{value}</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Queue Modal */}
      <AnimatePresence>
        {showCreateQueue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg p-10 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-light text-stone-800">Create New Queue</h3>
                <button
                  onClick={() => setShowCreateQueue(false)}
                  className="p-2 hover:bg-stone-100/60 rounded-2xl transition-all duration-500"
                >
                  <XCircle className="w-6 h-6 text-stone-500" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-stone-600 mb-3 font-light">Queue Name</label>
                  <input
                    type="text"
                    placeholder="e.g., General Consultation"
                    className="w-full px-5 py-4 bg-white/70 backdrop-blur-md border border-stone-200/50 rounded-2xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-indigo-300 focus:shadow-lg transition-all duration-500 font-light"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-3 font-light">Category</label>
                  <select className="w-full px-5 py-4 bg-white/70 backdrop-blur-md border border-stone-200/50 rounded-2xl text-stone-800 focus:outline-none focus:border-indigo-300 focus:shadow-lg transition-all duration-500 font-light">
                    <option>Healthcare</option>
                    <option>Banking</option>
                    <option>Government</option>
                    <option>Retail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-3 font-light">Expected Service Time (minutes)</label>
                  <input
                    type="number"
                    placeholder="15"
                    className="w-full px-5 py-4 bg-white/70 backdrop-blur-md border border-stone-200/50 rounded-2xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-indigo-300 focus:shadow-lg transition-all duration-500 font-light"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => setShowCreateQueue(false)}
                    className="flex-1 py-4 bg-white/70 hover:bg-white/90 backdrop-blur-md text-stone-700 rounded-2xl transition-all duration-500 border border-stone-200/50 font-light hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowCreateQueue(false)}
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-400 to-amber-400 hover:shadow-xl text-white rounded-2xl transition-all duration-500 font-light hover:scale-[1.02]"
                  >
                    Create Queue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
