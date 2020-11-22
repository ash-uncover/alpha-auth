export const authSelector = (state) => state.auth

export const authLogonStateSelector = (state) => authSelector(state).logonState
export const authLogonDataSelector = (state) => authSelector(state).logonData
export const authLogonErrorSelector = (state) => authSelector(state).logonError
