import React, {
  ReactNode,
  useEffect
} from 'react'

import {
  useDispatch,
} from '../lib/hooks'

import {
  AppService
} from '../services/rest/AppService'

import './App.css'

// ---------------------------------------------------
// Create Component App
// ---------------------------------------------------

interface AppProperties {
  children: ReactNode
}
export const App = ({
  children
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  useEffect(() => {
    AppService.checkHealth(dispatch)

    const healthInterval = setInterval(() => {
      AppService.checkHealth(dispatch)
    }, 10 * 60 * 1000) // Prevent render to go idle after 15min of inactivity

    return () => {
      clearInterval(healthInterval)
    }
  }, [])

  // Rendering //

  return (
    <div id='alpha-auth-app' className='app'>
      {children}
    </div>
  )
}
