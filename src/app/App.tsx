import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { UserDashboard } from './components/UserDashboard';
import { OrganizationDashboard } from './components/OrganizationDashboard';

type View = 'landing' | 'user' | 'organization';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  const handleGetStarted = () => {
    // Show selection modal or directly go to user dashboard
    setCurrentView('user');
  };

  const handleBack = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {currentView === 'user' && <UserDashboard onBack={handleBack} />}
      {currentView === 'organization' && <OrganizationDashboard onBack={handleBack} />}

      {/* Portal Selection (appears when Get Started is clicked) */}
      {currentView === 'landing' && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          <button
            onClick={() => setCurrentView('user')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all font-semibold"
          >
            👤 User Portal
          </button>
          <button
            onClick={() => setCurrentView('organization')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all font-semibold"
          >
            🏢 Organization Portal
          </button>
        </div>
      )}
    </div>
  );
}
