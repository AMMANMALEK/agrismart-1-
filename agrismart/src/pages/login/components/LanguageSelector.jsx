import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English' },
    { value: 'hi', label: 'हिंदी', description: 'Hindi' },
    { value: 'te', label: 'తెలుగు', description: 'Telugu' },
    { value: 'ta', label: 'தமிழ்', description: 'Tamil' },
    { value: 'kn', label: 'ಕನ್ನಡ', description: 'Kannada' },
    { value: 'ml', label: 'മലയാളം', description: 'Malayalam' },
    { value: 'gu', label: 'ગુજરાતી', description: 'Gujarati' },
    { value: 'mr', label: 'मराठी', description: 'Marathi' },
    { value: 'bn', label: 'বাংলা', description: 'Bengali' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ', description: 'Punjabi' }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    localStorage.setItem('selectedLanguage', value);
    
    // In a real app, this would trigger language change across the app
    console.log('Language changed to:', value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Icon name="Globe" size={16} />
        <span className="text-sm font-medium">Select Language</span>
      </div>
      
      <Select
        options={languageOptions}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        placeholder="Choose your language"
        className="w-full"
      />
    </div>
  );
};

export default LanguageSelector;