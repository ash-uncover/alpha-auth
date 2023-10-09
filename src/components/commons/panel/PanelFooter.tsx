import React, {
  ReactNode
} from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './PanelFooter.css'

interface PanelFooterProperties {
  className?: string
  style?: React.CSSProperties

  children?: ReactNode
}
export const PanelFooter = ({
  className,
  style,

  children,
}: PanelFooterProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['ap-panel-footer', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}
