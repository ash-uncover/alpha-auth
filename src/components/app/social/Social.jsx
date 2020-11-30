import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  Button
} from '@uncover/react-commons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faComment,
  faCommentDots,
  faCommentSlash,
  faTimesCircle,
  faUserSlash
} from '@fortawesome/free-solid-svg-icons'

import DataStates from 'lib/constants/DataStates'
import RelationsStatus from 'lib/constants/RelationsStatus'

import {
  RestService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  selectors as RelationsSelectors
} from 'store/rest/relations'

import {
  selectors as UsersSelectors
} from 'store/rest/users'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import './Social.scss'

const Social = () => {
  const { t } = useTranslation()
  const title = t('app:social.title')

  const pendingTitle = t('app:social.pending.title')

  const activeTitle = t('app:social.active.title')

  const waitingTitle = t('app:social.waiting.title')

  const blockedTitle = t('app:social.ignore.title')

  const { userId } = useSelector(AuthSelectors.authLogonDataSelector)
  const userRelationsData = useSelector(UsersSelectors.restUserRelationsDataSelector(userId))

  const data = userRelationsData.reduce((acc, relationId) => {
    const relation = useSelector(RelationsSelectors.restRelationDataSelector(relationId))
    acc.relations.push(relation)
    acc[relation.status.toLowerCase()]++
    return acc
  }, { relations: [], pending: 0, active: 0, waiting: 0, blocked: 0 })

  return (
    <AppContent className='social'>
      <AppArea>
        <h1>{title}</h1>

        {data.pending > 0 && (
          <AppSection
            title={`${pendingTitle} (${data.pending})`}
            className='social-section'
          >
            {
              data.relations
                .filter((relation) => relation && relation.status === RelationsStatus.PENDING)
                .map(({ id, relationId }) => <SocialRelationPending key={id} id={id} relationId={relationId} />)
            }
          </AppSection>
        )}

        <AppSection
          className='social-section'
          title={`${activeTitle} (${data.active})`}
        >
          {
            data.relations
              .filter((relation) => relation && relation.status === RelationsStatus.ACTIVE)
              .map(({ id, relationId }) => <SocialRelationActive key={id} id={id} relationId={relationId} />)
          }
          {data.active === 0 && 'No friends lol'}
        </AppSection>

        {data.waiting > 0 && (
          <AppSection
            className='social-section'
            title={`${waitingTitle} (${data.waiting})`}
          >
            {
              data.relations
                .filter((relation) => relation && relation.status === RelationsStatus.WAITING)
                .map(({ id, relationId }) => <SocialRelationWaiting key={id} id={id} relationId={relationId} />)
            }
          </AppSection>
        )}

        {data.blocked > 0 && (
          <AppSection
            className='social-section'
            title={`${blockedTitle} (${data.blocked})`}
          >
            {
              data.relations
                .filter((relation) => relation && relation.status === RelationsStatus.BLOCKED)
                .map(({ id, relationId }) => <SocialRelationIgnore key={id} id={id} relationId={relationId} />)
            }
          </AppSection>
        )}
      </AppArea>
    </AppContent>
  )
}

const SocialRelationPending = ({
  id,
  relationId
}) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.authLogonDataTokenSelector)

  const { t } = useTranslation()
  const acceptTooltip = t('app:social.actions.accept.tooltip')
  const rejectTooltip = t('app:social.actions.reject.tooltip')

  const onAccept = () => {
    RestService.api.relations.patch(dispatch, token, id, 'accept')
  }
  const onReject = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }

  return (
    <SocialRelation id={relationId}>
      <SocialRelationAction
        className='accept'
        icon={faCheckCircle}
        tooltip={acceptTooltip}
        onClick={onAccept}
      />
      <SocialRelationAction
        className='reject'
        icon={faTimesCircle}
        tooltip={rejectTooltip}
        onClick={onReject}
      />
    </SocialRelation>
  )
}

const SocialRelationActive = ({
  id,
  relationId
}) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.authLogonDataTokenSelector)

  const { t } = useTranslation()
  const blockTooltip = t('app:social.actions.block.tooltip')
  const deleteTooltip = t('app:social.actions.delete.tooltip')
  const chatTooltip = t('app:social.actions.chat.tooltip')

  const onBlock = () => {
    RestService.api.relations.patch(dispatch, token, id, 'block')
  }
  const onDelete = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }
  const onMessage = () => {

  }
  return (
    <SocialRelation id={relationId}>
      <SocialRelationAction
        className='reject'
        icon={faCommentSlash}
        tooltip={blockTooltip}
        onClick={onBlock}
      />
      <SocialRelationAction
        className='reject'
        icon={faUserSlash}
        tooltip={deleteTooltip}
        onClick={onDelete}
      />
      <SocialRelationAction
        className='info'
        icon={faCommentDots}
        tooltip={chatTooltip}
        onClick={onMessage}
      />
    </SocialRelation>
  )
}

const SocialRelationWaiting = ({
  id,
  relationId
}) => {
  return (
    <SocialRelation id={relationId} />
  )
}

const SocialRelationIgnore = ({
  id,
  relationId
}) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.authLogonDataTokenSelector)

  const { t } = useTranslation()
  const unblockTooltip = t('app:social.actions.unblock.tooltip')
  const deleteTooltip = t('app:social.actions.delete.tooltip')

  const onUnblock = () => {
    RestService.api.relations.patch(dispatch, token, id, 'unblock')
  }
  const onDelete = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }
  return (
    <SocialRelation id={relationId}>
      <SocialRelationAction
        className='accept'
        icon={faComment}
        tooltip={unblockTooltip}
        onClick={onUnblock}
      />
      <SocialRelationAction
        className='reject'
        icon={faUserSlash}
        tooltip={deleteTooltip}
        onClick={onDelete}
      />
    </SocialRelation>
  )
}

const SocialRelation = ({
  id,
  children
}) => {
  const dispatch = useDispatch()

  const token = useSelector(AuthSelectors.authLogonDataTokenSelector)

  const userData = useSelector(UsersSelectors.restUserDataSelector(id))
  const userStatus = useSelector(UsersSelectors.restUserStatusSelector(id))

  useEffect(() => {
    if (userStatus === DataStates.NEVER || userStatus === DataStates.OUTDATED) {
      RestService.api.users.get(dispatch, token, id)
    }
  })

  switch (userStatus) {
    case DataStates.NEVER: return (
      <div className='social-relation'>
        Not Loaded
      </div>
    )
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: return (
      <div className='social-relation'>
        Loading...
      </div>
    )
    case DataStates.FAILURE: return (
      <div className='social-relation'>
        Error
      </div>
    )
    default: return (
      <div className='social-relation'>
        <h3 className='title'>
          {userData.name}
        </h3>
        <p className='info'>
          {userData.description}
        </p>
        <p className='actions'>
          {children}
        </p>
      </div>
    )
  }
}

const SocialRelationAction = ({
  className,
  icon,
  tooltip,
  onClick
}) => {
  return (
    <Button
      className={`social-relation-action ${className}`}
      tooltip={tooltip}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  )
}

export default Social
