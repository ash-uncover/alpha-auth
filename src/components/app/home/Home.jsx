import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import './Home.css'

const Home = () => {
  const { t } = useTranslation()
  const title = t('app:home.title')
  const infoTitle = t('app:home.info.title')

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

export default Home
