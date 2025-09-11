import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setCurrentLang(lng);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        className={`px-3 py-1 rounded border text-sm ${
          currentLang === 'en' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'
        }`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button 
        className={`px-3 py-1 rounded border text-sm ${
          currentLang === 'hi' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'
        }`}
        onClick={() => changeLanguage('hi')}
      >
        हिन्दी
      </button>
      <button 
        className={`px-3 py-1 rounded border text-sm ${
          currentLang === 'gu' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'
        }`}
        onClick={() => changeLanguage('gu')}
      >
        ગુજરાતી
      </button>
    </div>
  );
};

export default LanguageSelector;