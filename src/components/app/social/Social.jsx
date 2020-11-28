import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  selectors as UsersSelectors
} from 'store/rest/users'

import {
  AppArea,
  AppSection
} from 'components/app/App'

import './Social.scss'

const Social = () => {
  const { t } = useTranslation()
  const title = t('app:social.title')

  const pendingTitle = t('app:social.pending.title')

  const friendsTitle = t('app:social.active.title')

  const waitingTitle = t('app:social.waiting.title')

  const ignoreTitle = t('app:social.ignore.title')

  const {
    token,
    userId
  } = useSelector(AuthSelectors.authLogonDataSelector)
  const userData = useSelector(UsersSelectors.restUserDataSelector(userId))

  return (
    <AppArea className='social'>
      <h1>{title}</h1>

      <AppSection title={pendingTitle}>
        ...
      </AppSection>

      <AppSection title={friendsTitle}>
        ...
      </AppSection>

      <AppSection title={waitingTitle}>
        ...
      </AppSection>

      <AppSection title={ignoreTitle}>
        ...
      </AppSection>
    </AppArea>
  )
}

export default Social
