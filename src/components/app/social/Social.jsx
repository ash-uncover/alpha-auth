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
          <AppSection title={`${pendingTitle} (${data.pending})`}>
            {
              data.relations
                .filter((relation) => relation && relation.status === RelationsStatus.PENDING)
                .map(({ id, relationId }) => <SocialRelationPending key={id} id={id} relationId={relationId} />)
            }
          </AppSection>
        )}

        <AppSection title={`${activeTitle} (${data.active})`}>
          {
            data.relations
              .filter((relation) => relation && relation.status === RelationsStatus.ACTIVE)
              .map(({ id, relationId }) => <SocialRelationActive key={id} id={id} relationId={relationId} />)
          }
          {data.active === 0 && 'No friends lol'}
        </AppSection>

        {data.waiting > 0 && (
          <AppSection title={`${waitingTitle} (${data.waiting})`}>
            {
              data.relations
                .filter((relation) => relation && relation.status === RelationsStatus.WAITING)
                .map(({ id, relationId }) => <SocialRelationWaiting key={id} id={id} relationId={relationId} />)
            }
          </AppSection>
        )}

        {data.blocked > 0 && (
          <AppSection title={`${blockedTitle} (${data.blocked})`}>
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

  const onAccept = () => {
    RestService.api.relations.patch(dispatch, token, id, 'accept')
  }
  const onReject = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }

  return (
    <SocialRelation id={relationId}>
      <SocialRelationAction
        icon={faCheckCircle}
        onClick={onAccept}
      />
      <SocialRelationAction
        icon={faTimesCircle}
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
        icon={faCommentSlash}
        onClick={onBlock}
      />
      <SocialRelationAction
        icon={faUserSlash}
        onClick={onDelete}
      />
      <SocialRelationAction
        icon={faCommentDots}
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

  const onUnblock = () => {
    RestService.api.relations.patch(dispatch, token, id, 'unblock')
  }
  const onDelete = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }
  return (
    <SocialRelation id={relationId}>
      <SocialRelationAction
        icon={faComment}
        onClick={onUnblock}
      />
      <SocialRelationAction
        icon={faUserSlash}
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
        {userData.name}
        {userData.description}
        {children}
      </div>
    )
  }
}

const SocialRelationAction = ({
  icon,
  tooltip,
  onClick
}) => {
  return (
    <Button
      className='social-relation-action'
      title={tooltip}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  )
}

export default Social
