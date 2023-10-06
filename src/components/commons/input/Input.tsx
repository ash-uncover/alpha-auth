import React, { useState } from 'react'

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

  const [finalType, setFinalType] = useState(type)

  // Events //

  function handleInputChange(event) {
    onChange({
      value: event.target.value
    })
  }

  function handleToggleShowPassword() {
    setFinalType(finalType === 'password' ? '' : 'password')
  }
  function handleResetShowPassword() {
    setFinalType('password')
  }

  function handleResetValue() {
    onChange({
      value: ''
    })
  }

  // Rendering //

  const classes = new ClassBuilder('ap-input')

  classes.add(className)

  return (
    <div
      className={classes.className}
      style={style}
      tabIndex={0}
    >
      <input
        className='ap-input__input'

        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        tabIndex={-1}
        type={finalType}
        value={value}

        onChange={handleInputChange}
      />
      {showPasswordIcon && type === 'password' ? (
        <FontAwesomeIcon
          className='ap-input__action'
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