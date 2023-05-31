import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Cloudinary from 'cloudinary'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(Antd)
app.use(router)
app.use(Cloudinary, {
  configuration: {
    cloud_name: 'dwn77lk2b',
    api_key: '397288484875562',
    api_secret: 'tqSgDpxqaHQQrPNu6M_OyA6N98Y'
  }
})

app.mount('#app')
