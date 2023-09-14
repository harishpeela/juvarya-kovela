import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import tel from './tel.json';
import i18next from 'i18next';
export const resources = {
  en: {
    translation: en,
  },
  tel: {
    translation: tel,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});
export default i18next;
