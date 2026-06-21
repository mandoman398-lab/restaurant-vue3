/**
 * Branch Store (formerly Restaurant Store)
 * State management for branch/restaurant data
 * Uses local branchService instead of API
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import branchService from '../services/modules/branchService'

export const useBranchStore = defineStore('branches', () => {
  const branches = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedArea = ref('')
  const currentPage = ref(1)
  const perPage = ref(8)
  const viewMode = ref(localStorage.getItem('viewMode') || 'grid')

  /**
   * Load all branches from service on store initialization
   */
  function initializeBranches() {
    try {
      branches.value = branchService.getAll()
    } catch (e) {
      error.value = 'Failed to load branches'
      console.error('[BranchStore] Error loading branches:', e)
    }
  }

  /**
   * Computed: Filtered branches based on search and area
   */
  const filtered = computed(() => {
    let result = branches.value

    // Filter by area
    if (selectedArea.value) {
      result = result.filter(b => b.location?.area === selectedArea.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(b =>
        b.name?.en?.toLowerCase().includes(q) ||
        b.name?.ar?.toLowerCase().includes(q) ||
        b.location?.address?.toLowerCase().includes(q) ||
        b.location?.areaLabel?.en?.toLowerCase().includes(q) ||
        b.location?.areaLabel?.ar?.toLowerCase().includes(q)
      )
    }

    return result
  })

  /**
   * Computed: Total pages for pagination
   */
  const totalPages = computed(() => Math.ceil(filtered.value.length / perPage.value))

  /**
   * Computed: Paginated branches for current page
   */
  const paginated = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return filtered.value.slice(start, start + perPage.value)
  })

  /**
   * Computed: Get all unique areas from branches
   */
  const areas = computed(() => {
    const areaSet = new Set()
    branches.value.forEach(b => {
      if (b.location?.area) {
        areaSet.add(b.location.area)
      }
    })
    return Array.from(areaSet)
  })

  /**
   * Set view mode (grid/list) and persist to localStorage
   */
  function setViewMode(mode) {
    viewMode.value = mode
    localStorage.setItem('viewMode', mode)
  }

  /**
   * Set selected area filter
   */
  function setSelectedArea(area) {
    selectedArea.value = area
    currentPage.value = 1 // Reset pagination when filtering
  }

  /**
   * Toggle favorite status for a branch
   */
  function toggleFavorite(id) {
    const isFav = branchService.toggleFavorite(id)
    return isFav
  }

  /**
   * Check if branch is favorited
   */
  function isFavorite(id) {
    return branchService.isFavorite(id)
  }

  /**
   * Get all favorite branches
   */
  function getFavorites() {
    return branchService.getFavorites()
  }

  /**
   * Get main branch
   */
  function getMainBranch() {
    return branchService.getMainBranch()
  }

  /**
   * Get featured branches
   */
  function getFeatured() {
    return branchService.getFeatured()
  }

  /**
   * Get branch by ID
   */
  function getById(id) {
    return branchService.getById(id)
  }

  /**
   * Get all active branches
   */
  function getActive() {
    return branchService.getActive()
  }

  /**
   * Create new branch (admin only)
   */
  function create(data) {
    try {
      const newBranch = branchService.create(data)
      branches.value.push(newBranch)
      return newBranch
    } catch (e) {
      error.value = 'Failed to create branch'
      return null
    }
  }

  /**
   * Update branch
   */
  function update(id, data) {
    try {
      const updated = branchService.update(id, data)
      const idx = branches.value.findIndex(b => b.id === id)
      if (idx !== -1) {
        branches.value[idx] = updated
      }
      return updated
    } catch (e) {
      error.value = 'Failed to update branch'
      return null
    }
  }

  /**
   * Delete branch (admin only)
   */
  function remove(id) {
    try {
      const success = branchService.delete(id)
      if (success) {
        branches.value = branches.value.filter(b => b.id !== id)
      }
      return success
    } catch (e) {
      error.value = 'Failed to delete branch'
      return false
    }
  }

  /**
   * Initialize store on first load
   */
  initializeBranches()

  return {
    branches,
    loading,
    error,
    searchQuery,
    selectedArea,
    currentPage,
    perPage,
    viewMode,
    filtered,
    totalPages,
    paginated,
    areas,
    setViewMode,
    setSelectedArea,
    toggleFavorite,
    isFavorite,
    getFavorites,
    getMainBranch,
    getFeatured,
    getById,
    getActive,
    create,
    update,
    remove
  }
})

// Keep backward compatibility
export const useRestaurantStore = useBranchStore
