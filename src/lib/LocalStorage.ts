type LocalStorageItem =
  'ALPHA_AUTH_LOGON_TOKEN'

export const LocalStorageItem: {
  ALPHA_AUTH_LOGON_TOKEN: LocalStorageItem
} = {
  ALPHA_AUTH_LOGON_TOKEN: 'ALPHA_AUTH_LOGON_TOKEN'
}

export const LocalStorage = {
  get: (id: LocalStorageItem, def = null) => {
    return JSON.parse(localStorage.getItem(id)) || def
  },
  remove: (id: LocalStorageItem) => {
    return localStorage.removeItem(id)
  },
  set: (id: LocalStorageItem, value: any) => {
    return localStorage.setItem(id, JSON.stringify(value))
  }
}
