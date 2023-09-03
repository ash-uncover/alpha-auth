import React from 'react'
import { App } from '../../components/app/App'
import { Outlet } from 'react-router-dom'

export const RouteHome = () => {

  // Rendering //

  return (
    <App>
      <Outlet />
    </App>
  )
}
