import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import RegistrationForm from './components/RegistrationForm';
import TrustIndicators from './components/TrustIndicators';
import VoiceAssistant from './components/VoiceAssistant';
import ProgressIndicator from './components/ProgressIndicator';
import Icon from '../../components/AppIcon';

const Register = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleVoiceInput = (voiceText) => {
    console.log('Voice input received:', voiceText);
    // Handle voice input processing here
  };

  const toggleVoiceAssistant = () => {
    setShowVoiceAssistant(!showVoiceAssistant);
  };

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

      <div className="min-h-screen bg-background">
        <AuthenticationWrapper
          title="Create Your Account"
          subtitle="Join thousands of farmers using smart technology to improve their yields"
        >
          <div className="space-y-6">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={1} totalSteps={4} />

            {/* Voice Assistant Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Mic" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-card-foreground">
                  Voice Assistant
                </span>
              </div>
              <button
                onClick={toggleVoiceAssistant}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showVoiceAssistant ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label="Toggle voice assistant"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showVoiceAssistant ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Voice Assistant Component */}
            {showVoiceAssistant && (
              <VoiceAssistant onVoiceInput={handleVoiceInput} />
            )}

            {/* Registration Form */}
            <RegistrationForm />

            {/* Trust Indicators */}
            <div className="mt-8">
              <TrustIndicators />
            </div>

            {/* Additional Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Info" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Why Register with AgriSmart?
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
                  href="mailto:support@agrismart.com" 
                  className="flex items-center space-x-1 text-primary hover:underline"
                >
                  <Icon name="Mail" size={12} />
                  <span>support@agrismart.com</span>
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