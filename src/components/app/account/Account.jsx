import React from 'react'

import {
  useDispatch,
  useQuery,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  GraphQLService,
  RestService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  Button
} from '@uncover/react-commons'

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
} from 'components/app/App'

import ImageUploader from 'lib/components/ImageUploader'
import CONFIG from 'configuration'
import './Account.scss'

const Account = () => {
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
    loading,
    error,
    data
  } = useQuery(GraphQLService.query.getViewerInfo())

  const {
    token,
    userId
  } = useSelector(AuthSelectors.selectLogonData)

  const [name, setName] = useState(data.viewer.name)
  const [avatar, setAvatar] = useState(data.viewer.avatar)
  const [description, setDescription] = useState(data.viewer.description)

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
    RestService.api.users.patch(dispatch, token, userId, {
      name,
      description
    })
  }

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
                  src={`${CONFIG.ALPHA_AUTH_REST_URL}/${avatar}`}
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
                disabled={name === data.name && description === data.description}
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

export default Account
