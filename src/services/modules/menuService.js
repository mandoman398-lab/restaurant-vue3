/**
 * Menu Service
 * Handles all menu data operations from localStorage
 */

import { storageService } from '../storage'

const MENU_KEY = 'app_menu'

/**
 * Menu service for all menu-related operations
 */
export const menuService = {
  /**
   * Get entire menu object
   * @returns {object} Complete menu data
   */
  getMenu() {
    return storageService.get(MENU_KEY, {
      categories: [],
      daqqahLevels: [],
      items: []
    })
  },

  /**
   * Get all menu items
   * @returns {Array} All menu items
   */
  getItems() {
    const menu = this.getMenu()
    return menu.items || []
  },

  /**
   * Get a single menu item by ID
   * @param {string} id - Item ID
   * @returns {object|null} Menu item or null
   */
  getItemById(id) {
    const items = this.getItems()
    return items.find(item => item.id === id) || null
  },

  /**
   * Get all categories
   * @returns {Array} Menu categories
   */
  getCategories() {
    const menu = this.getMenu()
    return menu.categories || []
  },

  /**
   * Get a single category by ID
   * @param {string} id - Category ID
   * @returns {object|null} Category or null
   */
  getCategoryById(id) {
    const categories = this.getCategories()
    return categories.find(c => c.id === id) || null
  },

  /**
   * Get all items in a category
   * @param {string} categoryId - Category ID
   * @returns {Array} Items in category
   */
  getItemsByCategory(categoryId) {
    const items = this.getItems()
    return items.filter(item => item.category === categoryId)
  },

  /**
   * Get featured items
   * @returns {Array} Featured menu items
   */
  getFeatured() {
    const items = this.getItems()
    return items.filter(item => item.flags?.isFeatured)
  },

  /**
   * Get popular items
   * @returns {Array} Popular menu items
   */
  getPopular() {
    const items = this.getItems()
    return items.filter(item => item.flags?.isPopular)
  },

  /**
   * Get signature items
   * @returns {Array} Signature menu items
   */
  getSignature() {
    const items = this.getItems()
    return items.filter(item => item.flags?.isSignature)
  },

  /**
   * Get vegan items
   * @returns {Array} Vegan menu items
   */
  getVegan() {
    const items = this.getItems()
    return items.filter(item => item.flags?.isVegan)
  },

  /**
   * Get available items
   * @returns {Array} Available menu items
   */
  getAvailable() {
    const items = this.getItems()
    return items.filter(item => item.flags?.isAvailable !== false)
  },

  /**
   * Search menu items
   * @param {string} query - Search query
   * @returns {Array} Matching items
   */
  search(query) {
    const items = this.getItems()
    const q = query.toLowerCase()
    return items.filter(item =>
      item.name?.en?.toLowerCase().includes(q) ||
      item.name?.ar?.toLowerCase().includes(q) ||
      item.description?.en?.toLowerCase().includes(q) ||
      item.description?.ar?.toLowerCase().includes(q) ||
      (item.ingredients?.en || []).some(ing => ing.toLowerCase().includes(q)) ||
      (item.ingredients?.ar || []).some(ing => ing.toLowerCase().includes(q))
    )
  },

  /**
   * Get daqqah levels
   * @returns {Array} Daqqah spice levels
   */
  getDaqqahLevels() {
    const menu = this.getMenu()
    return menu.daqqahLevels || []
  },

  /**
   * Get daqqah level by level number
   * @param {number} level - Level number
   * @returns {object|null} Daqqah level or null
   */
  getDaqqahLevel(level) {
    const levels = this.getDaqqahLevels()
    return levels.find(l => l.level === level) || null
  },

  /**
   * Create a new menu item (admin only in future)
   * @param {object} data - Item data
   * @returns {object} Created item
   */
  createItem(data) {
    const menu = this.getMenu()
    const newItem = {
      ...data,
      id: data.id || `item_${Date.now()}`,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
    menu.items = menu.items || []
    menu.items.push(newItem)
    storageService.set(MENU_KEY, menu)
    return newItem
  },

  /**
   * Update a menu item
   * @param {string} id - Item ID
   * @param {object} updates - Updates to apply
   * @returns {object|null} Updated item or null
   */
  updateItem(id, updates) {
    const menu = this.getMenu()
    const items = menu.items || []
    const index = items.findIndex(item => item.id === id)

    if (index === -1) return null

    items[index] = {
      ...items[index],
      ...updates,
      id: items[index].id,
      metadata: {
        ...items[index].metadata,
        updatedAt: new Date().toISOString()
      }
    }

    menu.items = items
    storageService.set(MENU_KEY, menu)
    return items[index]
  },

  /**
   * Delete a menu item
   * @param {string} id - Item ID
   * @returns {boolean} Success status
   */
  deleteItem(id) {
    const menu = this.getMenu()
    const items = menu.items || []
    const filtered = items.filter(item => item.id !== id)

    if (filtered.length === items.length) return false

    menu.items = filtered
    storageService.set(MENU_KEY, menu)
    return true
  },

  /**
   * Get price range for an item
   * @param {string} id - Item ID
   * @returns {object|null} Min/max prices or null
   */
  getPriceRange(id) {
    const item = this.getItemById(id)
    if (!item || !item.sizes) return null

    const prices = item.sizes.map(size => size.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      currency: 'EGP'
    }
  }
}

export default menuService
