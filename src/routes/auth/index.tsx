import React from 'react'

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { RouteRegister } from './register'
import { RouteRecover } from './recover'
import { RouteLogin } from './login'

import { Auth } from '../../components/auth/Auth'

export const RouteAuth = () => {

  // Rendering //

  return (
    <Auth>
      <Routes>
        <Route path='/' element={<RouteLogin />} />
        <Route path='/register' element={<RouteRegister />} />
        <Route path='/recover' element={<RouteRecover />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </Auth>
  )
}
