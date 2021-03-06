import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  Button
} from '@uncover/react-commons'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
  faCheckCircle,
  faComment,
  faCommentDots,
  faCommentSlash,
  faTimesCircle,
  faUserSlash
} from '@fortawesome/free-solid-svg-icons'

import './UserTile.scss'

const UserTile = ({
  name,
  avatar,
  description,
  onAccept,
  onReject,
  onBlock,
  onUnblock,
  onDelete,
  onMessage
}) => {
  /* HOOKS */
  const { t } = useTranslation()

  const acceptTooltip = t('app:social.actions.accept.tooltip')
  const rejectTooltip = t('app:social.actions.reject.tooltip')
  const blockTooltip = t('app:social.actions.block.tooltip')
  const unblockTooltip = t('app:social.actions.unblock.tooltip')
  const deleteTooltip = t('app:social.actions.delete.tooltip')
  const chatTooltip = t('app:social.actions.chat.tooltip')

  /* RENDERING */

  return (
    <div className='user-tile'>
      <div className='header'>
        <img
          className='avatar'
          src={avatar}
        />
      </div>
      <div className='content'>
        <h3 className='name'>
          {name}
        </h3>
        <p className='description'>
          {description}
        </p>
        <p className='actions'>
          {onAccept && (
            <UserTileAction
              className='accept'
              icon={faCheckCircle}
              tooltip={acceptTooltip}
              onClick={onAccept}
            />
          )}
          {onReject && (
            <UserTileAction
              className='reject'
              icon={faTimesCircle}
              tooltip={rejectTooltip}
              onClick={onReject}
            />
          )}
          {onBlock && (
            <UserTileAction
              className='reject'
              icon={faCommentSlash}
              tooltip={blockTooltip}
              onClick={onBlock}
            />
          )}
          {onUnblock && (
            <UserTileAction
              className='accept'
              icon={faComment}
              tooltip={unblockTooltip}
              onClick={onUnblock}
            />
          )}
          {onDelete && (
            <UserTileAction
              className='reject'
              icon={faUserSlash}
              tooltip={deleteTooltip}
              onClick={onDelete}
            />
          )}
          {onMessage && (
            <UserTileAction
              className='info'
              icon={faCommentDots}
              tooltip={chatTooltip}
              onClick={onMessage}
            />
          )}
        </p>
      </div>
    </div>
  )
}

const UserTileAction = ({
  className,
  icon,
  tooltip,
  onClick
}) => {
  return (
    <Button
      className={`user-tile-action ${className}`}
      tooltip={tooltip}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  )
}

export default UserTile
