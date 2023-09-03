import {
  RootState
} from 'src/store/state'

import {
  RestSelectors
} from '../rest.selectors'
import { getInitialUserState } from './users.slice'

const root = (state: RootState) => RestSelectors.root(state).users

const usersData = (state: RootState) => root(state).data
const usersStatus = (state: RootState) => root(state).status
const usersError = (state: RootState) => root(state).error

const user = (id: string) => (state: RootState) => usersData(state)[id] || getInitialUserState()
const userData = (id: string) => (state: RootState) => user(id)(state).data
const userStatus = (id: string) => (state: RootState) => user(id)(state).status
const userError = (id: string) => (state: RootState) => user(id)(state).error

export const UsersSelectors = {
  root,

  usersData,
  usersStatus,
  usersError,

  user,
  userData,
  userStatus,
  userError,
}