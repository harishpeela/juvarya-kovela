import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import tel from './tel.json';
const resources = {
  en: {
    translation: en,
  },
  tel: {
    translation: tel,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'tel',
  fallbackLng: 'tel',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});