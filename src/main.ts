import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(Antd)
app.use(router)

app.mount('#app')
