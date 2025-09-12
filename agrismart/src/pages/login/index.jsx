import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import { useTranslation } from 'react-i18next';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
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

  const { t } = useTranslation();
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <AuthenticationWrapper
        title={t('login.title')}
        subtitle={t('login.subtitle')}
        theme="plain"
      >
        <div className="space-y-6">
          {/* Main Login Form */}
          <LoginForm />

          {/* Language Selection */}
          <div className="pt-4 border-t border-border">
            <LanguageSelector />
          </div>


          {/* Authentication Links */}
          <div className="pt-4 border-t border-border">
            <AuthenticationLinks />
          </div>

        </div>
      </AuthenticationWrapper>
    </div>
  );
};

export default LoginPage;