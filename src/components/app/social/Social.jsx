import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector,
  useState,
  useTranslation
} from 'lib/hooks'

import {
  UserTile
} from 'components/commons'

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

import CONFIG from 'configuration'
import SearchBar from 'lib/components/SearchBar'

import './Social.scss'

const Social = () => {
  const [search, setSearch] = useState('')

  const { t } = useTranslation()
  const title = t('app:social.title')
  const searchPlaceholder = t('app:social.search.placeholder')
  const pendingTitle = t('app:social.pending.title')
  const activeTitle = t('app:social.active.title')
  const waitingTitle = t('app:social.waiting.title')
  const blockedTitle = t('app:social.ignore.title')

  const { userId } = useSelector(AuthSelectors.selectLogonData)
  const userRelationsData = useSelector(UsersSelectors.selectUserRelationsData(userId))

  const data = userRelationsData.reduce((acc, relationId) => {
    const relation = useSelector(RelationsSelectors.selectRelationData(relationId))
    acc.relations.push(relation)
    acc[relation.status.toLowerCase()]++
    return acc
  }, { relations: [], pending: 0, active: 0, waiting: 0, blocked: 0 })

  const onSearch = (value) => {
    setSearch(value)
  }

  return (
    <AppContent className='social'>
      <AppArea title={title}>

        <SearchBar
          placeholder={searchPlaceholder}
          value={search}
          onChange={onSearch}
        />

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
  const token = useSelector(AuthSelectors.selectLogonDataToken)

  const onAccept = () => {
    RestService.api.relations.patch(dispatch, token, id, 'accept')
  }
  const onReject = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }

  return (
    <SocialRelation
      id={relationId}
      onAccept={onAccept}
      onReject={onReject}
    />
  )
}

const SocialRelationActive = ({
  id,
  relationId
}) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.selectToken)

  const onBlock = () => {
    RestService.api.relations.patch(dispatch, token, id, 'block')
  }
  const onDelete = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }
  const onMessage = () => {

  }
  return (
    <SocialRelation
      id={relationId}
      onBlock={onBlock}
      onDelete={onDelete}
      onMessage={onMessage}
    />
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
  const token = useSelector(AuthSelectors.selectToken)

  const onUnblock = () => {
    RestService.api.relations.patch(dispatch, token, id, 'unblock')
  }
  const onDelete = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }
  return (
    <SocialRelation
      id={relationId}
      onUnblock={onUnblock}
      onDelete={onDelete}
    />
  )
}

const SocialRelation = ({
  id,
  onAccept,
  onReject,
  onUnblock,
  onBlock,
  onDelete,
  onChat
}) => {
  const dispatch = useDispatch()

  const token = useSelector(AuthSelectors.selectToken)

  const userData = useSelector(UsersSelectors.selectUserData(id))
  const userStatus = useSelector(UsersSelectors.selectUserStatus(id))

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
      <UserTile
        name={userData.name}
        avatar={`${CONFIG.ALPHA_AUTH_REST_URL}/${userData.avatar}`}
        description={userData.description}
        onAccept={onAccept}
        onReject={onReject}
        onUnblock={onUnblock}
        onBlock={onBlock}
        onDelete={onDelete}
        onChat={onChat}
      />
    )
  }
}

export default Social
