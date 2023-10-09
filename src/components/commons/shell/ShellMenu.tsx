import React, { ReactNode, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import { ClassBuilder } from '../ComponentUtil'

import {
  Button,
  ButtonSemantics,
  Title,
} from '..'

import './ShellMenu.css'

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

  const items = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child, {
          ...child.props,
          expanded: expandedState
        });
    }
    return child
  })

  return (
    <div
      className={classes.className}
      style={style}
    >
      <Button
        className='ap-shell-menu__expander'
        semantic={ButtonSemantics.TRANSPARENT}
        onClick={handleToggleExpanded}
      >
        <FontAwesomeIcon
          icon={expandedState ? faAngleDoubleLeft : faAngleDoubleRight}
        />
      </Button>

      {title ? (
        <Title level='H4'>
          {title}
        </Title>
      ) : null}
      {items}
    </div>
  )
}
