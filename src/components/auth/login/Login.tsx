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

import {
  Button,
  Input,
  Title,
} from '@uncover/react-commons'

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

  const disabled = !username || !password
  const errorMessage = error === 'Failed to fetch' ? errorServerMessage : errorCredentialsMessage

  // Callbacks //

  const onUsernameChanged = (event) => {
    setUsername(event.value)
  }

  const onPasswordChanged = (event) => {
    setPassword(event.value)
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
      className='ap-auth__form'
    >

      <Title
        className='form-title'
        level='H2'
        text={title}
      />

      <Input
        className='form-control'
        autoFocus
        name='alpha-username'
        placeholder={usernamePlaceholder}
        required
        showClearIcon
        value={username}
        onChange={onUsernameChanged}
      />
      <Input
        className='form-control'
        autoSelect
        name='alpha-password'
        placeholder={passwordPlaceholder}
        showPasswordIcon
        type='password'
        value={password}
        onChange={onPasswordChanged}
      />

      <Button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        title={submitTooltip}
        onClick={onLogin}
      >
        {submitTitle}
      </Button>

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
        to={AppRoutes.RECOVER}
      >
        {linkRecover}
      </Link>

      <Link
        className='form-link ap-link'
        to={AppRoutes.REGISTER}
      >
        {linkRegister}
      </Link>

    </form>
  )
}
