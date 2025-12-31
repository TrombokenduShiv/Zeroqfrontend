import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { UserDashboard } from './components/UserDashboard';
import { OrganizationDashboard } from './components/OrganizationDashboard';

type View = 'landing' | 'user' | 'organization';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [showPortalSelection, setShowPortalSelection] = useState(false);

  const handleGetStarted = () => {
    setShowPortalSelection(true);
  };

  const handleSelectPortal = (portal: 'user' | 'organization') => {
    setShowPortalSelection(false);
    // Small delay for smooth transition
    setTimeout(() => {
      setCurrentView(portal);
    }, 300);
  };

  const handleBack = () => {
    setCurrentView('landing');
    setShowPortalSelection(false);
  };

  const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div key="landing" {...pageTransition}>
            <LandingPage onGetStarted={handleGetStarted} />
          </motion.div>
        )}
        {currentView === 'user' && (
          <motion.div key="user" {...pageTransition}>
            <UserDashboard onBack={handleBack} />
          </motion.div>
        )}
        {currentView === 'organization' && (
          <motion.div key="organization" {...pageTransition}>
            <OrganizationDashboard onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal Selection Modal */}
      <AnimatePresence>
        {showPortalSelection && (
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
              className="w-full max-w-md p-10 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-light text-stone-800 mb-3">Choose Portal</h2>
                <p className="text-stone-600 font-light">Select how you'd like to continue</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleSelectPortal('user')}
                  className="w-full p-8 bg-gradient-to-br from-rose-100/60 to-amber-100/60 hover:from-rose-200/60 hover:to-amber-200/60 backdrop-blur-md rounded-3xl border border-stone-200/50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl">👤</span>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-light text-stone-800">User Portal</div>
                      <div className="text-sm text-stone-600 font-light">Join queues & track wait times</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectPortal('organization')}
                  className="w-full p-8 bg-gradient-to-br from-indigo-100/60 to-amber-100/60 hover:from-indigo-200/60 hover:to-amber-200/60 backdrop-blur-md rounded-3xl border border-stone-200/50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl">🏢</span>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-light text-stone-800">Organization Portal</div>
                      <div className="text-sm text-stone-600 font-light">Manage queues & analytics</div>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowPortalSelection(false)}
                className="w-full mt-6 py-4 text-stone-600 hover:text-stone-800 transition-colors duration-300 font-light"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}