import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from '../../../lib/hooks'

import {
  RestService,
  StoreService
} from '../../../services'

import {
  AuthSelectors
} from '../../../store/auth/auth.selectors'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

import {
  AppContent,
  AppArea,
  AppSection
} from '../App'

import ImageUploader from '../../../lib/components/ImageUploader'
import CONFIG from '../../../config'

import './Account.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

export const Account = () => {

  // Hooks //

  const dispatch = useDispatch()

  const { t } = useTranslation()
  const title = t('app:account.title')
  const infoTitle = t('app:account.info.title')
  const infoAvatarTitle = t('app:account.info.avatar.title')
  const infoAvatarTooltip = t('app:account.info.avatar.tooltip')
  const infoNameTitle = t('app:account.info.name.title')
  const infoNameTooltip = t('app:account.info.name.tooltip')
  const infoNamePlaceholder = t('app:account.info.name.placeholder')
  const infoDescTitle = t('app:account.info.description.title')
  const infoDescTooltip = t('app:account.info.description.tooltip')
  const infoDescPlaceholder = t('app:account.info.description.placeholder')
  const infoSubmitTitle = t('app:account.info.submit.title')
  const infoSubmitTooltip = t('app:account.info.submit.tooltip')
  const accountTitle = t('app:account.manage.title')

  const {
    token,
    userId
  } = useSelector(AuthSelectors.logonData)

  const user = StoreService.useUser(userId)

  const [name, setName] = useState(user.data.name)
  const [description, setDescription] = useState(user.data.description)

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onAvatarChange = (file) => {
    RestService.api.users.postAvatar(dispatch, token, userId, file)
  }

  const onDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onUpdateInfo = (event) => {
    event.preventDefault()
    const userData = {
      name,
      description
    }
    RestService.api.users.patch(dispatch, token, userId, userData)
  }

  // Rendering //

  return (
    <AppContent className='account'>
      <AppArea title={title}>
        <AppSection title={infoTitle}>
          <form>
            <div className='form-group'>
              <label className='form-label'>
                {infoAvatarTitle}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size='sm'
                  title={infoAvatarTooltip}
                />
              </label>
              <div className='form-control form-avatar'>
                <ImageUploader
                  src={`${CONFIG.ALPHA_AUTH_REST_URL}/${user.data.avatar}`}
                  onChange={onAvatarChange}
                />
              </div>
            </div>
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
                value={name || ''}
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
                rows={5}
                placeholder={infoDescPlaceholder}
                value={description}
                onChange={onDescriptionChange}
              />
            </div>
            <div className='form-group actions'>
              <button
                className='form-submit'
                type='submit'
                disabled={name === user.data.name && description === user.data.description}
                title={infoSubmitTooltip}
                onClick={onUpdateInfo}
              >
                {infoSubmitTitle}
              </button>
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