<template>
  <div class="card" @click="$router.push({ name: 'RestaurantDetail', params: { id: r.id } })">
    <div class="card-top">
      <div class="card-badge" :class="{ 'badge-main': r.isMainBranch }">
        {{ r.isMainBranch ? '⭐ Flagship' : r.area }}
      </div>
      <button class="fav-btn" @click.stop="store.toggleFavorite(String(r.id))" :title="isFav ? 'Remove from favorites' : 'Save branch'">
        {{ isFav ? '❤️' : '🤍' }}
      </button>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ r.name }}</h3>
      <p class="card-desc">{{ r.description }}</p>
    </div>

    <div class="card-details">
      <div class="detail-row"><span class="detail-icon">📍</span><span>{{ r.address }}</span></div>
      <div class="detail-row"><span class="detail-icon">📞</span><span>{{ r.contact }}</span></div>
      <div class="detail-row"><span class="detail-icon">🕐</span><span>{{ r.hours }}</span></div>
      <div v-if="r.delivery" class="delivery-chip">🛵 Delivery available · Hotline {{ r.hotline }}</div>
    </div>

    <div class="card-actions" @click.stop>
      <router-link :to="{ name: 'Update', params: { id: r.id } }" class="btn-edit">Edit</router-link>
      <button class="btn-del" @click="$emit('delete', r)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRestaurantStore } from '../stores/restaurantStore'

const props = defineProps({ r: Object })
defineEmits(['delete'])

const store = useRestaurantStore()
const isFav = computed(() => store.isFavorite(String(props.r.id)))
</script>

<style scoped>
.card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  cursor: pointer;
  transition: all .2s;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.card:hover {
  box-shadow: 0 10px 32px rgba(200,16,46,.14);
  transform: translateY(-3px);
  border-color: var(--primary);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-badge {
  font-size: .72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 20px;
}
.badge-main {
  background: var(--gold-light);
  color: #b37400;
}

.fav-btn {
  background: none; border: none; cursor: pointer; font-size: 1.1rem;
  padding: 2px; border-radius: 6px; transition: transform .15s; line-height: 1;
}
.fav-btn:hover { transform: scale(1.25); }

.card-body { display: flex; flex-direction: column; gap: 6px; }
.card-title {
  margin: 0;
  font-size: .98rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
}
.card-desc {
  margin: 0;
  font-size: .8rem;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: var(--bg);
  border-radius: 10px;
}
.detail-row {
  display: flex;
  gap: 8px;
  font-size: .82rem;
  color: var(--text-muted);
  align-items: flex-start;
  line-height: 1.4;
}
.detail-icon { flex-shrink: 0; }

.delivery-chip {
  font-size: .78rem;
  color: #16a34a;
  font-weight: 600;
  margin-top: 2px;
}

.card-actions {
  display: flex;
  gap: 8px;
}
.btn-edit {
  flex: 1; text-align: center; padding: 7px 0;
  background: var(--primary-light); color: var(--primary);
  border: 1.5px solid transparent; border-radius: 8px;
  font-size: .82rem; font-weight: 700; text-decoration: none;
  transition: all .15s;
}
.btn-edit:hover { background: var(--primary); color: #fff; }

.btn-del {
  flex: 1; padding: 7px 0;
  background: #fff0f0; color: #ef4444;
  border: none; border-radius: 8px;
  font-size: .82rem; font-weight: 700; cursor: pointer;
  transition: all .15s;
}
.btn-del:hover { background: #ef4444; color: #fff; }
</style>
