import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'

import trEnAuth from 'assets/locales/en/translations_auth.json'
import trEnApp from 'assets/locales/en/translations_app.json'
import trEnError from 'assets/locales/en/translations_error.json'

import trFrAuth from 'assets/locales/fr/translations_auth.json'
import trFrApp from 'assets/locales/fr/translations_app.json'
import trFrError from 'assets/locales/fr/translations_error.json'

const resources = {
  en: {
    app: trEnApp,
    auth: trEnAuth,
    error: trEnError
  },
  fr: {
    app: trFrApp,
    auth: trFrAuth,
    err: trFrError
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
