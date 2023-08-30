type AppRoute =
  'login' |
  'logout' |
  'register' |
  'recover' |
  'home' |
  'account' |
  'social' |
  'messages' |
  'support'

export const AppRoutes: {
  LOGIN: AppRoute
  LOGOUT: AppRoute
  REGISTER: AppRoute
  RECOVER: AppRoute
  HOME: AppRoute
  ACCOUNT: AppRoute
  SOCIAL: AppRoute
  MESSAGES: AppRoute
  SUPPORT: AppRoute
} = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  RECOVER: 'recover',
  HOME: 'home',
  ACCOUNT: 'account',
  SOCIAL: 'social',
  MESSAGES: 'messages',
  SUPPORT: 'support'
}
