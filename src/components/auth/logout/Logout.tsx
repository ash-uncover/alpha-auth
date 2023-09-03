import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { AuthService } from '../../../services/rest/AuthService'


// ---------------------------------------------------
// Create Component Logout
// ---------------------------------------------------

export const Logout = () => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation(['app'])
  const loading = t('logging.out')

  useEffect(() => {
    AuthService.logout(dispatch)
  })

  // Rendering //

  return (
    <div className='app-loading'>
      <div className='box'>
        {loading}
      </div>
    </div>
  )
}
