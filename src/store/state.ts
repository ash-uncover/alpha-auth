import { AppState } from './app/app.state'
import { AuthState } from './auth/auth.state'
import { RestState } from './rest/rest.state'

export type RootState = {
  app: AppState,
  auth: AuthState,
  rest: RestState,
}