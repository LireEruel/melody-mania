import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/Auth/SignInView.vue'
import SignUpView from '../views/Auth/SignUpView.vue'
import RoomListView from '../views/Room/RoomListView.vue'
import ProblemManageView from '../views/Problem/ProblemManageView.vue'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomListView
    },
    {
      path: '/problems',
      name: 'problems',
      component: ProblemManageView
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.user_info?.access_token // 로그인 상태 체크 로직
  //console.log(userStore.user_info)
  if (!isAuthenticated && to.path !== '/signin' && to.path !== '/signup') {
    next({ name: 'signin' }) // 로그인하지 않은 상태에서 모든 라우팅을 SignIn으로 리다이렉트
  } else {
    if (to.path == '/') {
      next({ name: 'rooms' })
    } else next()
  }
})
export default router
