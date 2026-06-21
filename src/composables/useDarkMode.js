import { ref, watch } from 'vue'

const dark = ref(localStorage.getItem('darkMode') === 'true')

if (dark.value) document.documentElement.setAttribute('data-theme', 'dark')

export function useDarkMode() {
  function toggle() {
    dark.value = !dark.value
    localStorage.setItem('darkMode', dark.value)
    document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light')
  }

  watch(dark, (val) => {
    document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
  }, { immediate: true })

  return { dark, toggle }
}
