import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch (e) {}
  };

  return (
    <div className="flex items-center gap-2">
      <button className="px-3 py-1 rounded border" onClick={() => changeLanguage('en')}>English</button>
      <button className="px-3 py-1 rounded border" onClick={() => changeLanguage('hi')}>हिन्दी</button>
      <button className="px-3 py-1 rounded border" onClick={() => changeLanguage('gu')}>ગુજરાતી</button>
    </div>
  );
};

export default LanguageSelector;