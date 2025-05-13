// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // <--- 引入 createPinia
import App from './App.vue'
import router from './router'
// import './assets/main.css' // 如果你有全域 CSS

const app = createApp(App)
const pinia = createPinia() // <--- 建立 Pinia 實例

app.use(router)
app.use(pinia) // <--- 讓 Vue 應用程式使用 Pinia

app.mount('#app')