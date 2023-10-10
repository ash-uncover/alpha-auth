import React from 'react'

import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AppRoutes } from '../../lib/constants'

import { Home } from '../../components/app/home/Home'
import { Account } from '../../components/app/account/Account'
import { Support } from '../../components/app/support/Support'
import { Logout } from '../../components/auth/logout/Logout'
import { AppShell } from '../../components/app/AppShell'

// ---------------------------------------------------
// Create Component RouteHome
// ---------------------------------------------------

export const RouteHome = () => {

  // Rendering //

  return (
    <AppShell>
      <Routes>
        <Route path={`/${AppRoutes.HOME}`} element={<Home />} />
        <Route path={`/${AppRoutes.ACCOUNT}`} element={<Account />} />
        <Route path={`/${AppRoutes.SUPPORT}`} element={<Support />} />
        <Route path={`/${AppRoutes.LOGOUT}`} element={<Logout />} />
        <Route path='*' element={<Navigate replace to={`/${AppRoutes.HOME}`} />} />
      </Routes>
    </AppShell>
  )
}
