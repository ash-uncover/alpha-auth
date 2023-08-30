import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

// Default hard-coded values
const CONFIG = {
  ALPHA_AUTH_REST_URL: 'http://localhost:8090'
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
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

export default CONFIG
