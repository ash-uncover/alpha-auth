import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import './Support.scss'

const Support = () => {
  const { t } = useTranslation()
  const title = t('app:support.title')

  const contactTitle = t('app:support.contact.title')

  return (
    <AppContent className='support'>
      <AppArea>
        <h1>{title}</h1>
        <AppSection title={contactTitle}>
          ...
        </AppSection>
      </AppArea>
    </AppContent>
  )
}

export default Support
