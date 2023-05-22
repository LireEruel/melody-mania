import type { UserSignUPInfo } from '@/types/user'
import axios from '@/lib/commonAxios'

const server = 'http://vdophgzesl.us14.qoddiapp.com'

async function signup(email: string, name: string, password: string) {
  const params = {} as UserSignUPInfo
  params.email = email
  params.name = name
  params.password = password
  const res = await axios.post(`${server}/user`, params)
  return res
}

export { signup }
