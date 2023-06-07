import type { User } from './user'

export interface Room {
  _id: string
  subject: string
  is_public: boolean
  participants_count: number
  password: string
  participants_list: Array<User>
}

export interface RoomCreateInfo {
  participants_count: number
  is_public: boolean
  subject: string
  password: string
}
