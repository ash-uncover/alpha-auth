import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  Button,
  Input
} from '@uncover/react-commons'

import {
  useState,
  useTranslation
} from 'lib/hooks'

import {
  AppRoutes
} from 'lib/constants'

import {
  RestService
} from 'services'

export const REGISTER_STATE = {
  ASK: 'ASK',
  CONFIRM: 'CONFIRM',
  COMPLETED: 'COMPLETED'
}

const Register = () => {
  // Hooks

  const [state, setState] = useState(REGISTER_STATE.ASK)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Callbacks

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

  // Rendering

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

export const RegisterAsk = ({
  onConfirm
}) => {
  // Hooks

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

  // Callbacks

  const onUsernameChanged = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChanged = (event) => {
    setPassword(event.target.value)
  }

  const onRepeatChanged = (event) => {
    setRepeat(event.target.value)
  }

  const onRegister = async (event) => {
    event.preventDefault()
    try {
      await RestService.api.auth.register.post({
        username,
        password
      })
      onConfirm(username, password)
    } catch (error) {
      const errorKey = `err:${error.message}`
      if (i18n.exists(errorKey)) {
        setError(t(errorKey))
      } else {
        setError(errorMessage)
      }
    }
  }

  // Rendering

  return (
    <form className='form'>

      <h2 className='form-title'>
        {title}
      </h2>

      <p className='form-text'>
        {text}
      </p>

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
        tooltip={submitTooltip}
        onClick={onRegister}
      >
        {submitTitle}
      </Button>

      <p className={`form-control label ${error ? 'error' : ''}`}>
        {error}
      </p>

      <Link
        className='form-link'
        to={{
          pathname: AppRoutes.LOGIN,
          state: { from: AppRoutes.REGISTER }
        }}
      >
        {linkLogin}
      </Link>

    </form>
  )
}

export const RegisterConfirm = ({
  username,
  password,
  onAsk,
  onCompleted
}) => {
  // Hooks

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

  // Callbacks

  const onTokenChanged = (event) => {
    setToken(event.target.value)
  }

  const onConfirm = async (event) => {
    event.preventDefault()
    try {
      await RestService.api.auth.register.put({
        username,
        token
      })
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
    RestService.api.auth.register.post({
      username,
      password
    })
      .catch((error) => setError(error))
  }

  // Rendering

  return (
    <form className='form'>

      <h2 className='form-title'>
        {title}
      </h2>

      <p className='form-text'>
        {text}
      </p>

      <Input
        className='form-control'
        name='alpha-token'
        placeholder={tokenPlaceholder}
        required
        value={token}
        onChange={onTokenChanged}
      />

      <Button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        tooltip={submitTooltip}
        onClick={onConfirm}
      >
        {submitTitle}
      </Button>

      <p className={`form-control label ${error ? 'error' : ''}`}>
        {error ? errorMessage : ''}
      </p>

      <Button
        className='form-link'
        tooltip={submitTooltip}
        onClick={onResend}
      >
        {linkResend}
      </Button>

      <Button
        className='form-link'
        tooltip={submitTooltip}
        onClick={onBack}
      >
        {linkBack}
      </Button>

    </form>
  )
}

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
        to={{
          pathname: AppRoutes.LOGIN,
          state: { from: AppRoutes.REGISTER }
        }}
      >
        {linkLogin}
      </Link>

    </div>
  )
}

export default Register
