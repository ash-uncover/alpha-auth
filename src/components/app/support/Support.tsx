import React from 'react'

import {
  useTranslation
} from '../../../lib/hooks'

import {
  ShellMainArea,
  Panel,
} from '../../commons'

import './Support.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

export const Support = () => {

  // Hooks //
  const { t } = useTranslation('app')
  const title = t('support.title')

  const contactTitle = t('support.contact.title')

  // Rendering //

  return (
    <ShellMainArea
      className='ap-auth-home'
      title={title}
    >
      <Panel
        title={contactTitle}
      >
        <p>...</p>
      </Panel>
    </ShellMainArea>
  )
}
