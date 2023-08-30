import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import './Support.css'

const Support = () => {
  const { t } = useTranslation()
  const title = t('app:support.title')

  const contactTitle = t('app:support.contact.title')

  return (
    <AppContent className='support'>
      <AppArea title={title}>
        <AppSection title={contactTitle}>
          ...
        </AppSection>
      </AppArea>
    </AppContent>
  )
}

export default Support
