import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

/* ── Register Service Worker (PWA) ── */
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('[SW] Registered:', reg.scope)
        /* Check for updates every 60 min */
        setInterval(() => reg.update(), 60 * 60 * 1000)
      })
      .catch(err => console.warn('[SW] Registration failed:', err))
  })
}

/* ── PWA install prompt ── */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.__pwaInstallPrompt = e
})
