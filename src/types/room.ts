import type { User } from './user'

export interface Room {
  room_id: string
  subject: string
  is_public: boolean
  participant_count: number
  password: string
  participants_list: Array<User>
}

export interface RoomCreateInfo {
  participants_count: number
  is_public: boolean
  subject: string
  password: string
}
