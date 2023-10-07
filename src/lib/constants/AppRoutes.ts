type AppRoute =
  '/' |
  'logout' |
  'register' |
  'recover' |
  'account' |
  'support'

export const AppRoutes: {
  BASE: AppRoute
  LOGOUT: AppRoute
  REGISTER: AppRoute
  RECOVER: AppRoute
  ACCOUNT: AppRoute
  SUPPORT: AppRoute
} = {
  BASE: '/',
  LOGOUT: 'logout',
  REGISTER: 'register',
  RECOVER: 'recover',
  ACCOUNT: 'account',
  SUPPORT: 'support'
}
