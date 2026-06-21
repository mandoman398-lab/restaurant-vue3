import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { restaurantService } from '../services/api'

export const useRestaurantStore = defineStore('restaurants', () => {
  const restaurants = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const perPage = ref(8)
  const viewMode = ref(localStorage.getItem('viewMode') || 'table')
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

  const filtered = computed(() => {
    const q = searchQuery.value.toLowerCase()
    if (!q) return restaurants.value
    return restaurants.value.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.address.toLowerCase().includes(q) ||
      r.contact.toLowerCase().includes(q)
    )
  })

  const totalPages = computed(() => Math.ceil(filtered.value.length / perPage.value))

  const paginated = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return filtered.value.slice(start, start + perPage.value)
  })

  function setViewMode(mode) {
    viewMode.value = mode
    localStorage.setItem('viewMode', mode)
  }

  function toggleFavorite(id) {
    const idx = favorites.value.indexOf(id)
    if (idx === -1) favorites.value.push(id)
    else favorites.value.splice(idx, 1)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function isFavorite(id) {
    return favorites.value.includes(id)
  }

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const result = await restaurantService.getAll()
      restaurants.value = result.data
    } catch (e) {
      error.value = 'Failed to load restaurants'
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id) {
    try {
      const result = await restaurantService.getById(id)
      return result.data
    } catch (e) {
      error.value = 'Failed to load restaurant'
      return null
    }
  }

  async function create(data) {
    try {
      const result = await restaurantService.create(data)
      restaurants.value.unshift(result.data)
      return true
    } catch (e) {
      error.value = 'Failed to add restaurant'
      return false
    }
  }

  async function update(id, data) {
    try {
      const result = await restaurantService.update(id, data)
      const idx = restaurants.value.findIndex(r => String(r.id) === String(id))
      if (idx !== -1) restaurants.value[idx] = result.data
      return true
    } catch (e) {
      error.value = 'Failed to update restaurant'
      return false
    }
  }

  async function remove(id) {
    try {
      await restaurantService.remove(id)
      restaurants.value = restaurants.value.filter(r => String(r.id) !== String(id))
      return true
    } catch (e) {
      error.value = 'Failed to delete restaurant'
      return false
    }
  }

  return {
    restaurants, loading, error, searchQuery, currentPage, perPage,
    viewMode, favorites, filtered, totalPages, paginated,
    setViewMode, toggleFavorite, isFavorite,
    fetchAll, fetchById, create, update, remove
  }
})
