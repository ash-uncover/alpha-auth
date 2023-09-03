import React from 'react'

import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AppRoutes } from '../../lib/constants'

import { App } from '../../components/app/App'
import { Home } from '../../components/app/home/Home'
import { Account } from '../../components/app/account/Account'
import { Support } from '../../components/app/support/Support'
import { Logout } from '../../components/auth/logout/Logout'

// ---------------------------------------------------
// Create Component RouteHome
// ---------------------------------------------------

export const RouteHome = () => {

  // Rendering //

  return (
    <App>
      <Routes>
        <Route path={`/${AppRoutes.BASE}`} element={<Home />} />
        <Route path={`/${AppRoutes.ACCOUNT}`} element={<Account />} />
        <Route path={`/${AppRoutes.SUPPORT}`} element={<Support />} />
        <Route path={`/${AppRoutes.LOGOUT}`} element={<Logout />} />
        <Route path='*' element={<Navigate replace to={`/${AppRoutes.BASE}`} />} />
      </Routes>
    </App>
  )
}
