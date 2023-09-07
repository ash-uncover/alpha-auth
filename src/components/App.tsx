import React, {
  ReactNode,
  useEffect
} from 'react'

import {
  useDispatch,
} from '../lib/hooks'

import {
  AppSlice,
} from '../store/app/app.slice'

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
    dispatch(AppSlice.actions.start())
  }, [])

  // Rendering //

  return (
    <div id='alpha-auth-app' className='app'>
      {children}
    </div>
  )
}
