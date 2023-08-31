import {
  Config
} from '@uncover/js-utils-fetch'

import {
  AuthService
} from 'alpha-auth-common'

import {
  CONFIG
} from 'src/config'

export const AuthConfig = new Config({
  server: CONFIG.ALPHA_AUTH_REST_URL,
  useCsrf: true,
  csrfHeader: 'Authorization'
})

export const Auth = AuthService(AuthConfig)
