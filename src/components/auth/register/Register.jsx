import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  Button,
  Input
} from '@uncover/react-commons'

import {
  Routes
} from 'lib/constants'

import {
  useTranslation,
  useState
} from 'lib/hooks'

import './Register.scss'

const Register = () => {
  // Hooks

  const { t } = useTranslation()

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
    <div className='ap-register'>
      <form className='form'>

        <h2 className='form-title'>
          {t('register.title')}
        </h2>

        <Input
          className='form-control'
          placeholder={t('auth.username.placeholder')}
          required
          name='alpha-username'
          value={username}
          onChange={onUsernameChanged}
        />

        <Button
          className='form-control'
          type='submit'
          onClick={onRegister}
        >
          {t('register.submit.title')}
        </Button>

        <Link
          className='form-link'
          to={{
            pathname: Routes.LOGIN,
            state: { from: Routes.REGISTER }
          }}
        >
          {t('register.login.link')}
        </Link>

      </form>
    </div>
  )
}

export default Register
