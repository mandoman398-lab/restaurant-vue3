<template>
  <div
    class="card card-hover branch-card"
    @click="$router.push({ name: 'RestaurantDetail', params: { id: r.id } })"
    tabindex="0"
    role="article"
    :aria-label="`${r.name} branch — click to view details`"
    @keydown.enter="$router.push({ name: 'RestaurantDetail', params: { id: r.id } })"
  >
    <!-- Top row -->
    <div class="card-top">
      <span class="badge" :class="r.isMainBranch ? 'badge-gold' : 'badge-primary'">
        <AppIcon v-if="r.isMainBranch" name="star-fill" :size="11" aria-hidden="true" />
        {{ r.isMainBranch ? 'Flagship' : r.area }}
      </span>
      <button
        class="fav-btn"
        @click.stop="store.toggleFavorite(String(r.id))"
        :aria-label="isFav ? `Remove ${r.name} from saved` : `Save ${r.name}`"
        :aria-pressed="isFav"
      >
        <AppIcon :name="isFav ? 'heart-fill' : 'heart'" :size="18"
          :color="isFav ? 'var(--error)' : 'var(--text-muted)'" aria-hidden="true" />
      </button>
    </div>

    <!-- Title -->
    <div class="card-body">
      <h3 class="card-name">{{ r.name }}</h3>
      <p class="card-desc" v-if="r.description">{{ r.description }}</p>
    </div>

    <!-- Details -->
    <ul class="detail-list">
      <li class="detail-item">
        <AppIcon name="map-pin" :size="15" color="var(--primary)" aria-hidden="true" />
        <span>{{ r.address }}</span>
      </li>
      <li class="detail-item">
        <AppIcon name="phone" :size="15" color="var(--primary)" aria-hidden="true" />
        <a :href="`tel:${r.contact}`" @click.stop class="phone-link">{{ r.contact }}</a>
      </li>
      <li class="detail-item">
        <AppIcon name="clock" :size="15" color="var(--text-muted)" aria-hidden="true" />
        <span>{{ r.hours }}</span>
      </li>
      <li v-if="r.delivery" class="detail-item delivery-item">
        <AppIcon name="truck" :size="15" color="var(--success)" aria-hidden="true" />
        <span>Delivery · Hotline <strong>{{ r.hotline || '16011' }}</strong></span>
      </li>
    </ul>

    <!-- Admin actions (authenticated only) -->
    <div v-if="auth.isAuthenticated" class="card-actions" @click.stop>
      <router-link
        :to="{ name: 'Update', params: { id: r.id } }"
        class="btn btn-secondary btn-sm"
        :aria-label="`Edit ${r.name}`"
      >
        <AppIcon name="edit" :size="13" aria-hidden="true" />
        Edit
      </router-link>
      <button
        class="btn btn-danger btn-sm"
        @click="$emit('delete', r)"
        :aria-label="`Delete ${r.name}`"
      >
        <AppIcon name="trash" :size="13" aria-hidden="true" />
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRestaurantStore } from '../stores/restaurantStore'
import { useAuthStore } from '../stores/authStore'
import AppIcon from './AppIcon.vue'

const props = defineProps({ r: Object })
defineEmits(['delete'])

const store = useRestaurantStore()
const auth  = useAuthStore()
const isFav = computed(() => store.isFavorite(String(props.r.id)))
</script>

<style scoped>
.branch-card {
  padding: var(--sp-5);
  display: flex; flex-direction: column; gap: var(--sp-4);
  outline: none;
}

/* Top row */
.card-top { display: flex; justify-content: space-between; align-items: flex-start; }

.fav-btn {
  background: none; border: none; cursor: pointer; padding: var(--sp-1);
  border-radius: var(--r-sm); transition: transform .15s; line-height: 0;
}
.fav-btn:hover { transform: scale(1.25); }
.fav-btn:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }

/* Body */
.card-body { display: flex; flex-direction: column; gap: var(--sp-1); }
.card-name { font-size: .98rem; font-weight: 800; color: var(--text); line-height: 1.3; }
.card-desc {
  font-size: .8rem; color: var(--text-muted); line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Detail list */
.detail-list {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: var(--sp-2);
  background: var(--bg); border-radius: var(--r-lg); padding: var(--sp-3);
}
.detail-item { display: flex; gap: var(--sp-2); font-size: .82rem; color: var(--text-muted); align-items: flex-start; line-height: 1.45; }
.detail-item svg { flex-shrink: 0; margin-top: 1px; }
.delivery-item { color: var(--success); }
.delivery-item strong { color: var(--success); }
.phone-link { color: var(--primary); font-weight: 600; }
.phone-link:hover { text-decoration: underline; }

/* Actions */
.card-actions { display: flex; gap: var(--sp-2); }
.card-actions .btn { flex: 1; }
</style>
