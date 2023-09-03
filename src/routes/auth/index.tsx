import React from 'react'

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AppRoutes } from '../../lib/constants'

import { Auth } from '../../components/auth/Auth'

import { Login } from '../../components/auth/login/Login'
import { Register } from '../../components/auth/register/Register'
import { Recover } from '../../components/auth/recover/Recover'

// ---------------------------------------------------
// Create Component RouteAuth
// ---------------------------------------------------

export const RouteAuth = () => {

  // Rendering //

  return (
    <Auth>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path={`${AppRoutes.REGISTER}`} element={<Register />} />
        <Route path={`${AppRoutes.RECOVER}`} element={<Recover />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </Auth>
  )
}
