type AppRoute =
  '/' |
  'logout' |
  'register' |
  'recover' |
  'home' |
  'account' |
  'support'

export const AppRoutes: {
  BASE: AppRoute
  LOGOUT: AppRoute
  REGISTER: AppRoute
  RECOVER: AppRoute
  HOME: AppRoute
  ACCOUNT: AppRoute
  SUPPORT: AppRoute
} = {
  BASE: '/',
  LOGOUT: 'logout',
  REGISTER: 'register',
  RECOVER: 'recover',
  HOME: 'home',
  ACCOUNT: 'account',
  SUPPORT: 'support'
}
