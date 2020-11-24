import React from 'react'

import {
  useSelector
} from 'lib/hooks'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import {
  Routes
} from 'lib/constants'

import App from 'components/app/App'
import Login from 'components/auth/login/Login'
import Recover from 'components/auth/recover/Recover'
import Register from 'components/auth/register/Register'

import './Root.scss'

const Root = () => {
  // Hooks
  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

  if (logonData) {
    return (
      <App />
    )
  }
  return (
    <div className='alpha-auth'>
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

export default Root
