import React from 'react'

import {
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom'

import {
  Button,
  Input
} from '@uncover/react-commons'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  Routes
} from 'lib/constants'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  RestService
} from 'services'

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

export const Login = (props) => {
  // Hooks
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logonError = useSelector(AuthSelectors.authLogonErrorSelector)

  const { t } = useTranslation()
  const title = t('auth.login.title')
  const errorMessage = t('auth.login.error.message')
  const submitTitle = t('auth.login.submit.title')
  const submitTooltip = t('auth.login.submit.tooltip')

  // Callbacks

  const onUsernameChanged = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChanged = (event) => {
    setPassword(event.target.value)
  }

  const onLogin = (event) => {
    event.preventDefault()
    RestService.api.auth.get(dispatch, {
      username,
      password
    })
      .then(() => setPassword(''))
  }

  // Rendering

  return (
    <form className='form'>

      <h2 className='form-title'>
        {title}
      </h2>

      <InputUsername
        value={username}
        onChange={onUsernameChanged}
      />

      <InputPassword
        value={password}
        onChange={onPasswordChanged}
      />

      <ButtonSubmit
        title={submitTitle}
        tooltip={submitTooltip}
        onClick={onLogin}
      />

      <p className={`form-control label ${logonError ? 'error' : ''}`}>
        {logonError ? errorMessage : ''}
      </p>

      <LinkRecover
        from={Routes.LOGIN}
      />

      <LinkRegister
        from={Routes.LOGIN}
      />

    </form>
  )
}

const Recover = () => {
  // Hooks

  const { t } = useTranslation()
  const recoverTitle = t('auth.recover.title')
  const submitTitle = t('auth.recover.submit.title')
  const submitTooltip = t('auth.recover.submit.tooltip')

  const [username, setUsername] = useState('')

  // Callbacks

  const onUsernameChanged = (event) => {
    setUsername(event.target.value)
  }

  const onRecover = (event) => {
    event.preventDefault()
  }

  // Rendering

  return (
    <form className='form'>

      <h2 className='form-title'>
        {recoverTitle}
      </h2>

      <InputUsername
        value={username}
        onChange={onUsernameChanged}
      />

      <ButtonSubmit
        title={submitTitle}
        tooltip={submitTooltip}
        onClick={onRecover}
      />

      <p className='form-control label' />

      <LinkLogin
        from={Routes.RECOVER}
      />

    </form>
  )
}

const Register = () => {
  // Hooks

  const { t } = useTranslation()
  const registerTitle = t('auth.register.title')
  const submitTitle = t('auth.register.submit.title')
  const submitTooltip = t('auth.register.submit.tooltip')

  const [username, setUsername] = useState('')

  // Callbacks

  const onUsernameChanged = (event) => {
    setUsername(event.target.value)
  }

  const onRegister = (event) => {
    event.preventDefault()
  }

  // Rendering

  return (
    <form className='form'>
      <h2 className='form-title'>
        {registerTitle}
      </h2>

      <InputUsername
        value={username}
        onChange={onUsernameChanged}
      />

      <ButtonSubmit
        title={submitTitle}
        tooltip={submitTooltip}
        onClick={onRegister}
      />

      <p className='form-control label' />

      <LinkLogin
        from={Routes.REGISTER}
      />

    </form>
  )
}

const InputUsername = ({
  value,
  onChange
}) => {
  const { t } = useTranslation()
  const usernamePlaceholder = t('auth.username.placeholder')

  return (
    <Input
      className='form-control'
      placeholder={usernamePlaceholder}
      required
      name='alpha-username'
      value={value}
      onChange={onChange}
    />
  )
}

const InputPassword = ({
  value,
  onChange
}) => {
  const { t } = useTranslation()
  const passwordPlaceholder = t('auth.password.placeholder')

  return (
    <Input
      className='form-control'
      placeholder={passwordPlaceholder}
      name='alpha-password'
      type='password'
      value={value}
      onChange={onChange}
    />
  )
}

const ButtonSubmit = ({
  title,
  tooltip,
  onClick
}) => {
  return (
    <Button
      className='form-control form-submit'
      type='submit'
      tooltip={tooltip}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}

const LinkLogin = ({
  from
}) => {
  const { t } = useTranslation()
  const title = t('auth.login.link.title')

  return (
    <Link
      className='form-link'
      to={{
        pathname: Routes.LOGIN,
        state: { from }
      }}
    >
      {title}
    </Link>
  )
}

const LinkRecover = ({
  from
}) => {
  const { t } = useTranslation()
  const title = t('auth.recover.link.title')

  return (
    <Link
      className='form-link'
      to={{
        pathname: Routes.RECOVER,
        state: { from }
      }}
    >
      {title}
    </Link>
  )
}

const LinkRegister = ({
  from
}) => {
  const { t } = useTranslation()
  const title = t('auth.register.link.title')

  return (
    <Link
      className='form-link'
      to={{
        pathname: Routes.REGISTER,
        state: { from }
      }}
    >
      {title}
    </Link>
  )
}

export default Auth
