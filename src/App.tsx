import React, { useState } from 'react';
import { AuthForm } from './components/Auth/AuthForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-white rounded opacity-80"></div>
          </div>
          <p className="text-gray-600">Loading TaskFlow...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthForm
        mode={authMode}
        onToggleMode={toggleAuthMode}
      />
    );
  }

  return <Dashboard />;
}

export default App;