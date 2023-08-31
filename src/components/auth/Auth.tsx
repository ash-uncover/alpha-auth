import React from 'react'

import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import {
  AppRoutes
} from '../../lib/constants'

import { Login } from './Login'
import { Recover } from './Recover'
import { Register } from './Register'

import './Auth.css'

// ---------------------------------------------------
// Create Component Auth
// ---------------------------------------------------

export const Auth = () => {

  // Rendering //

  return (
    <div className='alpha-auth auth'>
      <div className='auth-box'>
        <Routes>
          <Route path={AppRoutes.LOGIN} exact element={<Login />} />
          <Route path={AppRoutes.RECOVER} exact element={<Recover />} />
          <Route path={AppRoutes.REGISTER} exact element={<Register />} />
          <Route path='*' element={<Navigate to={{ pathname: AppRoutes.LOGIN, state: { from: null } }} />} />
        </Routes>
      </div>
    </div>
  )
}