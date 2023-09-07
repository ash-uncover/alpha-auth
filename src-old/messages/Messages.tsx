import React from 'react'

import {
  useTranslation
} from '../../src/lib/hooks'

import {
  AppContent,
  AppArea,
  AppPanel
} from '../../src/components/app/App'

import './Messages.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

const Messages = () => {

  // Hooks //

  const { t } = useTranslation()
  const title = t('app:messages.title')

  // Rendering //

  return (
    <AppContent className='messages'>
      <AppPanel>
        <h1>{title}</h1>
        ...
      </AppPanel>
      <AppArea title={title}>
        ...
      </AppArea>
    </AppContent>
  )
}

export default Messages
