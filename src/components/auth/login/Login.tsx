import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from '../../../lib/hooks'

import {
  AppRoutes
} from '../../../lib/constants'

import {
  AuthSelectors
} from '../../../store/auth/auth.selectors'

import {
  AuthService
} from '../../../services/rest/AuthService'


// ---------------------------------------------------
// Create Component Login
// ---------------------------------------------------

export const Login = () => {

  // Hooks //

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const error = useSelector(AuthSelectors.logonError)

  const { t } = useTranslation(['auth'])
  const title = t('login.title')
  const usernamePlaceholder = t('login.username.placeholder')
  const passwordPlaceholder = t('login.password.placeholder')
  const errorMessage = t('login.error.message')
  const submitTitle = t('login.submit.title')
  const submitTooltip = t('login.submit.tooltip')

  const linkRecover = t('login.links.recover')
  const linkRegister = t('login.links.register')

  const disabled = !username

  // Callbacks //

  const onUsernameChanged = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChanged = (event) => {
    setPassword(event.target.value)
  }

  const onLogin = (event) => {
    event.preventDefault()
    AuthService.logon(dispatch, {
      username,
      password
    })
      .then(() => setPassword(''))
  }

  // Rendering //

  return (
    <form className='form'>

      <h2 className='form-title'>
        {title}
      </h2>

      <input
        className='form-control'
        name='alpha-username'
        placeholder={usernamePlaceholder}
        required
        value={username}
        onChange={onUsernameChanged}
      />
      <input
        className='form-control'
        name='alpha-password'
        type='password'
        placeholder={passwordPlaceholder}
        value={password}
        onChange={onPasswordChanged}
      />

      <button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        title={submitTooltip}
        onClick={onLogin}
      >
        {submitTitle}
      </button>

      <p className={`form-control label ${error ? 'error' : ''}`}>
        {error ? errorMessage : ''}
      </p>

      <Link
        className='form-link'
        to={AppRoutes.RECOVER}
      >
        {linkRecover}
      </Link>

      <Link
        className='form-link'
        to={AppRoutes.REGISTER}
      >
        {linkRegister}
      </Link>

    </form>
  )
}
