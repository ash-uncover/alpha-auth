import React from 'react'

import {
  useTranslation
} from '../../../lib/hooks'

import {
  AppContent,
  AppArea,
  AppSection
} from '../App'

import './Home.css'

// ---------------------------------------------------
// Create Component Home
// ---------------------------------------------------

export const Home = () => {

  // Hooks //

  const { t } = useTranslation()
  const title = t('app:home.title')
  const infoTitle = t('app:home.info.title')

  // Rendering //

  return (
    <AppContent className='home'>
      <AppArea title={title}>
        <AppSection title={infoTitle}>
          ...
        </AppSection>
      </AppArea>
    </AppContent>
  )
}
