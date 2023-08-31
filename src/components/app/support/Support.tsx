import React from 'react'

import {
  useTranslation
} from '../../../lib/hooks'

import {
  AppContent,
  AppArea,
  AppSection
} from '../App'

import './Support.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

export const Support = () => {

  // Hooks //
  const { t } = useTranslation()
  const title = t('app:support.title')

  const contactTitle = t('app:support.contact.title')

  // Rendering //

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
