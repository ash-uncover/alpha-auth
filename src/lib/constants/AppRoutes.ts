type AppRoute =
  '/' |
  'logout' |
  'register' |
  'recover' |
  'account' |
  'social' |
  'messages' |
  'support'

export const AppRoutes: {
  BASE: AppRoute
  LOGOUT: AppRoute
  REGISTER: AppRoute
  RECOVER: AppRoute
  ACCOUNT: AppRoute
  SOCIAL: AppRoute
  MESSAGES: AppRoute
  SUPPORT: AppRoute
} = {
  BASE: '/',
  LOGOUT: 'logout',
  REGISTER: 'register',
  RECOVER: 'recover',
  ACCOUNT: 'account',
  SOCIAL: 'social',
  MESSAGES: 'messages',
  SUPPORT: 'support'
}
