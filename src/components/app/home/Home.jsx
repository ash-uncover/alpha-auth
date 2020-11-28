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

const Home = () => {
  const { t } = useTranslation()
  const title = t('app:home.title')
  const titleSectionInfo = t('app:home.info.title')
  const titleSectionDanger = t('app:home.danger.title')

  return (
    <AppArea>
      <h1>{title}</h1>

      <AppSection title={titleSectionInfo}>
        content
      </AppSection>

      <AppSection title={titleSectionDanger}>
        content
      </AppSection>
    </AppArea>
  )
}

export default Home
