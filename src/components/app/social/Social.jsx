import React from 'react'

import {
  useDispatch,
  useQuery,
  useSelector,
  useState,
  useTranslation
} from 'lib/hooks'

import {
  UserTile
} from 'components/commons'

import RelationsStatus from 'lib/constants/RelationsStatus'

import {
  GraphQLService,
  RestService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import CONFIG from 'configuration'
import SearchBar from 'lib/components/SearchBar'

import './Social.less'

const Social = () => {
  const [search, setSearch] = useState('')

  const {
    loading,
    error,
    data
  } = useQuery(GraphQLService.query.getViewerRelations())

  const { t } = useTranslation()
  const title = t('app:social.title')
  const searchPlaceholder = t('app:social.search.placeholder')
  const pendingTitle = t('app:social.pending.title')
  const activeTitle = t('app:social.active.title')
  const waitingTitle = t('app:social.waiting.title')
  const blockedTitle = t('app:social.ignore.title')

  const onSearch = (value) => {
    setSearch(value)
  }

  if (loading) {
    return (
      <AppContent className='social'>
        <AppArea title={title}>
          Loading.....
        </AppArea>
      </AppContent>
    )
  }

  if (error) {
    return (
      <AppContent className='social'>
        <AppArea title={title}>
          Error
          <br />
          {error}
        </AppArea>
      </AppContent>
    )
  }

  const dataGQL = data.viewer.relations.reduce((acc, relation) => {
    acc.relations.push(relation)
    acc[relation.status.toLowerCase()]++
    return acc
  }, { relations: [], pending: 0, active: 0, waiting: 0, blocked: 0 })

  return (
    <AppContent className='social'>
      <AppArea title={title}>

        <SearchBar
          placeholder={searchPlaceholder}
          value={search}
          onChange={onSearch}
        />

        {dataGQL.pending > 0 && (
          <AppSection
            title={`${pendingTitle} (${dataGQL.pending})`}
            className='social-section'
          >
            {
              dataGQL.relations
                .filter((relation) => relation && relation.status === RelationsStatus.PENDING)
                .map(({ id, user }) => <SocialRelationPending key={id} userId={user.id} />)
            }
          </AppSection>
        )}

        <AppSection
          className='social-section'
          title={`${activeTitle} (${dataGQL.active})`}
        >
          {
            dataGQL.relations
              .filter((relation) => relation && relation.status === RelationsStatus.ACTIVE)
              .map(({ id, user }) => <SocialRelationActive key={id} userId={user.id} />)
          }
          {dataGQL.active === 0 && 'No friends lol'}
        </AppSection>

        {dataGQL.waiting > 0 && (
          <AppSection
            className='social-section'
            title={`${waitingTitle} (${dataGQL.waiting})`}
          >
            {
              dataGQL.relations
                .filter((relation) => relation && relation.status === RelationsStatus.WAITING)
                .map(({ id, user }) => <SocialRelationWaiting key={id} userId={user.id} />)
            }
          </AppSection>
        )}

        {dataGQL.blocked > 0 && (
          <AppSection
            className='social-section'
            title={`${blockedTitle} (${dataGQL.blocked})`}
          >
            {
              dataGQL.relations
                .filter((relation) => relation && relation.status === RelationsStatus.BLOCKED)
                .map(({ id, user }) => <SocialRelationIgnore key={id} userId={user.id} />)
            }
          </AppSection>
        )}
      </AppArea>
    </AppContent>
  )
}

const SocialRelationPending = ({
  id,
  userId
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
      id={id}
      userId={userId}
      onAccept={onAccept}
      onReject={onReject}
    />
  )
}

const SocialRelationActive = ({
  id,
  userId
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
      id={id}
      userId={userId}
      onBlock={onBlock}
      onDelete={onDelete}
      onMessage={onMessage}
    />
  )
}

const SocialRelationWaiting = ({
  id,
  userId
}) => {
  return (
    <SocialRelation
      id={id}
      userId={userId}
    />
  )
}

const SocialRelationIgnore = ({
  id,
  userId
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
      id={id}
      userId={userId}
      onUnblock={onUnblock}
      onDelete={onDelete}
    />
  )
}

const SocialRelation = ({
  id,
  userId,
  onAccept,
  onReject,
  onUnblock,
  onBlock,
  onDelete,
  onChat
}) => {
  // HOOKS //

  const {
    loading,
    error,
    data
  } = useQuery(GraphQLService.query.getUser(userId))

  // RENDERING //

  if (loading) {
    return (
      <div className='social-relation'>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className='social-relation'>
        Error
      </div>
    )
  }

  const { user } = data

  return (
    <UserTile
      name={user.name}
      avatar={`${CONFIG.ALPHA_AUTH_REST_URL}/${user.avatar}`}
      description={user.description}
      onAccept={onAccept}
      onReject={onReject}
      onUnblock={onUnblock}
      onBlock={onBlock}
      onDelete={onDelete}
      onChat={onChat}
    />
  )
}

export default Social
