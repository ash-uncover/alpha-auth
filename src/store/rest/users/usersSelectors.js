import { restSelector } from '../restSelectors'

export const restUsersSelector = (state) => restSelector(state).users

export const restUsersDataSelector = (state) => restUsersSelector(state).data
export const restUsersStatusSelector = (state) => restUsersSelector(state).status
export const restUsersErrorSelector = (state) => restUsersSelector(state).error

export const restUserSelector = (id) => (state) => restUsersDataSelector(state)[id]

export const restUserDataSelector = (id) => (state) => restUserSelector(id)(state).data
export const restUserStatusSelector = (id) => (state) => restUserSelector(id)(state).status
export const restUserErrorSelector = (id) => (state) => restUserSelector(id)(state).error
