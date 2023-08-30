import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
  useTranslation
} from 'lib/hooks'

import RelationsStatus from 'lib/constants/RelationsStatus'

import {
  RestService,
  StoreService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  selectors as RelationsSelectors
} from 'store/rest/relations'

import {
  AppContent,
  AppArea,
  AppSection
} from 'components/app/App'

import SocialRelation from 'components/app/social/SocialRelation'

import SearchBar from 'lib/components/SearchBar'

import './Social.css'

const Social = () => {
  const [search, setSearch] = useState('')

  const { userId } = useSelector(AuthSelectors.selectLogonData)
  const relations = StoreService.useUserRelations(userId)

  const { t } = useTranslation()
  const title = t('app:social.title')
  const searchPlaceholder = t('app:social.search.placeholder')
  const pendingTitle = t('app:social.pending.title')
  const activeTitle = t('app:social.active.title')
  const waitingTitle = t('app:social.waiting.title')
  const blockedTitle = t('app:social.ignore.title')

  if (relations.status.loading) {
    return (
      <AppContent className='social'>
        <AppArea title={title}>
          Loading.....
        </AppArea>
      </AppContent>
    )
  }

  if (relations.status.error) {
    return (
      <AppContent className='social'>
        <AppArea title={title}>
          Error
          <br />
          {relations.error}
        </AppArea>
      </AppContent>
    )
  }

  const data = relations.data.reduce((acc, relationId) => {
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
                .map(({ id, relationId }) => <SocialRelationPending key={id} id={id} userId={relationId} />)
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
              .map(({ id, relationId }) => <SocialRelationActive key={id} id={id} userId={relationId} />)
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
                .map(({ id, relationId }) => <SocialRelationWaiting key={id} id={id} userId={relationId} />)
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
                .map(({ id, relationId }) => <SocialRelationIgnore key={id} id={id} userId={relationId} />)
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
  const token = useSelector(AuthSelectors.selectToken)

  const onAccept = () => {
    RestService.api.relations.patch(dispatch, token, id, 'accept')
  }
  const onReject = () => {
    RestService.api.relations.delete(dispatch, token, id)
  }

  return (
    <SocialRelation
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
      userId={userId}
      onBlock={onBlock}
      onDelete={onDelete}
      onMessage={onMessage}
    />
  )
}

const SocialRelationWaiting = ({
  id, // eslint-disable-line no-unused-vars
  userId
}) => {
  return (
    <SocialRelation
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
      userId={userId}
      onUnblock={onUnblock}
      onDelete={onDelete}
    />
  )
}

export default Social
