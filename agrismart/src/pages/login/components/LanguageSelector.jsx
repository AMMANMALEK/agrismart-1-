import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
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
    const savedLanguage = localStorage.getItem('selectedLanguage') || i18n.language || 'en';
    setSelectedLanguage(savedLanguage);
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    localStorage.setItem('selectedLanguage', value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Icon name="Globe" size={16} />
        <span className="text-sm font-medium">{t('Select Language') || 'Select Language'}</span>
      </div>
      
      <Select
        options={languageOptions}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        placeholder={t('Choose your language') || 'Choose your language'}
        className="w-full"
      />
    </div>
  );
};

export default LanguageSelector;