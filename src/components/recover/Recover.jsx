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

import './Recover.scss'

const Recover = () => {
  // Hooks

  const { t } = useTranslation()

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
    <div className='ap-recover'>
      <form className='form'>

        <h2 className='form-title'>
          {t('recover.title')}
        </h2>

        <Input
          className='form-control'
          placeholder={t('recover.username.placeholder')}
          required
          name='ap-username'
          value={username}
          onChange={onUsernameChanged}
        />

        <Button
          className='form-control'
          type='submit'
          onClick={onRecover}
        >
          {t('recover.submit.title')}
        </Button>

        <Link
          className='form-link'
          to={{
            pathname: Routes.LOGIN,
            state: { from: Routes.RECOVER }
          }}
        >
          {t('recover.login.link')}
        </Link>

      </form>
    </div>
  )
}

export default Recover
