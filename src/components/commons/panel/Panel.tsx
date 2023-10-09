import React, {
  ReactNode, useRef, useState
} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { ClassBuilder } from '../ComponentUtil'

import {
  Button,
  ButtonSemantics,
  Title,
  TitleLevel,
  TitleLevels,
} from '..'

import './Panel.css'

interface PanelProperties {
  className?: string
  style?: React.CSSProperties

  expandable?: boolean
  expanded?: boolean
  title: string
  titleLevel?: TitleLevel

  children?: ReactNode
}
export const Panel = ({
  className,
  style,

  expandable,
  expanded = true,
  title,
  titleLevel = TitleLevels.H4,

  children,
}: PanelProperties) => {

  // Hooks //

  const content = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const [baseHeight, setBaseHeight] = useState(0);
  const [baseOverflow, setBaseOverflow] = useState('');

  // Events //

  function handleExpandClick() {
    if (isExpanded) {
      const height = content.current.getBoundingClientRect().height
      const overflow = content.current.style.overflow
      content.current.style.height = `${height}px`
      setTimeout(() => {content.current.style.height = '0'}, 0)
      setBaseHeight(height)
      setBaseOverflow(overflow)
      setIsExpanded(false)
    } else {
      content.current.style.height = `${baseHeight}px`
      content.current.style.overflow = baseOverflow
      setIsExpanded(true)
    }
  }

  // Rendering //

  const classes = new ClassBuilder(['ap-panel', className])

  if (!expandable || isExpanded) {
    classes.add('ap-panel--expanded')
  } else {
    classes.add('ap-panel--collapsed')
  }

  return (
    <div
      className={classes.className}
      style={style}
    >
      <div className='ap-panel__header'>
        <Title
          className='ap-panel__header__title'
          level={titleLevel}
        >
          {title}
        </Title>
        {expandable ? (
          <Button
            semantic={ButtonSemantics.TRANSPARENT}
            onClick={handleExpandClick}
          >
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </Button>
        ) : null}
      </div>

      <div
        ref={content}
        className='ap-panel__content'
      >
        {children}
      </div>
    </div>
  )
}
