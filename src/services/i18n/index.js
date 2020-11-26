import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'

import enFile from 'assets/locales/en/translations.json'
import frFile from 'assets/locales/fr/translations.json'

const resources = {
  en: {
    translation: enFile
  },
  fr: {
    translation: frFile
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
