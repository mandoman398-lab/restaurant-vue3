<template>
  <DefaultLayout>
    <div class="form-page">
      <div class="form-header">
        <button class="back-btn" @click="$router.back()">← Back</button>
        <div>
          <h1 class="form-title">Edit Branch</h1>
          <p class="form-sub">Update Koshary Abou Tarek branch details</p>
        </div>
      </div>

      <LoadingSpinner v-if="loading" :full="true" label="Loading branch…" />

      <div v-else class="form-card">
        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-row">
            <div class="field">
              <label>Branch Name *</label>
              <input v-model="form.name" type="text" placeholder="e.g. Downtown — وسط البلد" required />
            </div>
            <div class="field">
              <label>Area / District *</label>
              <input v-model="form.area" type="text" placeholder="e.g. Downtown Cairo" required />
            </div>
          </div>

          <div class="field">
            <label>Full Address *</label>
            <input v-model="form.address" type="text" placeholder="Full address" required />
          </div>

          <div class="form-row">
            <div class="field">
              <label>Contact Number *</label>
              <input v-model="form.contact" type="text" placeholder="e.g. +20 2 2577 5935" required />
            </div>
            <div class="field">
              <label>Hotline</label>
              <input v-model="form.hotline" type="text" placeholder="e.g. 16011" />
            </div>
          </div>

          <div class="field">
            <label>Opening Hours</label>
            <input v-model="form.hours" type="text" placeholder="e.g. 7:00 AM – 12:00 AM" />
          </div>

          <div class="field">
            <label>Description</label>
            <textarea v-model="form.description" rows="3" placeholder="Brief description of this branch…"></textarea>
          </div>

          <div class="field-row-check">
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
            <button type="button" class="btn-secondary" @click="$router.back()">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="submitting">
              <span v-if="submitting" class="btn-spinner"></span>
              {{ submitting ? 'Saving…' : '💾 Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useRestaurantStore } from '../stores/restaurantStore'
import { useToast } from '../composables/useToast'

const store = useRestaurantStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const submitting = ref(false)
const form = reactive({
  name: '', area: '', address: '', contact: '',
  hotline: '', hours: '', description: '',
  delivery: true, isMainBranch: false
})

onMounted(async () => {
  const data = await store.fetchById(route.params.id)
  if (data) {
    form.name = data.name || ''
    form.area = data.area || ''
    form.address = data.address || ''
    form.contact = data.contact || ''
    form.hotline = data.hotline || '16011'
    form.hours = data.hours || ''
    form.description = data.description || ''
    form.delivery = data.delivery !== false
    form.isMainBranch = !!data.isMainBranch
  } else {
    toast.error('Branch not found')
    router.push({ name: 'Home' })
  }
  loading.value = false
})

async function handleSubmit() {
  if (!form.name.trim() || !form.contact.trim() || !form.address.trim()) {
    toast.warning('Name, contact, and address are required')
    return
  }
  submitting.value = true
  const ok = await store.update(route.params.id, {
    name: form.name.trim(),
    area: form.area.trim(),
    address: form.address.trim(),
    contact: form.contact.trim(),
    hotline: form.hotline.trim(),
    hours: form.hours.trim(),
    description: form.description.trim(),
    delivery: form.delivery,
    isMainBranch: form.isMainBranch
  })
  submitting.value = false
  if (ok) {
    toast.success('Branch updated successfully!')
    router.push({ name: 'Home' })
  } else {
    toast.error('Failed to update. Try again.')
  }
}
</script>

<style scoped>
.form-page { max-width: 640px; margin: 0 auto; padding: 32px 24px; }
.form-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: .9rem; padding: 6px 0; white-space: nowrap; margin-top: 4px; }
.back-btn:hover { color: var(--primary); }
.form-title { margin: 0 0 2px; font-size: 1.6rem; font-weight: 800; color: var(--text); }
.form-sub { margin: 0; color: var(--text-muted); font-size: .85rem; }
.form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 28px; }
.form { display: flex; flex-direction: column; gap: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: .85rem; font-weight: 600; color: var(--text); }
.field input, .field textarea {
  padding: 11px 14px; border: 1.5px solid var(--border); border-radius: 10px;
  background: var(--bg); color: var(--text); font-size: .92rem; transition: border-color .15s;
  font-family: inherit; resize: vertical;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--primary); }
.field-row-check { display: flex; gap: 24px; flex-wrap: wrap; }
.check-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: .9rem; color: var(--text); }
.check-label input { width: 16px; height: 16px; accent-color: var(--primary); cursor: pointer; }
.form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
.btn-primary { padding: 11px 24px; background: var(--primary); color: #fff; border: none; border-radius: 10px; font-size: .95rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: opacity .15s; }
.btn-primary:hover:not(:disabled) { opacity: .88; }
.btn-primary:disabled { opacity: .6; cursor: not-allowed; }
.btn-secondary { padding: 11px 24px; background: var(--bg); color: var(--text); border: 1.5px solid var(--border); border-radius: 10px; font-size: .95rem; font-weight: 600; cursor: pointer; transition: all .15s; }
.btn-secondary:hover { border-color: var(--primary); color: var(--primary); }
.btn-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 520px) { .form-row { grid-template-columns: 1fr; } }
</style>
