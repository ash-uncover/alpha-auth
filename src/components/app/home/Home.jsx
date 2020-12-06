import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  RestService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  selectors as UsersSelectors
} from 'store/rest/users'

import {
  Button
} from '@uncover/react-commons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const title = t('app:home.title')

  const infoTitle = t('app:home.info.title')
  const infoNameTitle = t('app:home.info.name.title')
  const infoNameTooltip = t('app:home.info.name.tooltip')
  const infoNamePlaceholder = t('app:home.info.name.placeholder')
  const infoDescTitle = t('app:home.info.description.title')
  const infoDescTooltip = t('app:home.info.description.tooltip')
  const infoDescPlaceholder = t('app:home.info.description.placeholder')
  const infoSubmitTitle = t('app:home.info.submit.title')
  const infoSubmitTooltip = t('app:home.info.submit.tooltip')

  const accountTitle = t('app:home.account.title')

  const {
    token,
    userId
  } = useSelector(AuthSelectors.authLogonDataSelector)
  const userData = useSelector(UsersSelectors.restUserDataSelector(userId))

  const [name, setName] = useState(userData.name)
  const [description, setDescription] = useState(userData.description)

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onUpdateInfo = (event) => {
    event.preventDefault()
    RestService.api.users.patch(dispatch, token, userId, {
      name,
      description
    })
  }

  return (
    <AppContent className='home'>
      <AppArea title={title}>
        <AppSection title={infoTitle}>
          <form>
            <div className='form-group'>
              <label className='form-label'>
                {infoNameTitle}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size='sm'
                  title={infoNameTooltip}
                />
              </label>
              <input
                className='form-control'
                placeholder={infoNamePlaceholder}
                value={name}
                onChange={onNameChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>
                {infoDescTitle}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size='sm'
                  title={infoDescTooltip}
                />
              </label>
              <textarea
                className='form-control'
                style={{ resize: 'none' }}
                rows='5'
                placeholder={infoDescPlaceholder}
                value={description}
                onChange={onDescriptionChange}
              />
            </div>
            <div className='form-group actions'>
              <Button
                className='form-submit'
                type='submit'
                disabled={name === userData.name && description === userData.description}
                title={infoSubmitTooltip}
                onClick={onUpdateInfo}
              >
                {infoSubmitTitle}
              </Button>
            </div>
          </form>
        </AppSection>

        <AppSection title={accountTitle}>
          ...
        </AppSection>
      </AppArea>
    </AppContent>
  )
}

export default Home
