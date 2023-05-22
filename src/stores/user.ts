import { defineStore } from 'pinia'
import type { User } from '../types/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user_info: undefined as User | undefined
    }
  },
  persist: true
})
