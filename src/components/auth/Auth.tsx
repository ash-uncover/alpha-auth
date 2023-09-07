import React, {
  ReactNode, useEffect, useState
} from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { LocalStorage, LocalStorageItem } from '../../lib/LocalStorage'
import { AuthService } from '../../services/rest/AuthService'

import { Loader } from '../../lib/components/loader/Loader'

import './Auth.css'

// ---------------------------------------------------
// Create Component Auth
// ---------------------------------------------------

interface AuthProperties {
  children: ReactNode
}
export const Auth = ({
  children
}: AuthProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const { ready } = useTranslation(['auth'], { useSuspense: false })
  const [loading, setLoading] = useState(typeof ready !== 'undefined' ? ready : true)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const token = LocalStorage.get(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
    if (token) {
      setChecking(true)
      AuthService.checkSession(dispatch, { token })
        .finally(() => { setChecking(false) })
    }
  }, [])

  useEffect(() => {
    let timeout
    if (ready) {
      timeout = setTimeout(() => setLoading(false), 500)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [ready])

  // Rendering //

  if (loading || checking) {
    return (
      <div className='auth'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='auth'>
      <div className='auth-box'>
        {children}
      </div>
    </div>
  )
}