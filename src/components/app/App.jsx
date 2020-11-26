import React from 'react'

import AppNavbar from 'components/app/AppNavbar'

import {
  selectors as AuthSelectors
} from 'store/auth'

import './App.scss'

const App = () => {
  //RestService.api.auth.delete(dispatch, logonData)

  return (
    <div className='alpha-auth app'>
      <AppNavbar />
    </div>
  )
}

export default App
