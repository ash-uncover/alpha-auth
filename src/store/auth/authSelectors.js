export const authSelector = (state) => state.auth

export const authLogonStateSelector = (state) => authSelector(state).logonState
export const authLogonDataSelector = (state) => authSelector(state).logonData
export const authLogonErrorSelector = (state) => authSelector(state).logonError

export const authLogonDataTokenSelector = (state) => authLogonDataSelector(state).token
export const authLogonDataUserIdSelector = (state) => authLogonDataSelector(state).userId
