import React, { ReactNode } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './Title.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

type TITLE_LEVEL = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
export const TITLE_LEVELS: {
  H1: TITLE_LEVEL
  H2: TITLE_LEVEL
  H3: TITLE_LEVEL
  H4: TITLE_LEVEL
  H5: TITLE_LEVEL
  H6: TITLE_LEVEL
} = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6',
}
// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface TitleProperties {
  className?: string
  style?: React.CSSProperties

  level?: TITLE_LEVEL
  text?: string

  children?: ReactNode
}
export const Title = ({
  className,
  style,

  level = TITLE_LEVELS.H1,
  text,

  children,
}: TitleProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder('ap-title')

  classes.add(className)

  classes.add(`ap-title--${level.toLowerCase()}`)

  return React.createElement(
    level.toLowerCase(),
    {
      className: classes.className,
      style
    },
    children || text
  )
}