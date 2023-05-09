import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from './../types/user'

export const useUserStore = defineStore('user', () => {
  const user_info = ref(undefined as User | undefined)

  function setUserInfo(user: User) {
    user_info.value = user
  }

  return { user_info, setUserInfo }
})
