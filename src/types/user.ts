export interface User {
  _id: string
  name: string
  email: string
  password: string
  access_token: string
}

export interface UserSignUPInfo {
  name: string
  email: string
  password: string
}

export interface UserLoginInfo {
  email: string
  password: string
}
