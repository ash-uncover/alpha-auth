import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

// Default hard-coded values
export const CONFIG: {
  ALPHA_AUTH_REST_URL: string
  ALPHA_AUTH_PLUGIN: string
  ALPHA_AUTH_PUBLIC: string
  ALPHA_AUTH_ENVIRONMENT: string
} = {
  ALPHA_AUTH_REST_URL: 'http://localhost:8090',
  ALPHA_AUTH_PLUGIN: 'http://localhost:8080/plugin.json',
  ALPHA_AUTH_PUBLIC: '',
  ALPHA_AUTH_ENVIRONMENT: 'local',
}

// Load config from local file
try {
  const CONFIG_LOCAL = require('./config.json')
  Object.keys(CONFIG).forEach((key) => {
    if (CONFIG_LOCAL[key]) {
      CONFIG[key] = CONFIG_LOCAL[key]
    }
  })
} catch (error) {
  LOGGER.warn('Failed to load from config.json')
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.ALPHA_AUTH_REST_URL) {
    CONFIG.ALPHA_AUTH_REST_URL = process.env.ALPHA_AUTH_REST_URL
  }
  if (process.env.ALPHA_AUTH_PLUGIN) {
    CONFIG.ALPHA_AUTH_PLUGIN = process.env.ALPHA_AUTH_PLUGIN
  }
  if (process.env.ALPHA_AUTH_PUBLIC) {
    CONFIG.ALPHA_AUTH_PUBLIC = process.env.ALPHA_AUTH_PUBLIC
  }
  if (process.env.ALPHA_AUTH_ENVIRONMENT) {
    CONFIG.ALPHA_AUTH_ENVIRONMENT = process.env.ALPHA_AUTH_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}
