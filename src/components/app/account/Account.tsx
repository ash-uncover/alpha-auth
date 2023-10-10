import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from '../../../lib/hooks'

import { AuthSelectors } from '../../../store/auth/auth.selectors'
import { UsersService } from '../../../services/rest/UsersService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import { CONFIG } from '../../../config'

import { User } from 'alpha-auth-common/build/services/auth/auth.model'

import {
  Button,
  ButtonSemantics,
  ImageUploader,
  Input,
  Label,
  Panel,
  PanelFooter,
  ShellMainArea,
  TextArea,
} from '@uncover/react-commons'

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

  const user: User = useSelector(AuthSelectors.logonData)

  const [name, setName] = useState(user.name)
  const [description, setDescription] = useState(user.description)

  const onNameChange = (event) => {
    setName(event.value)
  }

  const onAvatarChange = (file) => {
    UsersService.postUserAvatar(dispatch, user.id, file)
  }

  const onDescriptionChange = (event) => {
    setDescription(event.value)
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
    <ShellMainArea
      className='ap-auth-account'
      title={title}
    >
      <Panel title={infoTitle} expandable>
        <form>
          <div className='form-group'>
            <Label className='form-label'>
              {infoAvatarTitle}
              <FontAwesomeIcon
                icon={faInfoCircle}
                size='sm'
                title={infoAvatarTooltip}
              />
            </Label>
            <div className='form-control form-avatar'>
              <ImageUploader
                name=''
                src={`${CONFIG.ALPHA_AUTH_REST_URL}/${user.avatar}`}
                onChange={onAvatarChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <Label className='form-label'>
              {infoNameTitle}
              <FontAwesomeIcon
                icon={faInfoCircle}
                size='sm'
                title={infoNameTooltip}
              />
            </Label>
            <Input
              className='form-control'
              placeholder={infoNamePlaceholder}
              value={name || ''}
              onChange={onNameChange}
            />
          </div>
          <div className='form-group'>
            <Label className='form-label'>
              {infoDescTitle}
              <FontAwesomeIcon
                icon={faInfoCircle}
                size='sm'
                title={infoDescTooltip}
              />
            </Label>
            <TextArea
              className='form-control'
              style={{ resize: 'none' }}
              rows={5}
              placeholder={infoDescPlaceholder}
              value={description}
              onChange={onDescriptionChange}
            />
          </div>

          <PanelFooter className='form-group actions'>
            <Button
              disabled={name === user.name && description === user.description}
              semantic={ButtonSemantics.PRINCIPAL}
              title={infoSubmitTooltip}
              type='submit'
              onClick={onUpdateInfo}
            >
              {infoSubmitTitle}
            </Button>
          </PanelFooter>
        </form>
      </Panel>

      <Panel title={accountTitle}>
        ...
      </Panel>
    </ShellMainArea>
  )
}