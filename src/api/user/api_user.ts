import type { UserSignUPInfo } from '@/types/user'
import axios from 'axios'

const server = 'http://localhost:8000'

async function signup(email: string, name: string, password: string) {
  try {
    const params = {} as UserSignUPInfo
    params.email = email
    params.name = name
    params.password = password
    await axios
      .post(`${server}/user`, params)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  } catch (error) {
    console.log(error)
  }
}

export { signup }
