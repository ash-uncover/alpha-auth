import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch
} from '@fortawesome/free-solid-svg-icons'

import './SearchBar.scss'

const SearchBar = ({
  className,
  placeholder,
  value,
  suggestions,
  onChange,
  onSubmit
}) => {
  const onInputChange = (event) => {
    return onChange(event.target.value)
  }
  return (
    <div
      className={`search-bar ${className}`}
    >
      <input
        className='search-bar-input'
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
      <button
        className='search-bar-action'
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}

export default SearchBar
