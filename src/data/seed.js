/**
 * Storage Seed & Initialization
 * Populates localStorage with initial data on first app load
 */

import { initializeStorage } from '../services/storage'

export async function seedStorageIfNeeded() {
  try {
    await initializeStorage()
  } catch (error) {
    console.error('Failed to seed storage:', error)
  }
}

export default seedStorageIfNeeded
