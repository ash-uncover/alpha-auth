import { configureStore } from '@reduxjs/toolkit'

import { reducer as app } from 'store/app'
import { reducer as auth } from 'store/auth'
import { reducer as rest } from 'store/rest'

export default configureStore({
  reducer: {
    app,
    auth,
    rest
  }
})
