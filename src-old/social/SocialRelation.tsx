import React from 'react'

import {
  StoreService
} from 'services'

import {
  UserTile
} from 'components/commons'

import CONFIG from 'configuration'

const SocialRelation = ({
  userId,
  onAccept,
  onReject,
  onUnblock,
  onBlock,
  onDelete,
  onMessage
}) => {
  // HOOKS //

  const user = StoreService.useUser(userId)

  // RENDERING //

  if (!user.status.loaded) {
    return (
      <div className='social-relation'>
        Loading...
      </div>
    )
  }

  if (user.status.error) {
    return (
      <div className='social-relation'>
        {user.error}
      </div>
    )
  }

  return (
    <UserTile
      name={user.data.name}
      avatar={`${CONFIG.ALPHA_AUTH_REST_URL}/${user.data.avatar}`}
      description={user.data.description}
      onAccept={onAccept}
      onReject={onReject}
      onUnblock={onUnblock}
      onBlock={onBlock}
      onDelete={onDelete}
      onMessage={onMessage}
    />
  )
}

export default SocialRelation
