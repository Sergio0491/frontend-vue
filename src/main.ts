import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.provide('API_URL', 'http://localhost:8080/emails')

app.mount('#app')