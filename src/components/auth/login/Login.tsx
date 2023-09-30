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
  const errorCredentialsMessage = t('login.error.credentials')
  const errorServerMessage = t('login.error.server')
  const submitTitle = t('login.submit.title')
  const submitTooltip = t('login.submit.tooltip')

  const linkRecover = t('login.links.recover')
  const linkRegister = t('login.links.register')

  const disabled = !username
  const errorMessage = error === 'Failed to fetch' ? errorServerMessage : errorCredentialsMessage

  // Callbacks //

  const onUsernameChanged = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }

  const onPasswordChanged = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const onLogin = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    AuthService.logon(dispatch, {
      username,
      password
    })
      .then(() => setPassword(''))
  }

  // Rendering //

  return (
    <form
      className='form'
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      <h2 className='form-title'>
        {title}
      </h2>

      <input
        className='form-control ap-input'
        style={{ width:'250px' }}
        name='alpha-username'
        placeholder={usernamePlaceholder}
        required
        value={username}
        onChange={onUsernameChanged}
      />
      <input
        className='form-control ap-input'
        style={{ width:'250px' }}
        name='alpha-password'
        type='password'
        placeholder={passwordPlaceholder}
        value={password}
        onChange={onPasswordChanged}
      />

      <button
        className='form-control form-submit ap-button'
        style={{ width:'250px' }}
        type='submit'
        disabled={disabled}
        title={submitTooltip}
        onClick={onLogin}
      >
        {submitTitle}
      </button>

      <p
        className={`form-control label ${error ? 'error' : ''}`}
        style={{
          flexGrow: 1
        }}
      >
        {error ? errorMessage : ''}
      </p>

      <Link
        className='form-link ap-link'
        style={{ width:'250px', textAlign: 'center' }}
        to={AppRoutes.RECOVER}
      >
        {linkRecover}
      </Link>

      <Link
        className='form-link ap-link'
        style={{
          marginBottom: '1rem',
          textAlign: 'center',
          width:'250px'
        }}
        to={AppRoutes.REGISTER}
      >
        {linkRegister}
      </Link>

    </form>
  )
}
