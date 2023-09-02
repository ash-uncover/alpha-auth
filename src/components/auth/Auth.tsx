import React, {
  ReactNode
} from 'react'

import './Auth.css'

// ---------------------------------------------------
// Create Component Auth
// ---------------------------------------------------

interface AuthProperties {
  children: ReactNode
}
export const Auth = ({
  children
}: AuthProperties) => {

  // Rendering //

  return (
    <div className='alpha-auth auth'>
      <div className='auth-box'>
        {children}
      </div>
    </div>
  )
}