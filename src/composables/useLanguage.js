import { ref, computed } from 'vue'

const lang = ref(localStorage.getItem('koshary-lang') || 'ar')

function applyLang(l) {
  document.documentElement.lang = l
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('data-lang', l)
  document.body.setAttribute('data-lang', l)
}
applyLang(lang.value)

export function useLanguage() {
  const isAR = computed(() => lang.value === 'ar')

  function toggle() {
    lang.value = lang.value === 'ar' ? 'en' : 'ar'
    localStorage.setItem('koshary-lang', lang.value)
    applyLang(lang.value)
  }

  function t(ar, en) {
    return lang.value === 'ar' ? ar : en
  }

  return { lang, isAR, toggle, t }
}
