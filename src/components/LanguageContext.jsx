import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();

    const languageMap = {
        'English': 'en',
        'हिंदी (Hindi)': 'hi',
        'मराठी (Marathi)': 'mr',
        'ગુજરાતી (Gujarati)': 'gu',
        'ਪੰਜਾਬੀ (Punjabi)': 'pa',
        'தமிழ் (Tamil)': 'ta',
        'తెలుగు (Telugu)': 'te',
        'ಕನ್ನಡ (Kannada)': 'kn',
        'বাংলা (Bengali)': 'bn',
        'മലയാളം (Malayalam)': 'ml'
    };

    // Initialize from localStorage or default to 'English'
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('agriwise_lang') || 'English';
    });

    const setLanguage = (langInput) => {
        const isCode = Object.values(languageMap).includes(langInput);
        let langName = langInput;
        let langCode = languageMap[langInput] || 'en';

        if (isCode) {
            langCode = langInput;
            langName = Object.keys(languageMap).find(key => languageMap[key] === langInput) || 'English';
        }

        setLanguageState(langName);
        i18n.changeLanguage(langCode);
        localStorage.setItem('agriwise_lang', langName);
    };

    // Sync with initial language load
    useEffect(() => {
        const langCode = languageMap[language] || 'en';
        i18n.changeLanguage(langCode);
    }, []);

    const langCode = languageMap[language] || 'en';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, langCode }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
