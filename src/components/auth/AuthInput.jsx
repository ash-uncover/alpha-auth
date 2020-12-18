import React from 'react'

import {
  Link
} from 'react-router-dom'

export default ({
  to,
  from,
  title
}) => (
  <Link
    className='form-link'
    to={{
      pathname: to,
      state: { from }
    }}
  >
    {title}
  </Link>
)
