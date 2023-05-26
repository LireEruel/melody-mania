import axios from '@/lib/commonAxios'
import { type Room, type RoomCreateInfo } from '@/types/room'
import { useUserStore } from '@/stores/user'
import type { AxiosRequestConfig } from 'axios'
//const server = 'http://vdophgzesl.us14.qoddiapp.com'

const server = 'http://localhost:8000'

async function getRooms(): Promise<undefined | Room[]> {
  const res = await axios.get(`${server}/room`)
  return res.data
}

async function createRoom(
  participants: number,
  isPublic: boolean,
  subject: string,
  password: string
) {
  const userStore = useUserStore()

  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + userStore.user_info?.access_token
  }
  const params = {} as RoomCreateInfo
  params.is_public = isPublic
  params.subject = subject
  params.participants_count = participants
  params.password = password

  const res = await axios.post(`${server}/room`, params, { headers })
  return res.data
}

async function joinRoom(room_id: string) {
  const userStore = useUserStore()

  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + userStore.user_info?.access_token
  }
  const params = { room_id: room_id }

  const res = await axios.post(`${server}/room/join`, params, { headers })
  return res.data
}

export { getRooms, createRoom, joinRoom }
