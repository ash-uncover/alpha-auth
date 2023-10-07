import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ClassBuilder } from '../ComponentUtil'

import './ShellMenuItem.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ShellMenuItemProperties {
  className?: string
  style?: React.CSSProperties

  expanded?: boolean
  icon?: IconProp
  text: string
  to: string
}
export const ShellMenuItem = ({
  className,
  style,

  expanded,
  icon,
  text,
  to,
}: ShellMenuItemProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-menu-item', className])

  return (
    <NavLink
      className={classes.className}
      style={style}
      to={to}
    >
      <span className='ap-shell-menu-item__icon'>
        <FontAwesomeIcon
          icon={icon}
        />
      </span>

      <span className='ap-shell-menu-item__text'>
        {text}
      </span>
    </NavLink>
  )
}
