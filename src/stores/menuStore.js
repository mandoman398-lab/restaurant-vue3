/**
 * Menu Store
 * State management for menu data
 * Uses local menuService
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import menuService from '../services/modules/menuService'

export const useMenuStore = defineStore('menu', () => {
  const menu = ref(null)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const filterVegan = ref(false)
  const filterPopular = ref(false)
  const filterAvailable = ref(true)

  /**
   * Load menu data from service on initialization
   */
  function initializeMenu() {
    try {
      menu.value = menuService.getMenu()
    } catch (e) {
      console.error('[MenuStore] Error loading menu:', e)
    }
  }

  /**
   * Get all menu items
   */
  function getItems() {
    return menuService.getItems()
  }

  /**
   * Get all categories
   */
  function getCategories() {
    return menuService.getCategories()
  }

  /**
   * Computed: Filtered items based on search and filters
   */
  const filteredItems = computed(() => {
    let items = getItems()

    // Filter by category
    if (selectedCategory.value) {
      items = items.filter(item => item.category === selectedCategory.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      items = items.filter(item =>
        item.name?.en?.toLowerCase().includes(q) ||
        item.name?.ar?.toLowerCase().includes(q) ||
        item.description?.en?.toLowerCase().includes(q) ||
        item.description?.ar?.toLowerCase().includes(q)
      )
    }

    // Filter by vegan
    if (filterVegan.value) {
      items = items.filter(item => item.flags?.isVegan)
    }

    // Filter by popular
    if (filterPopular.value) {
      items = items.filter(item => item.flags?.isPopular)
    }

    // Filter by availability
    if (filterAvailable.value) {
      items = items.filter(item => item.flags?.isAvailable !== false)
    }

    return items
  })

  /**
   * Computed: Featured items
   */
  const featured = computed(() => {
    return getItems().filter(item => item.flags?.isFeatured)
  })

  /**
   * Computed: Popular items
   */
  const popular = computed(() => {
    return getItems().filter(item => item.flags?.isPopular)
  })

  /**
   * Computed: Signature items
   */
  const signature = computed(() => {
    return getItems().filter(item => item.flags?.isSignature)
  })

  /**
   * Get item by ID
   */
  function getItemById(id) {
    return menuService.getItemById(id)
  }

  /**
   * Get category by ID
   */
  function getCategoryById(id) {
    return menuService.getCategoryById(id)
  }

  /**
   * Get items in a category
   */
  function getItemsByCategory(categoryId) {
    return menuService.getItemsByCategory(categoryId)
  }

  /**
   * Get daqqah levels
   */
  function getDaqqahLevels() {
    return menuService.getDaqqahLevels()
  }

  /**
   * Get daqqah level by number
   */
  function getDaqqahLevel(level) {
    return menuService.getDaqqahLevel(level)
  }

  /**
   * Search menu items
   */
  function search(query) {
    return menuService.search(query)
  }

  /**
   * Get price range for item
   */
  function getPriceRange(itemId) {
    return menuService.getPriceRange(itemId)
  }

  /**
   * Set selected category filter
   */
  function setSelectedCategory(categoryId) {
    selectedCategory.value = categoryId
  }

  /**
   * Toggle vegan filter
   */
  function toggleVeganFilter() {
    filterVegan.value = !filterVegan.value
  }

  /**
   * Toggle popular filter
   */
  function togglePopularFilter() {
    filterPopular.value = !filterPopular.value
  }

  /**
   * Initialize store on first load
   */
  initializeMenu()

  return {
    menu,
    searchQuery,
    selectedCategory,
    filterVegan,
    filterPopular,
    filterAvailable,
    filteredItems,
    featured,
    popular,
    signature,
    getItems,
    getCategories,
    getItemById,
    getCategoryById,
    getItemsByCategory,
    getDaqqahLevels,
    getDaqqahLevel,
    search,
    getPriceRange,
    setSelectedCategory,
    toggleVeganFilter,
    togglePopularFilter
  }
})
