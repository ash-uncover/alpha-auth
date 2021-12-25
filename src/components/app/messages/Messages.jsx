import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  AppContent,
  AppArea,
  AppPanel
} from 'components/app/App'

import './Messages.less'

const Messages = () => {
  const { t } = useTranslation()
  const title = t('app:messages.title')

  return (
    <AppContent className='messages'>
      <AppPanel>
        <h1>{title}</h1>
        ...
      </AppPanel>
      <AppArea title={title}>
        ...
      </AppArea>
    </AppContent>
  )
}

export default Messages
