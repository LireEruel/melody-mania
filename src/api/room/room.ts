import axios from '@/lib/commonAxios'
import type { RoomCreateInfo } from '@/types/room'
import { useUserStore } from '@/stores/user'
import type { AxiosRequestConfig } from 'axios'
//const server = 'http://vdophgzesl.us14.qoddiapp.com'

const server = 'http://localhost:8000'

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

export { createRoom }
