import React, { ReactNode } from 'react'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ClassBuilder } from '../ComponentUtil'

import './Avatar.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

type AVATAR_SIZE = 'XS' | 'S' | 'M' | 'L' | 'XL'
export const AVATAR_SIZES: {
  XS: AVATAR_SIZE
  S: AVATAR_SIZE
  M: AVATAR_SIZE
  L: AVATAR_SIZE
  XL: AVATAR_SIZE
} = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
}

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AvatarProperties {
  className?: string
  style?: React.CSSProperties

  icon?: IconProp
  image?: string
  initials?: string
  size?: AVATAR_SIZE
  title?: string
  onClick?: (event: React.FormEvent<HTMLDivElement>) => void
}
export const Avatar = ({
  className,
  style,

  icon,
  image,
  initials,
  size = AVATAR_SIZES.S,
  title,
  onClick
}: AvatarProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder('ap-avatar')

  classes.add(className)

  classes.add(`ap-avatar--${size.toLowerCase()}`)
  if (onClick) {
    classes.add(`ap-avatar--interactive`)
  }

  let content: ReactNode = <span />
  if (image) {
    classes.add(`ap-avatar--image`)
    content = (
      <img
        className='ap-avatar__content'
        src={image}
      />
    )
  } else if (icon) {
    classes.add(`ap-avatar--icon`)
    content = (
      <FontAwesomeIcon
        className='ap-avatar__content'
        icon={icon}
      />
    )
  } else if (initials) {
    classes.add(`ap-avatar--initials`)
    content = (
      <span className='ap-avatar__content'>
        {initials.substring(0, 2).toUpperCase()}
      </span>
    )
  } else {
    // Default to user icon
    classes.add(`ap-avatar--icon`)
    content = (
      <FontAwesomeIcon
        className='ap-avatar__content'
        icon={faUser}
      />
    )
  }

  return (
    <div
      className={classes.className}
      style={style}
      title={title}
      onClick={onClick}
    >
      {content}
    </div>
  )
}
