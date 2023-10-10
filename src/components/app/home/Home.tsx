import React from 'react'

import {
  useTranslation
} from '../../../lib/hooks'

import {
  ShellMainArea,
  Panel,
} from '@uncover/react-commons'

import './Home.css'

// ---------------------------------------------------
// Create Component Home
// ---------------------------------------------------

interface HomeProperties {

}
export const Home = ({

}: HomeProperties) => {

  // Hooks //

  const { t } = useTranslation('app')
  const title = t('home.title')
  const infoTitle = t('home.info.title')

  // Rendering //

  return (
    <ShellMainArea
      className='ap-auth-home'
      title={title}
    >
      <Panel
        title={infoTitle}
      >
        <p>...</p>
      </Panel>
    </ShellMainArea>
  )
}
