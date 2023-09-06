import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from '../../../lib/hooks'

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
} from '../../commons/shell/Shell'

import ImageUploader from '../../../lib/components/ImageUploader'
import { CONFIG } from '../../../config'

import './Account.css'
import { useUser } from '../../../store'
import { UsersService } from '../../../services/rest/UsersService'
import { User } from 'alpha-auth-common/build/services/auth/auth.model'

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

  const user: User = useSelector(AuthSelectors.logonData)

  const [name, setName] = useState(user.name)
  const [description, setDescription] = useState(user.description)

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onAvatarChange = (file) => {
    UsersService.postUserAvatar(dispatch, user.id, file)
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
    UsersService.patchUser(dispatch, user.id, userData)
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
                  name=''
                  src={`${CONFIG.ALPHA_AUTH_REST_URL}/${user.avatar}`}
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
                disabled={name === user.name && description === user.description}
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