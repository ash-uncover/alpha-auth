import React from 'react'

import {
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

const Login = () => {
  // Hooks
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const error = useSelector(AuthSelectors.selectLogonError)

  const { t } = useTranslation()
  const title = t('auth:login.title')
  const usernamePlaceholder = t('auth:username.placeholder')
  const passwordPlaceholder = t('auth:password.placeholder')
  const errorMessage = t('auth:login.error.message')
  const submitTitle = t('auth:login.submit.title')
  const submitTooltip = t('auth:login.submit.tooltip')

  const linkRecover = t('auth:recover.link.title')
  const linkRegister = t('auth:register.link.title')

  const disabled = !username

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

      <Input
        className='form-control'
        name='alpha-username'
        placeholder={usernamePlaceholder}
        required
        value={username}
        onChange={onUsernameChanged}
      />
      <Input
        className='form-control'
        name='alpha-password'
        type='password'
        placeholder={passwordPlaceholder}
        value={password}
        onChange={onPasswordChanged}
      />

      <Button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        tooltip={submitTooltip}
        onClick={onLogin}
      >
        {submitTitle}
      </Button>

      <p className={`form-control label ${error ? 'error' : ''}`}>
        {error ? errorMessage : ''}
      </p>

      <Link
        className='form-link'
        to={{
          pathname: Routes.RECOVER,
          state: { from: Routes.LOGIN }
        }}
      >
        {linkRecover}
      </Link>

      <Link
        className='form-link'
        to={{
          pathname: Routes.REGISTER,
          state: { from: Routes.LOGIN }
        }}
      >
        {linkRegister}
      </Link>

    </form>
  )
}

export default Login
