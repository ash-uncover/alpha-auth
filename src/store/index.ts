import { configureStore } from '@reduxjs/toolkit'

import { AppSlice } from './app/app.slice'
import { AuthSlice } from './auth/auth.slice'
import { RestSlice } from './rest/rest.slice'

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    auth: AuthSlice.reducer,
    rest: RestSlice,
  }
})
