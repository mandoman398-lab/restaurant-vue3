/**
 * Page Service
 * Handles all static page content operations from localStorage
 */

import { storageService } from '../storage'

const PAGES_KEY = 'app_pages'

/**
 * Page service for all page content operations
 */
export const pageService = {
  /**
   * Get all pages data
   * @returns {object} All pages object
   */
  getAll() {
    return storageService.get(PAGES_KEY, {})
  },

  /**
   * Get about page content
   * @returns {object|null} About page or null
   */
  getAbout() {
    const pages = this.getAll()
    return pages.about || null
  },

  /**
   * Get about page sections
   * @returns {Array} About page sections
   */
  getAboutSections() {
    const about = this.getAbout()
    return about?.sections || []
  },

  /**
   * Get about page section by ID
   * @param {string} sectionId - Section ID
   * @returns {object|null} Section or null
   */
  getAboutSection(sectionId) {
    const sections = this.getAboutSections()
    return sections.find(s => s.id === sectionId) || null
  },

  /**
   * Get contact page content
   * @returns {object|null} Contact page or null
   */
  getContact() {
    const pages = this.getAll()
    return pages.contact || null
  },

  /**
   * Get contact phone numbers
   * @returns {object} Phone numbers
   */
  getContactPhones() {
    const contact = this.getContact()
    return contact?.phones || {}
  },

  /**
   * Get contact email
   * @returns {string} Email address
   */
  getContactEmail() {
    const contact = this.getContact()
    return contact?.email || ''
  },

  /**
   * Get contact social links
   * @returns {object} Social media links
   */
  getContactSocialLinks() {
    const contact = this.getContact()
    return contact?.socialLinks || {}
  },

  /**
   * Get business hours
   * @returns {object} Business hours in multiple languages
   */
  getBusinessHours() {
    const contact = this.getContact()
    return contact?.businessHours || {}
  },

  /**
   * Get contact address
   * @returns {object} Address in multiple languages
   */
  getContactAddress() {
    const contact = this.getContact()
    return contact?.address || {}
  },

  /**
   * Get FAQs
   * @returns {Array} FAQ items
   */
  getFAQs() {
    const pages = this.getAll()
    return pages.faqs || []
  },

  /**
   * Get single FAQ by ID
   * @param {string} id - FAQ ID
   * @returns {object|null} FAQ or null
   */
  getFAQById(id) {
    const faqs = this.getFAQs()
    return faqs.find(faq => faq.id === id) || null
  },

  /**
   * Search FAQs
   * @param {string} query - Search query
   * @returns {Array} Matching FAQs
   */
  searchFAQs(query) {
    const faqs = this.getFAQs()
    const q = query.toLowerCase()
    return faqs.filter(faq =>
      faq.question?.en?.toLowerCase().includes(q) ||
      faq.question?.ar?.toLowerCase().includes(q) ||
      faq.answer?.en?.toLowerCase().includes(q) ||
      faq.answer?.ar?.toLowerCase().includes(q)
    )
  },

  /**
   * Update about page
   * @param {object} updates - Updates to apply
   * @returns {object} Updated about page
   */
  updateAbout(updates) {
    const pages = this.getAll()
    pages.about = {
      ...pages.about,
      ...updates,
      metadata: {
        updatedAt: new Date().toISOString()
      }
    }
    storageService.set(PAGES_KEY, pages)
    return pages.about
  },

  /**
   * Update about page section
   * @param {string} sectionId - Section ID
   * @param {object} updates - Updates to apply
   * @returns {object|null} Updated section or null
   */
  updateAboutSection(sectionId, updates) {
    const pages = this.getAll()
    const sections = pages.about?.sections || []
    const index = sections.findIndex(s => s.id === sectionId)

    if (index === -1) return null

    sections[index] = {
      ...sections[index],
      ...updates
    }

    if (!pages.about) pages.about = {}
    pages.about.sections = sections

    storageService.set(PAGES_KEY, pages)
    return sections[index]
  },

  /**
   * Update contact page
   * @param {object} updates - Updates to apply
   * @returns {object} Updated contact page
   */
  updateContact(updates) {
    const pages = this.getAll()
    pages.contact = {
      ...pages.contact,
      ...updates,
      metadata: {
        updatedAt: new Date().toISOString()
      }
    }
    storageService.set(PAGES_KEY, pages)
    return pages.contact
  },

  /**
   * Add FAQ
   * @param {object} data - FAQ data
   * @returns {object} Created FAQ
   */
  addFAQ(data) {
    const pages = this.getAll()
    const faqs = pages.faqs || []
    const newFAQ = {
      ...data,
      id: data.id || `faq_${Date.now()}`
    }
    faqs.push(newFAQ)
    pages.faqs = faqs
    storageService.set(PAGES_KEY, pages)
    return newFAQ
  },

  /**
   * Update FAQ
   * @param {string} id - FAQ ID
   * @param {object} updates - Updates to apply
   * @returns {object|null} Updated FAQ or null
   */
  updateFAQ(id, updates) {
    const pages = this.getAll()
    const faqs = pages.faqs || []
    const index = faqs.findIndex(faq => faq.id === id)

    if (index === -1) return null

    faqs[index] = {
      ...faqs[index],
      ...updates,
      id: faqs[index].id
    }

    pages.faqs = faqs
    storageService.set(PAGES_KEY, pages)
    return faqs[index]
  },

  /**
   * Delete FAQ
   * @param {string} id - FAQ ID
   * @returns {boolean} Success status
   */
  deleteFAQ(id) {
    const pages = this.getAll()
    const faqs = pages.faqs || []
    const filtered = faqs.filter(faq => faq.id !== id)

    if (filtered.length === faqs.length) return false

    pages.faqs = filtered
    storageService.set(PAGES_KEY, pages)
    return true
  },

  /**
   * Get page metadata
   * @returns {object} Page metadata
   */
  getMetadata() {
    const pages = this.getAll()
    return {
      aboutUpdated: pages.about?.metadata?.updatedAt,
      contactUpdated: pages.contact?.metadata?.updatedAt
    }
  }
}

export default pageService
