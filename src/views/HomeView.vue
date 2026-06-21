<template>
  <DefaultLayout>
    <!-- Hero Banner -->
    <div class="hero">
      <div class="hero-content">
        <div class="hero-badge">🌟 TasteAtlas Top 100 Legendary Restaurants</div>
        <h1 class="hero-title">
          <span class="hero-ar">كشري أبو طارق</span>
          <span class="hero-en">Koshary Abou Tarek</span>
        </h1>
        <p class="hero-sub">Egypt's most iconic koshary since the 1950s — born from a street cart, now a legendary 4-story landmark in Downtown Cairo loved by millions.</p>
        <div class="hero-stats">
          <div class="stat"><span class="stat-num">1950s</span><span class="stat-label">Est.</span></div>
          <div class="stat-div"></div>
          <div class="stat"><span class="stat-num">4</span><span class="stat-label">Floors</span></div>
          <div class="stat-div"></div>
          <div class="stat"><span class="stat-num">6+</span><span class="stat-label">Branches</span></div>
          <div class="stat-div"></div>
          <div class="stat"><span class="stat-num">3</span><span class="stat-label">Countries</span></div>
        </div>
        <div class="hero-hotline">
          <span class="hotline-label">📞 Hotline &amp; Delivery</span>
          <a class="hotline-num" href="tel:16011">16011</a>
          <span class="hotline-sub">Daily 7 AM – 10 PM</span>
        </div>
      </div>
      <div class="hero-visual">
        <div class="dish-circle">
          <span class="dish-emoji">🍲</span>
        </div>
        <div class="dish-label">Egypt's National<br>Street Food</div>
      </div>
    </div>

    <!-- Menu Highlights -->
    <div class="menu-section">
      <h2 class="section-title">🍽️ Our Menu</h2>
      <p class="section-sub">Simple. Perfect. Legendary.</p>
      <div class="menu-grid">
        <div class="menu-item featured">
          <div class="menu-icon">🍲</div>
          <div class="menu-info">
            <h4>Koshary</h4>
            <p>Rice, lentils &amp; pasta layered with spiced tomato sauce, crispy fried onions &amp; tangy daqqah. 100% vegan.</p>
          </div>
          <div class="menu-price">~65 EGP</div>
        </div>
        <div class="menu-item">
          <div class="menu-icon">🥣</div>
          <div class="menu-info">
            <h4>Lentil Soup</h4>
            <p>Traditional Egyptian lentil soup, slow-cooked to perfection.</p>
          </div>
          <div class="menu-price">~60 EGP</div>
        </div>
        <div class="menu-item">
          <div class="menu-icon">🍮</div>
          <div class="menu-info">
            <h4>Rice Pudding</h4>
            <p>Classic Om Ali–style Egyptian rice pudding, the perfect sweet finish.</p>
          </div>
          <div class="menu-price">Market</div>
        </div>
      </div>
    </div>

    <!-- Branches Section -->
    <div class="branches-section">
      <div class="branches-header">
        <div>
          <h2 class="section-title">📍 Our Branches</h2>
          <p class="section-sub">{{ store.filtered.length }} branch{{ store.filtered.length !== 1 ? 'es' : '' }} found</p>
        </div>
        <router-link to="/add" class="btn-add">➕ Add Branch</router-link>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input
            v-model="store.searchQuery"
            class="search-input"
            placeholder="Search by name, area, address…"
            @input="store.currentPage = 1"
          />
          <button v-if="store.searchQuery" class="clear-btn" @click="store.searchQuery = ''; store.currentPage = 1">✕</button>
        </div>
        <div class="view-toggle">
          <button :class="['toggle-btn', store.viewMode === 'grid' && 'active']" @click="store.setViewMode('grid')" title="Card view">⊞</button>
          <button :class="['toggle-btn', store.viewMode === 'table' && 'active']" @click="store.setViewMode('table')" title="Table view">☰</button>
        </div>
      </div>

      <LoadingSpinner v-if="store.loading" :full="true" label="Loading branches…" />

      <template v-else-if="store.restaurants.length === 0">
        <div class="empty-state">
          <div class="empty-icon">🍲</div>
          <h3>No branches yet</h3>
          <p>Add the first branch to get started.</p>
          <router-link to="/add" class="btn-primary">Add Branch</router-link>
        </div>
      </template>

      <template v-else-if="store.filtered.length === 0">
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No results for "{{ store.searchQuery }}"</h3>
          <p>Try a different search term.</p>
          <button class="btn-secondary" @click="store.searchQuery = ''">Clear search</button>
        </div>
      </template>

      <template v-else>
        <div v-if="store.viewMode === 'grid'" class="grid">
          <RestaurantCard
            v-for="r in store.paginated"
            :key="r.id"
            :r="r"
            @delete="confirmDelete"
          />
        </div>

        <div v-else class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Area</th>
                <th>Contact</th>
                <th>Hours</th>
                <th>Fav</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in store.paginated" :key="r.id">
                <td>
                  <div class="table-name">
                    <span class="clickable" @click="$router.push({ name: 'RestaurantDetail', params: { id: r.id } })">{{ r.name }}</span>
                    <span v-if="r.isMainBranch" class="flagship-badge">Flagship</span>
                  </div>
                </td>
                <td class="area-cell">{{ r.area }}</td>
                <td>{{ r.contact }}</td>
                <td class="hours-cell">{{ r.hours }}</td>
                <td>
                  <button class="fav-inline" @click="store.toggleFavorite(String(r.id))">
                    {{ store.isFavorite(String(r.id)) ? '❤️' : '🤍' }}
                  </button>
                </td>
                <td class="actions-cell">
                  <router-link :to="{ name: 'Update', params: { id: r.id } }" class="link-btn">Edit</router-link>
                  <button class="del-btn" @click="confirmDelete(r)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="store.totalPages > 1" class="pagination">
          <button class="page-btn" :disabled="store.currentPage <= 1" @click="store.currentPage--">← Prev</button>
          <span class="page-info">Page {{ store.currentPage }} of {{ store.totalPages }}</span>
          <button class="page-btn" :disabled="store.currentPage >= store.totalPages" @click="store.currentPage++">Next →</button>
        </div>
      </template>
    </div>

    <!-- Delete Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal">
        <h3>Delete Branch?</h3>
        <p>Are you sure you want to remove <strong>{{ deleteTarget.name }}</strong>? This cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="deleteTarget = null">Cancel</button>
          <button class="btn-danger" @click="doDelete">Delete</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useRestaurantStore } from '../stores/restaurantStore'
import { useToast } from '../composables/useToast'

const store = useRestaurantStore()
const toast = useToast()
const deleteTarget = ref(null)

onMounted(() => store.fetchAll())

function confirmDelete(r) { deleteTarget.value = r }

async function doDelete() {
  const name = deleteTarget.value.name
  const ok = await store.remove(deleteTarget.value.id)
  deleteTarget.value = null
  if (ok) toast.success(`"${name}" removed successfully`)
  else toast.error('Failed to delete branch')
}
</script>

<style scoped>
/* ── Hero ── */
.hero {
  background: linear-gradient(135deg, var(--primary) 0%, #8b0920 100%);
  padding: 52px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.hero-content {
  flex: 1;
  max-width: 560px;
  position: relative;
  z-index: 1;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,.15);
  color: rgba(255,255,255,.9);
  border: 1px solid rgba(255,255,255,.2);
  padding: 5px 14px;
  border-radius: 20px;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .04em;
  margin-bottom: 16px;
}
.hero-title {
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hero-ar {
  font-size: 2.2rem;
  font-weight: 900;
  color: #fff;
  direction: rtl;
  line-height: 1.1;
}
.hero-en {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255,255,255,.75);
  letter-spacing: .04em;
}
.hero-sub {
  color: rgba(255,255,255,.8);
  font-size: .9rem;
  line-height: 1.6;
  margin: 0 0 20px;
  max-width: 480px;
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-num { font-size: 1.3rem; font-weight: 900; color: var(--gold); line-height: 1; }
.stat-label { font-size: .7rem; color: rgba(255,255,255,.65); text-transform: uppercase; letter-spacing: .06em; }
.stat-div { width: 1px; height: 32px; background: rgba(255,255,255,.2); }

.hero-hotline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 12px;
  padding: 10px 18px;
  flex-wrap: wrap;
}
.hotline-label { font-size: .8rem; color: rgba(255,255,255,.7); }
.hotline-num {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--gold);
  text-decoration: none;
  letter-spacing: .05em;
}
.hotline-sub { font-size: .75rem; color: rgba(255,255,255,.6); }

.hero-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}
.dish-circle {
  width: 160px; height: 160px;
  background: rgba(255,255,255,.12);
  border: 3px solid rgba(255,255,255,.2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 5rem;
  box-shadow: 0 0 60px rgba(245,166,35,.3);
}
.dish-label {
  font-size: .8rem;
  color: rgba(255,255,255,.7);
  text-align: center;
  line-height: 1.4;
}

/* ── Menu Section ── */
.menu-section {
  padding: 40px 36px;
  border-bottom: 1px solid var(--border);
}
.section-title { margin: 0 0 4px; font-size: 1.4rem; font-weight: 800; color: var(--text); }
.section-sub { margin: 0 0 24px; color: var(--text-muted); font-size: .9rem; }

.menu-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
}
.menu-item {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color .15s;
}
.menu-item:hover { border-color: var(--primary); }
.menu-item.featured { border-color: var(--gold); background: var(--gold-light); }
.menu-icon { font-size: 2rem; }
.menu-info h4 { margin: 0 0 4px; font-size: .95rem; font-weight: 800; color: var(--text); }
.menu-info p { margin: 0; font-size: .8rem; color: var(--text-muted); line-height: 1.5; }
.menu-price {
  margin-top: auto;
  font-size: .9rem;
  font-weight: 700;
  color: var(--primary);
  align-self: flex-start;
  background: var(--primary-light);
  padding: 4px 10px;
  border-radius: 8px;
}
.menu-item.featured .menu-price { background: rgba(245,166,35,.2); color: #b37400; }

/* ── Branches Section ── */
.branches-section { padding: 36px; }

.branches-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 20px; gap: 16px; flex-wrap: wrap;
}

.toolbar {
  display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; align-items: center;
}
.search-wrap {
  flex: 1; min-width: 200px; position: relative; display: flex; align-items: center;
}
.search-icon { position: absolute; left: 12px; pointer-events: none; }
.search-input {
  width: 100%; padding: 10px 14px 10px 36px; border: 1.5px solid var(--border); border-radius: 10px;
  background: var(--surface); color: var(--text); font-size: .9rem; transition: border-color .15s; box-sizing: border-box;
}
.search-input:focus { outline: none; border-color: var(--primary); }
.clear-btn {
  position: absolute; right: 10px; background: none; border: none; cursor: pointer;
  color: var(--text-muted); padding: 4px;
}
.view-toggle { display: flex; gap: 4px; }
.toggle-btn {
  width: 38px; height: 38px; border: 1.5px solid var(--border); background: var(--surface);
  border-radius: 8px; cursor: pointer; font-size: 1.1rem; color: var(--text-muted); transition: all .15s;
}
.toggle-btn.active { background: var(--primary); border-color: var(--primary); color: #fff; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

.table-wrap { overflow-x: auto; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); }
.table { width: 100%; border-collapse: collapse; }
.table th {
  background: var(--bg); padding: 12px 16px; text-align: left; font-size: .76rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: .05em; color: var(--text-muted); border-bottom: 1px solid var(--border);
}
.table td { padding: 13px 16px; border-bottom: 1px solid var(--border); font-size: .88rem; color: var(--text); }
.table tbody tr:last-child td { border-bottom: none; }
.table tbody tr:hover { background: var(--bg); }

.table-name { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.clickable { cursor: pointer; font-weight: 700; color: var(--primary); }
.clickable:hover { text-decoration: underline; }
.flagship-badge {
  font-size: .7rem; font-weight: 700; background: var(--gold-light); color: #b37400;
  padding: 2px 8px; border-radius: 10px; white-space: nowrap;
}
.area-cell { color: var(--text-muted); font-size: .83rem; }
.hours-cell { font-size: .83rem; white-space: nowrap; }
.fav-inline { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 2px; }
.actions-cell { display: flex; gap: 8px; align-items: center; }
.link-btn { color: var(--primary); font-weight: 600; text-decoration: none; font-size: .82rem; padding: 5px 10px; border-radius: 6px; border: 1px solid var(--primary); white-space: nowrap; }
.link-btn:hover { background: var(--primary); color: #fff; }
.del-btn { background: #fff0f0; color: #ef4444; border: none; padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: .82rem; font-weight: 600; transition: all .15s; white-space: nowrap; }
.del-btn:hover { background: #ef4444; color: #fff; }

.pagination { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 28px; }
.page-btn { padding: 8px 18px; border: 1.5px solid var(--border); background: var(--surface); color: var(--text); border-radius: 8px; cursor: pointer; font-size: .9rem; font-weight: 600; transition: all .15s; }
.page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.page-btn:disabled { opacity: .4; cursor: not-allowed; }
.page-info { font-size: .9rem; color: var(--text-muted); }

.empty-state { text-align: center; padding: 60px 24px; color: var(--text-muted); }
.empty-icon { font-size: 4rem; margin-bottom: 16px; }
.empty-state h3 { margin: 0 0 8px; font-size: 1.2rem; color: var(--text); }
.empty-state p { margin: 0 0 20px; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 500; padding: 16px; }
.modal { background: var(--surface); border-radius: 16px; padding: 28px; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
.modal h3 { margin: 0 0 10px; font-size: 1.2rem; color: var(--text); }
.modal p { margin: 0 0 24px; color: var(--text-muted); font-size: .9rem; line-height: 1.5; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

.btn-add, .btn-primary { padding: 10px 20px; background: var(--primary); color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: opacity .15s; }
.btn-add:hover, .btn-primary:hover { opacity: .88; }
.btn-secondary { padding: 10px 20px; background: var(--bg); color: var(--text); border: 1.5px solid var(--border); border-radius: 10px; font-size: .9rem; font-weight: 600; cursor: pointer; }
.btn-secondary:hover { border-color: var(--primary); color: var(--primary); }
.btn-danger { padding: 10px 20px; background: #ef4444; color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700; cursor: pointer; transition: opacity .15s; }
.btn-danger:hover { opacity: .88; }

@media (max-width: 768px) {
  .hero { flex-direction: column; padding: 32px 20px; }
  .hero-visual { display: none; }
  .hero-ar { font-size: 1.6rem; }
  .menu-grid { grid-template-columns: 1fr; }
  .menu-section, .branches-section { padding: 28px 20px; }
  .hero-stats { gap: 10px; }
}
</style>
