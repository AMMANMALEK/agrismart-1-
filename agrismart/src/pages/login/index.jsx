import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
import TrustIndicators from './components/TrustIndicators';
import VoiceAssistant from './components/VoiceAssistant';
import AuthenticationLinks from './components/AuthenticationLinks';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationWrapper
        title="Welcome Back"
        subtitle="Sign in to your AgriSmart account to access your personalized farming dashboard"
      >
        <div className="space-y-6">
          {/* Main Login Form */}
          <LoginForm />

          {/* Language Selection */}
          <div className="pt-4 border-t border-border">
            <LanguageSelector />
          </div>

          {/* Voice Assistant */}
          <div className="pt-4 border-t border-border">
            <VoiceAssistant />
          </div>

          {/* Authentication Links */}
          <div className="pt-4 border-t border-border">
            <AuthenticationLinks />
          </div>

          {/* Trust Indicators */}
          <div className="pt-4 border-t border-border">
            <TrustIndicators />
          </div>
        </div>
      </AuthenticationWrapper>
    </div>
  );
};

export default LoginPage;