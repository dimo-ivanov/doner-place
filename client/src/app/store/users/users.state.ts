export interface IUsersState {
  userRegistered: boolean,
  userAuthenticated: boolean,
  token: string,
  username: string,
  isAdmin: boolean,
  error: string
}

export const initialState: IUsersState = {
  userRegistered: false,
  userAuthenticated: false,
  token: null,
  username: null,
  isAdmin: false,
  error: null
}