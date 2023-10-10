import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  useDispatch,
  useState,
  useTranslation
} from '../../../lib/hooks'

import {
  AppRoutes
} from '../../../lib/constants'

import {
  AuthService
} from '../../../services/rest/AuthService'

export const REGISTER_STATE = {
  ASK: 'ASK',
  CONFIRM: 'CONFIRM',
  COMPLETED: 'COMPLETED'
}

import {
  Button,
  Input,
  Title,
} from '@uncover/react-commons'

// ---------------------------------------------------
// Create Component Register
// ---------------------------------------------------

export const Register = () => {

  // Hooks //

  useTranslation(['auth'])

  const [state, setState] = useState(REGISTER_STATE.ASK)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Callbacks //

  const onAsk = () => {
    setUsername('')
    setPassword('')
    setState(REGISTER_STATE.ASK)
  }

  const onConfirm = (username, password) => {
    setUsername(username)
    setPassword(password)
    setState(REGISTER_STATE.CONFIRM)
  }

  const onCompleted = () => {
    setState(REGISTER_STATE.COMPLETED)
  }

  // Rendering //

  switch (state) {
    case REGISTER_STATE.ASK: {
      return (
        <RegisterAsk
          onConfirm={onConfirm}
        />
      )
    }
    case REGISTER_STATE.CONFIRM: {
      return (
        <RegisterConfirm
          username={username}
          password={password}
          onAsk={onAsk}
          onCompleted={onCompleted}
        />
      )
    }
    case REGISTER_STATE.COMPLETED: {
      return (
        <RegisterCompleted />
      )
    }
  }
}

// ---------------------------------------------------
// Create Component RegisterAsk
// ---------------------------------------------------

export const RegisterAsk = ({
  onConfirm
}) => {

  // Hooks //

  const dispatch = useDispatch()

  const { t, i18n } = useTranslation()
  const title = t('auth:register.ask.title')
  const text = t('auth:register.ask.text')
  const usernamePlaceholder = t('auth:register.ask.username.placeholder')
  const passwordPlaceholder = t('auth:register.ask.password.placeholder')
  const repeatPlaceholder = t('auth:register.ask.repeat.placeholder')
  const submitTitle = t('auth:register.ask.submit.title')
  const submitTooltip = t('auth:register.ask.submit.tooltip')
  const errorMessage = t('auth:register.ask.error')
  const linkLogin = t('auth:register.ask.links.login')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [error, setError] = useState('')

  const disabled = !username || !password || (password !== repeat)

  // Callbacks //

  const onUsernameChanged = (event) => {
    setUsername(event.value)
  }

  const onPasswordChanged = (event) => {
    setPassword(event.value)
  }

  const onRepeatChanged = (event) => {
    setRepeat(event.value)
  }

  const onRegister = async (event) => {
    event.preventDefault()
    AuthService.register(dispatch, {
      username,
      password
    })
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

      <p className='form-text'>
        {text}
      </p>

      <Input
        className='form-control'
        autoFocus
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
      <Input
        className='form-control'
        name='alpha-repeat'
        type='password'
        placeholder={repeatPlaceholder}
        value={repeat}
        onChange={onRepeatChanged}
      />

      <Button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        title={submitTooltip}
        onClick={onRegister}
      >
        {submitTitle}
      </Button>

      <p className={`form-control label ${error ? 'error' : ''}`}>
        {error}
      </p>

      <Link
        className='form-link ap-link'
        to={AppRoutes.BASE}
      >
        {linkLogin}
      </Link>

    </form>
  )
}

// ---------------------------------------------------
// Create Component RegisterConfirm
// ---------------------------------------------------

export const RegisterConfirm = ({
  username,
  password,
  onAsk,
  onCompleted
}) => {

  // Hooks //

  const { t } = useTranslation()
  const title = t('auth:register.confirm.title')
  const text = t('auth:register.confirm.text')
  const tokenPlaceholder = t('auth:register.confirm.token.placeholder')
  const errorMessage = t('auth:register.confirm.error.message')

  const submitTitle = t('auth:register.confirm.submit.title')
  const submitTooltip = t('auth:register.confirm.submit.tooltip')

  const linkBack = t('auth:register.confirm.links.back')
  const linkResend = t('auth:register.confirm.links.resend')

  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const disabled = !token

  // Callbacks //

  const onTokenChanged = (event) => {
    setToken(event.target.value)
  }

  const onConfirm = async (event) => {
    event.preventDefault()
    try {
      // await AuthService.api.accounts.register.put({
      //   username,
      //   token
      // })
      onCompleted()
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const onBack = (event) => {
    event.preventDefault()
    onAsk()
  }

  const onResend = (event) => {
    event.preventDefault()
    // RestService.api.auth.register.post({
    //   username,
    //   password
    // })
    //   .catch((error) => setError(error))
  }

  // Rendering //

  return (
    <form className='form'>

      <h2 className='form-title'>
        {title}
      </h2>

      <p className='form-text'>
        {text}
      </p>

      <input
        className='form-control'
        name='alpha-token'
        placeholder={tokenPlaceholder}
        required
        value={token}
        onChange={onTokenChanged}
      />

      <button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        title={submitTooltip}
        onClick={onConfirm}
      >
        {submitTitle}
      </button>

      <p className={`form-control label ${error ? 'error' : ''}`}>
        {error ? errorMessage : ''}
      </p>

      <button
        className='form-link'
        title={submitTooltip}
        onClick={onResend}
      >
        {linkResend}
      </button>

      <button
        className='form-link'
        title={submitTooltip}
        onClick={onBack}
      >
        {linkBack}
      </button>

    </form>
  )
}

// ---------------------------------------------------
// Create Component Register Completed
// ---------------------------------------------------

export const RegisterCompleted = () => {
  // Hooks

  const { t } = useTranslation()
  const title = t('auth:register.completed.title')
  const text = t('auth:register.completed.text')
  const linkLogin = t('auth:register.completed.links.login')

  // Rendering

  return (
    <div className='form'>

      <h2 className='form-title'>
        {title}
      </h2>

      <p className='form-text'>
        {text}
      </p>

      <Link
        className='form-link'
        to={AppRoutes.BASE}
      >
        {linkLogin}
      </Link>

    </div>
  )
}
