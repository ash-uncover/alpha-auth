import React from 'react'

import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import {
  Routes
} from 'lib/constants'

import Login from 'components/auth/Login'
import Recover from 'components/auth/Recover'
import Register from 'components/auth/Register'

import './Auth.scss'

const Auth = () => {
  return (
    <div className='alpha-auth auth'>
      <div className='auth-box'>
        <Switch>
          <Route path={Routes.LOGIN} exact>
            <Login />
          </Route>
          <Route path={Routes.RECOVER} exact>
            <Recover />
          </Route>
          <Route path={Routes.REGISTER} exact>
            <Register />
          </Route>
          <Route path='/'>
            <Redirect
              to={{
                pathname: Routes.LOGIN,
                state: { from: null }
              }}
            />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Auth
