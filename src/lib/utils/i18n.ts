import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

import { CONFIG } from '../../config'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    react: {
      useSuspense: false
    },
    backend: {
      loadPath: `${CONFIG.ALPHA_AUTH_PUBLIC}/locales/{{lng}}/{{ns}}.json`,
    }
  })
