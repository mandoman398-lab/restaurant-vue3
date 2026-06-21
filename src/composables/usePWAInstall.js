import { ref } from 'vue'

const canInstall = ref(false)

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.__pwaInstallPrompt = e
  canInstall.value = true
})

window.addEventListener('appinstalled', () => {
  canInstall.value = false
  window.__pwaInstallPrompt = null
})

export function usePWAInstall() {
  async function install() {
    if (!window.__pwaInstallPrompt) return
    window.__pwaInstallPrompt.prompt()
    const { outcome } = await window.__pwaInstallPrompt.userChoice
    if (outcome === 'accepted') {
      canInstall.value = false
      window.__pwaInstallPrompt = null
    }
  }

  return { canInstall, install }
}
