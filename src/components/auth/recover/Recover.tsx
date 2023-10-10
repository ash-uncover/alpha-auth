import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  useState,
  useTranslation
} from '../../../lib/hooks'

import {
  AppRoutes
} from '../../../lib/constants'

import {
  Button,
  Input,
  Title,
} from '@uncover/react-commons'

// ---------------------------------------------------
// Create Component Recover
// ---------------------------------------------------

export const Recover = () => {

  // Hooks //

  const { t } = useTranslation(['auth'])
  const recoverTitle = t('recover.title')
  const usernamePlaceholder = t('recover.username.placeholder')
  const submitTitle = t('recover.submit.title')
  const submitTooltip = t('recover.submit.tooltip')
  const linkLogin = t('recover.links.login')

  const [username, setUsername] = useState('')

  const disabled = !username

  // Callbacks //

  const onUsernameChanged = (event) => {
    setUsername(event.target.value)
  }

  const onRecover = (event) => {
    event.preventDefault()
  }

  // Rendering //

  return (
    <form
      className='ap-auth__form'
    >

      <Title
        className='form-title'
        level='H2'
        text={recoverTitle}
      />

      <Input
        className='form-control'
        autoFocus
        name='alpha-username'
        placeholder={usernamePlaceholder}
        required
        value={username}
        onChange={onUsernameChanged}
      />

      <Button
        className='form-control form-submit'
        type='submit'
        disabled={disabled}
        title={submitTooltip}
        onClick={onRecover}
      >
        {submitTitle}
      </Button>

      <p className='form-control label' />

      <Link
        className='form-link ap-link'
        to={AppRoutes.BASE}
      >
        {linkLogin}
      </Link>

    </form>
  )
}
