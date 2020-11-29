import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  AppArea,
  AppSection
} from 'components/app/App'

import './Messages.scss'

const Messages = () => {
  const { t } = useTranslation()
  const title = t('app:messages.title')

  const contactTitle = t('app:messages.contact.title')

  return (
    <AppArea className='messages'>
      <h1>{title}</h1>
      <AppSection title={contactTitle}>
        ...
      </AppSection>
    </AppArea>
  )
}

export default Messages
