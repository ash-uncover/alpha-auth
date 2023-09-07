import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppSelectors } from '../store/app/app.selectors'
import { AuthSelectors } from '../store/auth/auth.selectors'
import { DataStates } from '../lib/constants'
import { AuthService } from '../services/rest/AuthService'

import { RouteHome } from './home'
import { RouteAuth } from './auth'


// ---------------------------------------------------
// Create Component RouteRoot
// ---------------------------------------------------

export const RouteRoot = () => {

  // Hooks //

  const started = useSelector(AppSelectors.started)
  const state = useSelector(AuthSelectors.logonState)

  if (!started) {
    return null
  }

  // Rendering //

  if (state !== DataStates.SUCCESS) {
    return <RouteAuth />
  }

  return <RouteHome />
}
