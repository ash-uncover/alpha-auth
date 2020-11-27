/* globals localStorage */

export const ALPHA_AUTH_LOGON_DATA = 'ALPHA_AUTH_LOGON_DATA'

const Storage = {
  get: (id, def = null) => {
    return JSON.parse(localStorage.getItem(id)) || def
  },
  remove: (id) => {
    return localStorage.removeItem(id)
  },
  set: (id, value) => {
    return localStorage.setItem(id, JSON.stringify(value))
  }
}

export default Storage
