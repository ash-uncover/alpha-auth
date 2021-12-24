import React, {
  useEffect,
  useState
} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch
} from '@fortawesome/free-solid-svg-icons'

import './SearchBar.less'

const SearchBar = ({
  className,
  placeholder,
  value,
  suggestions,
  onChange
}) => {
  /* HOOKS */

  const [searchValue, setSearchValue] = useState(value)

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  /* VIEW CALLBACKS */

  const onInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const onInputSubmit = (event) => {
    event.preventDefault()
    onChange(searchValue)
  }

  /* RENDERING */

  return (
    <div
      className={`search-bar ${className}`}
    >
      <input
        className='search-bar-input'
        autoComplete='off'
        placeholder={placeholder}
        value={searchValue}
        onChange={onInputChange}
        onSubmit={onInputSubmit}
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
