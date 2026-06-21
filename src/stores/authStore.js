import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user-info') || 'null'))
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')

  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const result = await authService.login(email, password)
      if (result.status === 200 && result.data.length > 0) {
        user.value = result.data[0]
        localStorage.setItem('user-info', JSON.stringify(result.data[0]))
        return true
      } else {
        error.value = 'Invalid email or password'
        return false
      }
    } catch (e) {
      error.value = 'Login failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(name, email, password) {
    loading.value = true
    error.value = null
    try {
      const result = await authService.register({ name, email, password })
      if (result.status === 201) {
        user.value = result.data
        localStorage.setItem('user-info', JSON.stringify(result.data))
        return true
      }
      return false
    } catch (e) {
      error.value = 'Registration failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user-info')
  }

  return { user, loading, error, isAuthenticated, userName, login, register, logout }
})
