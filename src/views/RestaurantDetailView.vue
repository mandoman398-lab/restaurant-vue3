<template>
  <DefaultLayout>
    <LoadingSpinner v-if="loading" :full="true" label="Loading branch…" />
    <div v-else-if="restaurant" class="detail-page">
      <button class="back-btn" @click="$router.back()">← Back to branches</button>

      <div class="detail-hero">
        <div class="hero-icon">🍲</div>
        <div class="hero-info">
          <div class="hero-top">
            <div>
              <div class="hero-badges">
                <span v-if="restaurant.isMainBranch" class="badge-flagship">⭐ Flagship Branch</span>
                <span class="badge-area">{{ restaurant.area }}</span>
              </div>
              <h1 class="hero-title">{{ restaurant.name }}</h1>
            </div>
            <button class="fav-btn" @click="store.toggleFavorite(String(restaurant.id))">
              {{ isFav ? '❤️ Saved' : '🤍 Save Branch' }}
            </button>
          </div>
          <p class="hero-desc" v-if="restaurant.description">{{ restaurant.description }}</p>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-card">
          <div class="detail-icon">📍</div>
          <div>
            <p class="detail-label">Address</p>
            <p class="detail-value">{{ restaurant.address }}</p>
          </div>
        </div>
        <div class="detail-card">
          <div class="detail-icon">📞</div>
          <div>
            <p class="detail-label">Phone</p>
            <p class="detail-value">
              <a :href="`tel:${restaurant.contact}`" class="phone-link">{{ restaurant.contact }}</a>
            </p>
          </div>
        </div>
        <div class="detail-card">
          <div class="detail-icon">🕐</div>
          <div>
            <p class="detail-label">Opening Hours</p>
            <p class="detail-value">{{ restaurant.hours || 'See branch' }}</p>
          </div>
        </div>
        <div class="detail-card">
          <div class="detail-icon">🛵</div>
          <div>
            <p class="detail-label">Delivery</p>
            <p class="detail-value" :class="restaurant.delivery ? 'text-green' : 'text-muted'">
              {{ restaurant.delivery ? `Available · Hotline ${restaurant.hotline || '16011'}` : 'Not available' }}
            </p>
          </div>
        </div>
      </div>

      <div class="hotline-banner" v-if="restaurant.delivery">
        <span class="hotline-text">📞 Order Delivery</span>
        <a :href="`tel:${restaurant.hotline || '16011'}`" class="hotline-num">{{ restaurant.hotline || '16011' }}</a>
        <span class="hotline-sub">Daily 7 AM – 10 PM</span>
      </div>

      <div class="detail-actions">
        <router-link :to="{ name: 'Update', params: { id: restaurant.id } }" class="btn-primary">✏️ Edit Branch</router-link>
        <button class="btn-danger" @click="showDelete = true">🗑️ Delete</button>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">❓</div>
      <h3>Branch not found</h3>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>

    <div v-if="showDelete" class="modal-overlay" @click.self="showDelete = false">
      <div class="modal">
        <h3>Delete Branch?</h3>
        <p>Are you sure you want to remove <strong>{{ restaurant?.name }}</strong>? This cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showDelete = false">Cancel</button>
          <button class="btn-danger-solid" @click="doDelete">Delete</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
const restaurant = ref(null)
const showDelete = ref(false)

const isFav = computed(() => store.isFavorite(String(route.params.id)))

onMounted(async () => {
  restaurant.value = await store.fetchById(route.params.id)
  loading.value = false
})

async function doDelete() {
  const ok = await store.remove(route.params.id)
  if (ok) {
    toast.success('Branch deleted')
    router.push({ name: 'Home' })
  } else {
    toast.error('Failed to delete')
    showDelete.value = false
  }
}
</script>

<style scoped>
.detail-page { max-width: 700px; margin: 0 auto; padding: 32px 24px; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: .9rem; margin-bottom: 24px; padding: 0; display: block; }
.back-btn:hover { color: var(--primary); }

.detail-hero {
  background: linear-gradient(135deg, var(--primary) 0%, #8b0920 100%);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}
.hero-icon {
  width: 72px; height: 72px;
  background: rgba(255,255,255,.15);
  border: 2px solid rgba(255,255,255,.25);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 2.2rem;
  flex-shrink: 0;
}
.hero-info { flex: 1; }
.hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
.hero-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
.badge-flagship {
  font-size: .72rem; font-weight: 700; background: var(--gold); color: #1a0a0a;
  padding: 3px 10px; border-radius: 20px; letter-spacing: .03em;
}
.badge-area {
  font-size: .72rem; font-weight: 600; background: rgba(255,255,255,.2); color: rgba(255,255,255,.9);
  padding: 3px 10px; border-radius: 20px;
}
.hero-title { margin: 0; font-size: 1.5rem; font-weight: 800; color: #fff; line-height: 1.3; }
.hero-desc { margin: 0; font-size: .88rem; color: rgba(255,255,255,.8); line-height: 1.5; }

.fav-btn {
  background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.3);
  padding: 8px 14px; border-radius: 10px; cursor: pointer; font-size: .85rem; font-weight: 600;
  color: #fff; transition: all .15s; white-space: nowrap; flex-shrink: 0;
}
.fav-btn:hover { background: rgba(255,255,255,.28); }

.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
.detail-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
  padding: 18px; display: flex; align-items: flex-start; gap: 14px;
}
.detail-icon { font-size: 1.4rem; flex-shrink: 0; }
.detail-label { margin: 0 0 4px; font-size: .74rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); }
.detail-value { margin: 0; font-size: .93rem; font-weight: 600; color: var(--text); }
.phone-link { color: var(--primary); text-decoration: none; }
.phone-link:hover { text-decoration: underline; }
.text-green { color: #16a34a; }
.text-muted { color: var(--text-muted); }

.hotline-banner {
  background: var(--gold-light);
  border: 1.5px solid rgba(245,166,35,.4);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.hotline-text { font-size: .85rem; color: #7a4f00; font-weight: 600; }
.hotline-num { font-size: 1.6rem; font-weight: 900; color: var(--primary); text-decoration: none; letter-spacing: .08em; }
.hotline-num:hover { text-decoration: underline; }
.hotline-sub { font-size: .8rem; color: var(--text-muted); }

.detail-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-primary { padding: 11px 24px; background: var(--primary); color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: opacity .15s; }
.btn-primary:hover { opacity: .88; }
.btn-secondary { padding: 11px 24px; background: var(--bg); color: var(--text); border: 1.5px solid var(--border); border-radius: 10px; font-size: .9rem; font-weight: 600; cursor: pointer; }
.btn-secondary:hover { border-color: var(--primary); color: var(--primary); }
.btn-danger { padding: 11px 24px; background: #fee2e2; color: #ef4444; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all .15s; }
.btn-danger:hover { background: #ef4444; color: #fff; }
.btn-danger-solid { padding: 10px 20px; background: #ef4444; color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700; cursor: pointer; }
.btn-danger-solid:hover { opacity: .88; }

.empty-state { text-align: center; padding: 80px 24px; color: var(--text-muted); }
.empty-icon { font-size: 4rem; margin-bottom: 16px; }
.empty-state h3 { margin: 0 0 20px; font-size: 1.2rem; color: var(--text); }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 500; padding: 16px; }
.modal { background: var(--surface); border-radius: 16px; padding: 28px; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
.modal h3 { margin: 0 0 10px; font-size: 1.2rem; color: var(--text); }
.modal p { margin: 0 0 24px; color: var(--text-muted); font-size: .9rem; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

@media (max-width: 520px) {
  .detail-grid { grid-template-columns: 1fr; }
  .detail-hero { flex-direction: column; }
  .detail-page { padding: 20px 16px; }
}
</style>
