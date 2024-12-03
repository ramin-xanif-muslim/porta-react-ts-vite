import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: navigator.language, 
    supportedLngs: ['en','az','tr'], 
    debug: false, 
    // debug: process.env.NODE_ENV === 'development', 
    // backend: {
    //   loadPath: '/locale/{{lng}}/translation.json', 
    // },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'], 
      caches: ['localStorage', 'cookie'], 
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;

