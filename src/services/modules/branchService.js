/**
 * Branch Service
 * Handles all branch data operations from localStorage
 */

import { storageService } from '../storage'

const BRANCHES_KEY = 'app_branches'

/**
 * Branch service for all branch-related operations
 */
export const branchService = {
  /**
   * Get all branches
   * @returns {Array} All branches
   */
  getAll() {
    return storageService.get(BRANCHES_KEY, [])
  },

  /**
   * Get a single branch by ID
   * @param {string} id - Branch ID
   * @returns {object|null} Branch object or null
   */
  getById(id) {
    const branches = this.getAll()
    return branches.find(b => b.id === id) || null
  },

  /**
   * Get main/flagship branch
   * @returns {object|null} Main branch or null
   */
  getMainBranch() {
    const branches = this.getAll()
    return branches.find(b => b.flags?.isMainBranch) || null
  },

  /**
   * Get all active branches
   * @returns {Array} Active branches only
   */
  getActive() {
    const branches = this.getAll()
    return branches.filter(b => b.flags?.isActive !== false)
  },

  /**
   * Get featured branches
   * @returns {Array} Featured branches
   */
  getFeatured() {
    const branches = this.getAll()
    return branches.filter(b => b.flags?.isFeatured)
  },

  /**
   * Get branches by area
   * @param {string} area - Area identifier
   * @returns {Array} Branches in that area
   */
  getByArea(area) {
    const branches = this.getAll()
    return branches.filter(b => b.location?.area === area)
  },

  /**
   * Search branches
   * @param {string} query - Search query
   * @returns {Array} Matching branches
   */
  search(query) {
    const branches = this.getAll()
    const q = query.toLowerCase()
    return branches.filter(b => 
      b.name?.en?.toLowerCase().includes(q) ||
      b.name?.ar?.toLowerCase().includes(q) ||
      b.location?.address?.toLowerCase().includes(q) ||
      b.location?.areaLabel?.en?.toLowerCase().includes(q) ||
      b.location?.areaLabel?.ar?.toLowerCase().includes(q)
    )
  },

  /**
   * Create a new branch (admin only in future)
   * @param {object} data - Branch data
   * @returns {object} Created branch with ID
   */
  create(data) {
    const branches = this.getAll()
    const newBranch = {
      ...data,
      id: data.id || `branch_${Date.now()}`,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
    branches.push(newBranch)
    storageService.set(BRANCHES_KEY, branches)
    return newBranch
  },

  /**
   * Update a branch
   * @param {string} id - Branch ID
   * @param {object} updates - Updates to apply
   * @returns {object|null} Updated branch or null
   */
  update(id, updates) {
    const branches = this.getAll()
    const index = branches.findIndex(b => b.id === id)
    
    if (index === -1) return null
    
    branches[index] = {
      ...branches[index],
      ...updates,
      id: branches[index].id, // Preserve ID
      metadata: {
        ...branches[index].metadata,
        updatedAt: new Date().toISOString()
      }
    }
    
    storageService.set(BRANCHES_KEY, branches)
    return branches[index]
  },

  /**
   * Delete a branch
   * @param {string} id - Branch ID
   * @returns {boolean} Success status
   */
  delete(id) {
    const branches = this.getAll()
    const filtered = branches.filter(b => b.id !== id)
    
    if (filtered.length === branches.length) return false // Not found
    
    storageService.set(BRANCHES_KEY, filtered)
    return true
  },

  /**
   * Toggle branch active status
   * @param {string} id - Branch ID
   * @returns {boolean} New active status or null
   */
  toggleActive(id) {
    const branch = this.getById(id)
    if (!branch) return null
    
    const newStatus = !branch.flags?.isActive
    this.update(id, {
      flags: {
        ...branch.flags,
        isActive: newStatus
      }
    })
    return newStatus
  },

  /**
   * Add/update favorite branch
   * @param {string} id - Branch ID
   * @returns {boolean} Whether now favorited
   */
  toggleFavorite(id) {
    const favorites = storageService.get('favorites_branches', [])
    const index = favorites.indexOf(id)
    
    if (index === -1) {
      favorites.push(id)
    } else {
      favorites.splice(index, 1)
    }
    
    storageService.set('favorites_branches', favorites)
    return index === -1
  },

  /**
   * Get favorite branches
   * @returns {Array} Favorited branches
   */
  getFavorites() {
    const favorites = storageService.get('favorites_branches', [])
    return favorites.map(id => this.getById(id)).filter(Boolean)
  },

  /**
   * Check if branch is favorited
   * @param {string} id - Branch ID
   * @returns {boolean} Favorited status
   */
  isFavorite(id) {
    const favorites = storageService.get('favorites_branches', [])
    return favorites.includes(id)
  }
}

export default branchService
