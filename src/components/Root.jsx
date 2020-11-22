import React from 'react'

import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import {
  Routes
} from 'lib/constants'

import {
  useTranslation
} from 'lib/hooks'

import {
  Carousel
} from '@uncover/react-commons'

import Login from 'components/login/Login'
import Recover from 'components/recover/Recover'
import Register from 'components/register/Register'

import './Root.scss'

const Root = () => {
  // Hooks

  const { t } = useTranslation()

  return (
    <div className='ap-react-auth'>
      <div className='auth-box'>
        <div className='auth-box-toolbar'>
          {t('header.title')}
        </div>
        <div className='auth-box-content'>
          <Route
            render={({ location }) => (
              <Carousel animate={location}>
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
              </Carousel>
            )}
          />

        </div>

      </div>
    </div>
  )
}

export default Root
