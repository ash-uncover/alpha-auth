import { AppState } from './app/app.state'
import { AuthState } from './auth/auth.state'

export type RootState = {
  app: AppState,
  auth: AuthState,
}