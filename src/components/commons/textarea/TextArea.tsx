import React, { useRef, useState } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './TextArea.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface TextAreaProperties {
  className?: string
  style?: React.CSSProperties

  autoFocus?: boolean
  disabled?: boolean
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
  value?: string

  onChange: (event: { value: string }) => void
}
export const TextArea = ({
  className,
  style,

  autoFocus,
  disabled,
  name,
  placeholder,
  required,
  rows,
  value,

  onChange,
}: TextAreaProperties) => {

  // Hooks //

  const textarea = useRef<HTMLTextAreaElement>()
  const [focused, setFocused] = useState(false)

  // Events //

  function handleFocus() {
    setFocused(true)
    if (textarea.current) {
      console.log('focus')
      textarea.current.focus()
    }
  }
  function handleBlur() {
    setFocused(false)
  }

  function handleTextAreaChange(event) {
    onChange({
      value: event.target.value
    })
  }

  // Rendering //

  const classes = new ClassBuilder(['ap-text-area', className])

  return (
    <div
      className={classes.className}
      style={style}
      tabIndex={focused ? -1 : 0}
      onFocus={handleFocus}
    >
      <textarea
        ref={textarea}
        className='ap-text-area__textarea'
        style={style}

        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        tabIndex={-1}
        value={value}

        onBlur={handleBlur}
        onChange={handleTextAreaChange}
      />
    </div>
  )
}