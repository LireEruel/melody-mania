import axios from '@/lib/commonAxios'
import type { UserLoginInfo } from '@/types/user'

//const server = 'http://vdophgzesl.us14.qoddiapp.com'

const server = 'http://localhost:8000'

async function createRoom(participants: number, isPublic: boolean, subject: string) {
  //   const params = {} as UserLoginInfo
  //   params.email = email
  //   params.password = password
  //   const res = await axios.post(`${server}/login`, params)
  //   return res.data
}

export { createRoom }
