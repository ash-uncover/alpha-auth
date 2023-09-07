import { IDataState } from "src/lib/constants"

export interface UsersState {
  data: {
    [key: string]: UserState
  }
  status: IDataState
  error: any
}

export interface UserState {
  data: any
  status: IDataState
  error: any
}
