type LocalStorageItem =
  'ALPHA_AUTH_LOGON_DATA'

export const LocalStorageItem: {
  ALPHA_AUTH_LOGON_DATA: LocalStorageItem
} = {
  ALPHA_AUTH_LOGON_DATA: 'ALPHA_AUTH_LOGON_DATA'
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
