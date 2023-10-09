import React, { ReactNode } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './Label.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface LabelProperties {
  className?: string
  style?: React.CSSProperties

  text?: string

  children?: ReactNode
}
export const Label = ({
  className,
  style,

  text,

  children,
}: LabelProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['ap-label', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children || text}
    </div>
  )
}