import { configureStore } from '@reduxjs/toolkit'

import { AppSlice } from './app/app.slice'
import { AuthSlice } from './auth/auth.slice'

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    auth: AuthSlice.reducer,
  }
})
