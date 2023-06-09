import axios from '@/lib/commonAxios'
import { useUserStore } from '@/stores/user'
import type { Music } from '@/types/music'
import type { AxiosRequestConfig } from 'axios'
//const server = 'http://vdophgzesl.us14.qoddiapp.com'

const server = 'http://localhost:8000'

async function addMusic(name: string, url: string, singer: string, tags: string[]) {
  const userStore = useUserStore()

  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + userStore.user_info?.access_token
  }
  const params = {} as Music
  params.music_name = name
  params.singer = singer
  params.play_url = url
  params.tags = tags

  const res = await axios.post(`${server}/music`, params, { headers })
  return res.data
}

async function getMusicList(): Promise<undefined | Music[]> {
  const res = await axios.get(`${server}/music`)
  return res.data
}

export { addMusic, getMusicList }
