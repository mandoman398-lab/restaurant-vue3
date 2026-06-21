<template>
  <DefaultLayout>
    <div class="form-page">
      <div class="form-header">
        <button class="back-link btn btn-ghost btn-sm" @click="$router.back()">
          <AppIcon name="arrow-left" :size="15" aria-hidden="true" />
          Back
        </button>
        <div>
          <h1 class="form-title">Add New Branch</h1>
          <p class="form-sub">Add a Koshary Abou Tarek branch location</p>
        </div>
      </div>

      <div class="card form-card">
        <form @submit.prevent="handleSubmit" class="form" novalidate>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label">Branch Name *</label>
              <input class="form-input" :class="{ 'has-error': errors.name }" v-model="form.name" type="text" placeholder="e.g. New Cairo — التجمع الخامس" required />
              <span v-if="errors.name" class="form-error-msg">{{ errors.name }}</span>
            </div>
            <div class="form-field">
              <label class="form-label">Area / District *</label>
              <input class="form-input" :class="{ 'has-error': errors.area }" v-model="form.area" type="text" placeholder="e.g. New Cairo" required />
              <span v-if="errors.area" class="form-error-msg">{{ errors.area }}</span>
            </div>
          </div>

          <div class="form-field">
            <label class="form-label">Full Address *</label>
            <input class="form-input" :class="{ 'has-error': errors.address }" v-model="form.address" type="text" placeholder="e.g. 16 Maarouf St., Downtown Cairo" required />
            <span v-if="errors.address" class="form-error-msg">{{ errors.address }}</span>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label class="form-label">Contact Number *</label>
              <input class="form-input" :class="{ 'has-error': errors.contact }" v-model="form.contact" type="text" placeholder="e.g. +20 2 2577 5935" required />
              <span v-if="errors.contact" class="form-error-msg">{{ errors.contact }}</span>
            </div>
            <div class="form-field">
              <label class="form-label">Hotline</label>
              <input class="form-input" v-model="form.hotline" type="text" placeholder="e.g. 16011" />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label">Opening Hours</label>
            <input class="form-input" v-model="form.hours" type="text" placeholder="e.g. 9:00 AM – 11:00 PM" />
          </div>

          <div class="form-field">
            <label class="form-label">Description</label>
            <textarea class="form-input" v-model="form.description" rows="3" placeholder="Brief description of this branch…" style="resize:vertical"></textarea>
          </div>

          <div class="check-row">
            <label class="check-label">
              <input type="checkbox" v-model="form.delivery" />
              <span>Delivery available</span>
            </label>
            <label class="check-label">
              <input type="checkbox" v-model="form.isMainBranch" />
              <span>Flagship branch</span>
            </label>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="$router.back()">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner" aria-hidden="true"></span>
              {{ submitting ? 'Adding…' : 'Add Branch' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { useRestaurantStore } from '../stores/restaurantStore'
import { useToast } from '../composables/useToast'

const store = useRestaurantStore()
const router = useRouter()
const toast = useToast()

const form = reactive({ name: '', area: '', address: '', contact: '', hotline: '16011', hours: '', description: '', delivery: true, isMainBranch: false })
const errors = reactive({})
const submitting = ref(false)

function validate() {
  errors.name    = form.name.trim()    ? '' : 'Branch name is required'
  errors.area    = form.area.trim()    ? '' : 'Area is required'
  errors.contact = form.contact.trim() ? '' : 'Contact is required'
  errors.address = form.address.trim() ? '' : 'Address is required'
  return !errors.name && !errors.area && !errors.contact && !errors.address
}

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  const ok = await store.create({
    name: form.name.trim(), area: form.area.trim(), address: form.address.trim(),
    contact: form.contact.trim(), hotline: form.hotline.trim() || '16011',
    hours: form.hours.trim() || '9:00 AM – 11:00 PM',
    description: form.description.trim(), delivery: form.delivery, isMainBranch: form.isMainBranch
  })
  submitting.value = false
  if (ok) { toast.success(`"${form.name}" branch added!`); router.push({ name: 'Home' }) }
  else      toast.error('Failed to add branch. Try again.')
}
</script>

<style scoped>
.form-page   { max-width: 640px; margin: 0 auto; padding: var(--sp-8) var(--sp-6); }
.form-header { display: flex; align-items: flex-start; gap: var(--sp-4); margin-bottom: var(--sp-6); }
.back-link   { flex-shrink: 0; margin-top: 4px; }
.form-title  { margin: 0 0 var(--sp-1); font-size: 1.55rem; font-weight: 800; color: var(--text); }
.form-sub    { margin: 0; color: var(--text-muted); font-size: .85rem; }

.form-card { padding: var(--sp-6); }
.form      { display: flex; flex-direction: column; gap: var(--sp-5); }
.form-row  { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }

.check-row  { display: flex; gap: var(--sp-6); flex-wrap: wrap; }
.check-label { display: flex; align-items: center; gap: var(--sp-2); cursor: pointer; font-size: .9rem; color: var(--text); }
.check-label input { width: 16px; height: 16px; accent-color: var(--primary); cursor: pointer; }

.form-actions { display: flex; gap: var(--sp-3); justify-content: flex-end; margin-top: var(--sp-2); }

.spinner { border-color: rgba(255,255,255,.35); border-top-color: #fff; width: 16px; height: 16px; border-width: 2px; }

@media (max-width: 520px) {
  .form-page { padding: var(--sp-5) var(--sp-4); }
  .form-row  { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column; }
  .form-actions .btn { width: 100%; }
}
</style>
