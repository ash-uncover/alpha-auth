import React, { ReactNode, useState } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './ShellMenu.css'
import { Title } from '../title/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ShellMenuProperties {
  className?: string
  style?: React.CSSProperties

  expanded?: boolean
  title?: string

  children?: ReactNode
}
export const ShellMenu = ({
  className,
  style,

  expanded = true,
  title,

  children,
}: ShellMenuProperties) => {

  // Hooks //

  const [expandedState, setExpandedState] = useState(expanded)

  // Events //

  function handleToggleExpanded() {
    setExpandedState(!expandedState)
  }

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-menu', className])

  if (expandedState) {
    classes.add('ap-shell-menu--expanded')
  }

  return (
    <div
      className={classes.className}
      style={style}
    >
      <button
        className='app-menu-item__expander'
        onClick={handleToggleExpanded}
      >
        <FontAwesomeIcon
          icon={expanded ? faAngleDoubleLeft : faAngleDoubleRight}
        />
      </button>
      {title ? (
        <Title level='H4'>
          {title}
        </Title>
      ) : null}
      {children}
    </div>
  )
}
