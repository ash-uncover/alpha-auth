import React, { useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { ClassBuilder } from '../ComponentUtil'

import './Input.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface InputProperties {
  className?: string
  style?: React.CSSProperties

  autoFocus?: boolean
  disabled?: boolean
  icon?: IconProp
  name?: string
  placeholder?: string
  required?: boolean
  showClearIcon?: boolean
  showPasswordIcon?: boolean
  type?: 'password' | 'number' | ''
  value?: string

  onChange: (event: { value: string }) => void
}
export const Input = ({
  className,
  style,

  autoFocus,
  disabled,
  name,
  placeholder,
  required,
  showClearIcon,
  showPasswordIcon,
  type,
  value,

  onChange,
}: InputProperties) => {

  // Hooks //

  const input = useRef<HTMLInputElement>()
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Events //

  function handleFocus() {
    setFocused(true)
    input.current && input.current.focus()
  }
  function handleBlur() {
    setFocused(false)
  }

  function handleInputChange(event) {
    onChange({
      value: event.target.value
    })
  }

  function handleToggleShowPassword() {
    setShowPassword(!showPassword)
  }
  function handleResetShowPassword() {
    setShowPassword(false)
  }

  function handleResetValue() {
    onChange({
      value: ''
    })
  }

  // Rendering //

  const classes = new ClassBuilder('ap-input')

  classes.add(className)
  if (showPassword) {
    classes.add('ap-input--show-password')
  }

  return (
    <div
      className={classes.className}
      style={style}
      tabIndex={focused ? -1 : 0}
      onFocus={handleFocus}
    >
      <input
        ref={input}
        className='ap-input__input'

        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        tabIndex={-1}
        type={(type === 'password' && showPassword) ? '' : type}
        value={value}

        onBlur={handleBlur}
        onChange={handleInputChange}
      />
      {showPasswordIcon && type === 'password' && value?.length ? (
        <FontAwesomeIcon
          className='ap-input__action ap-input__action-password'
          icon={faEye}
          onMouseDown={handleToggleShowPassword}
          onMouseLeave={handleResetShowPassword}
          onMouseUp={handleResetShowPassword}
        />
      ) : null}
      {showClearIcon && value?.length ? (
        <FontAwesomeIcon
          className='ap-input__action'
          icon={faRemove}
          onClick={handleResetValue}
        />
      ) : null}
    </div>
  )
}