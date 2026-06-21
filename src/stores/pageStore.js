/**
 * Page Store
 * State management for static page content
 * Uses local pageService
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import pageService from '../services/modules/pageService'

export const usePageStore = defineStore('pages', () => {
  const pages = ref(null)
  const searchFAQQuery = ref('')

  /**
   * Load all pages data from service on initialization
   */
  function initializePages() {
    try {
      pages.value = pageService.getAll()
    } catch (e) {
      console.error('[PageStore] Error loading pages:', e)
    }
  }

  /**
   * Get about page
   */
  function getAbout() {
    return pageService.getAbout()
  }

  /**
   * Get about sections
   */
  function getAboutSections() {
    return pageService.getAboutSections()
  }

  /**
   * Get about section by ID
   */
  function getAboutSection(sectionId) {
    return pageService.getAboutSection(sectionId)
  }

  /**
   * Get contact page
   */
  function getContact() {
    return pageService.getContact()
  }

  /**
   * Get contact phone numbers
   */
  function getContactPhones() {
    return pageService.getContactPhones()
  }

  /**
   * Get contact email
   */
  function getContactEmail() {
    return pageService.getContactEmail()
  }

  /**
   * Get contact social links
   */
  function getContactSocialLinks() {
    return pageService.getContactSocialLinks()
  }

  /**
   * Get business hours
   */
  function getBusinessHours() {
    return pageService.getBusinessHours()
  }

  /**
   * Get contact address
   */
  function getContactAddress() {
    return pageService.getContactAddress()
  }

  /**
   * Get all FAQs
   */
  function getFAQs() {
    return pageService.getFAQs()
  }

  /**
   * Get FAQ by ID
   */
  function getFAQById(id) {
    return pageService.getFAQById(id)
  }

  /**
   * Computed: Filtered FAQs based on search
   */
  const filteredFAQs = computed(() => {
    const faqs = pageService.getFAQs()
    if (!searchFAQQuery.value) return faqs

    const q = searchFAQQuery.value.toLowerCase()
    return faqs.filter(faq =>
      faq.question?.en?.toLowerCase().includes(q) ||
      faq.question?.ar?.toLowerCase().includes(q) ||
      faq.answer?.en?.toLowerCase().includes(q) ||
      faq.answer?.ar?.toLowerCase().includes(q)
    )
  })

  /**
   * Search FAQs
   */
  function searchFAQs(query) {
    return pageService.searchFAQs(query)
  }

  /**
   * Update about page
   */
  function updateAbout(updates) {
    const updated = pageService.updateAbout(updates)
    pages.value.about = updated
    return updated
  }

  /**
   * Update about section
   */
  function updateAboutSection(sectionId, updates) {
    const updated = pageService.updateAboutSection(sectionId, updates)
    return updated
  }

  /**
   * Update contact page
   */
  function updateContact(updates) {
    const updated = pageService.updateContact(updates)
    pages.value.contact = updated
    return updated
  }

  /**
   * Add FAQ
   */
  function addFAQ(data) {
    const newFAQ = pageService.addFAQ(data)
    pages.value.faqs = pageService.getFAQs()
    return newFAQ
  }

  /**
   * Update FAQ
   */
  function updateFAQ(id, updates) {
    const updated = pageService.updateFAQ(id, updates)
    pages.value.faqs = pageService.getFAQs()
    return updated
  }

  /**
   * Delete FAQ
   */
  function deleteFAQ(id) {
    const success = pageService.deleteFAQ(id)
    if (success) {
      pages.value.faqs = pageService.getFAQs()
    }
    return success
  }

  /**
   * Get page metadata
   */
  function getMetadata() {
    return pageService.getMetadata()
  }

  /**
   * Initialize store on first load
   */
  initializePages()

  return {
    pages,
    searchFAQQuery,
    filteredFAQs,
    getAbout,
    getAboutSections,
    getAboutSection,
    getContact,
    getContactPhones,
    getContactEmail,
    getContactSocialLinks,
    getBusinessHours,
    getContactAddress,
    getFAQs,
    getFAQById,
    searchFAQs,
    updateAbout,
    updateAboutSection,
    updateContact,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    getMetadata
  }
})
