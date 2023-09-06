import React from 'react'

import { useTranslation } from 'react-i18next'

import './AppLoader.css'

// ---------------------------------------------------
// Create Component AppLoader
// ---------------------------------------------------

export const AppLoader = () => {

  // Hooks //

  const { t } = useTranslation(['app'])
  const loading = t('loading')

  // Rendering //

  return (
    <div className='app-loader'>
      <div className='box'>
        {loading}
      </div>
    </div>
  )
}