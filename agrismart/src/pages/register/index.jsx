import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import { useTranslation } from 'react-i18next';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import Icon from '../../components/AppIcon';

const Register = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);


  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Register - AgriSmart | Smart Farming Solutions</title>
        <meta 
          name="description" 
          content="Create your AgriSmart account to access AI-powered agricultural management tools, crop optimization, and smart farming solutions." 
        />
        <meta name="keywords" content="agriculture registration, smart farming, crop management, AI farming tools" />
        <meta property="og:title" content="Register - AgriSmart" />
        <meta property="og:description" content="Join thousands of farmers using AgriSmart for better crop yields and farm management." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
        <AuthenticationWrapper
          title={t('register.title')}
          subtitle={t('register.subtitle')}
          theme="plain"
        >
          <div className="space-y-6">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={1} totalSteps={4} />


            {/* Registration Form */}
            <RegistrationForm />


            {/* Additional Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Info" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Why Register with AgriVision?
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Get personalized crop recommendations based on your location</li>
                    <li>• Access AI-powered pest and disease detection</li>
                    <li>• Receive weather alerts and farming tips</li>
                    <li>• Connect with agricultural experts and fellow farmers</li>
                    <li>• Track your farm's performance and optimize yields</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Need help with registration?
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs">
                <a 
                  href="tel:+911800123456" 
                  className="flex items-center space-x-1 text-primary hover:underline"
                >
                  <Icon name="Phone" size={12} />
                  <span>1800-123-456</span>
                </a>
                <a 
                  href="mailto:support@agrivision.com" 
                  className="flex items-center space-x-1 text-primary hover:underline"
                >
                  <Icon name="Mail" size={12} />
                  <span>support@agrivision.com</span>
                </a>
              </div>
            </div>
          </div>
        </AuthenticationWrapper>
      </div>
    </>
  );
};

export default Register;