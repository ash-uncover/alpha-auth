import React, {
  ReactNode
} from 'react'

import { ClassBuilder } from '../ComponentUtil'

import {
  Title,
  TitleLevels,
} from '../title/Title'

import './ShellMainArea.css'

interface ShellMainAreaProperties {
  className?: string
  style?: React.CSSProperties

  title?: string

  children?: ReactNode
}
export const ShellMainArea = ({
  className,
  style,

  title,

  children,
}: ShellMainAreaProperties) => {

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-main-area', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {title ? (
        <Title level={TitleLevels.H1}>
          {title}
        </Title>
      ) : null}
      {children}
    </div>
  )
}
