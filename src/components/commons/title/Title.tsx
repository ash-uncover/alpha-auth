import React, { ReactNode } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './Title.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

export type TitleLevel = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
export const TitleLevels: {
  H1: TitleLevel
  H2: TitleLevel
  H3: TitleLevel
  H4: TitleLevel
  H5: TitleLevel
  H6: TitleLevel
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

  level?: TitleLevel
  text?: string

  children?: ReactNode
}
export const Title = ({
  className,
  style,

  level = TitleLevels.H1,
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