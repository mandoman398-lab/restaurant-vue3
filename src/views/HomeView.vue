<template>
  <DefaultLayout>

    <!-- ── Hero Banner ── -->
    <section class="hero" aria-label="Restaurant overview">
      <div class="hero-content">
        <div class="hero-badge" role="note">🌟 TasteAtlas Top 100 Legendary Restaurants</div>
        <h1 class="hero-title">
          <span class="hero-ar" lang="ar">كشري أبو طارق</span>
          <span class="hero-en">Koshary Abou Tarek</span>
        </h1>
        <p class="hero-sub">
          Egypt's most iconic koshary since the 1950s — born from a street cart,
          now a legendary 4-story landmark in Downtown Cairo loved by millions.
        </p>
        <div class="hero-stats" role="list" aria-label="Restaurant statistics">
          <div class="stat" role="listitem"><span class="stat-num">1950s</span><span class="stat-label">Founded</span></div>
          <div class="stat-div" aria-hidden="true"></div>
          <div class="stat" role="listitem"><span class="stat-num">4</span><span class="stat-label">Floors</span></div>
          <div class="stat-div" aria-hidden="true"></div>
          <div class="stat" role="listitem"><span class="stat-num">6+</span><span class="stat-label">Branches</span></div>
          <div class="stat-div" aria-hidden="true"></div>
          <div class="stat" role="listitem"><span class="stat-num">3</span><span class="stat-label">Countries</span></div>
        </div>
        <div class="hero-hotline">
          <span class="hotline-label">📞 Order Delivery</span>
          <a class="hotline-num" href="tel:16011" aria-label="Call delivery hotline 16011">16011</a>
          <span class="hotline-sub">Daily 7 AM – 10 PM</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="dish-circle">🍲</div>
        <div class="dish-label">Egypt's National<br>Street Food</div>
      </div>
    </section>

    <!-- ── Menu Highlights ── -->
    <section class="menu-section" aria-labelledby="menu-heading">
      <div class="section-header">
        <h2 id="menu-heading" class="section-title">🍽️ Our Menu</h2>
        <p class="section-sub">Simple. Perfect. Legendary.</p>
      </div>
      <div class="menu-grid" role="list">
        <article class="menu-item featured" role="listitem">
          <div class="menu-icon" aria-hidden="true">🍲</div>
          <div class="menu-info">
            <h3>Koshary</h3>
            <p>Rice, lentils &amp; pasta layered with spiced tomato sauce, crispy fried onions &amp; tangy daqqah. 100% vegan.</p>
          </div>
          <div class="menu-price" aria-label="Price approximately 65 Egyptian pounds">~65 EGP</div>
        </article>
        <article class="menu-item" role="listitem">
          <div class="menu-icon" aria-hidden="true">🥣</div>
          <div class="menu-info">
            <h3>Lentil Soup</h3>
            <p>Traditional Egyptian lentil soup, slow-cooked to perfection.</p>
          </div>
          <div class="menu-price" aria-label="Price approximately 60 Egyptian pounds">~60 EGP</div>
        </article>
        <article class="menu-item" role="listitem">
          <div class="menu-icon" aria-hidden="true">🍮</div>
          <div class="menu-info">
            <h3>Rice Pudding</h3>
            <p>Classic Om Ali–style Egyptian rice pudding, the perfect sweet finish.</p>
          </div>
          <div class="menu-price">Market price</div>
        </article>
      </div>
    </section>

    <!-- ── Branches Section ── -->
    <section class="branches-section" aria-labelledby="branches-heading">
      <div class="branches-header">
        <div>
          <h2 id="branches-heading" class="section-title">📍 Our Branches</h2>
          <p class="section-sub" aria-live="polite">
            {{ store.filtered.length }} branch{{ store.filtered.length !== 1 ? 'es' : '' }} found
          </p>
        </div>
        <router-link v-if="auth.isAuthenticated" to="/add" class="btn-add" aria-label="Add a new branch">➕ Add Branch</router-link>
      </div>

      <!-- Toolbar -->
      <div class="toolbar" role="search">
        <div class="search-wrap">
          <label for="branch-search" class="sr-only">Search branches</label>
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input
            id="branch-search"
            v-model="store.searchQuery"
            class="search-input"
            type="search"
            placeholder="Search by name, area, address…"
            @input="store.currentPage = 1"
            autocomplete="off"
          />
          <button
            v-if="store.searchQuery"
            class="clear-btn"
            @click="store.searchQuery = ''; store.currentPage = 1"
            aria-label="Clear search"
          >✕</button>
        </div>
        <div class="view-toggle" role="group" aria-label="View mode">
          <button
            :class="['toggle-btn', store.viewMode === 'grid' && 'active']"
            @click="store.setViewMode('grid')"
            :aria-pressed="store.viewMode === 'grid'"
            title="Card view"
            aria-label="Switch to card view"
          >⊞</button>
          <button
            :class="['toggle-btn', store.viewMode === 'table' && 'active']"
            @click="store.setViewMode('table')"
            :aria-pressed="store.viewMode === 'table'"
            title="Table view"
            aria-label="Switch to table view"
          >☰</button>
        </div>
      </div>

      <!-- States -->
      <LoadingSpinner v-if="store.loading" :full="true" label="Loading branches…" />

      <template v-else-if="store.restaurants.length === 0">
        <div class="empty-state" role="status">
          <div class="empty-icon" aria-hidden="true">🍲</div>
          <h3>No branches yet</h3>
          <p v-if="auth.isAuthenticated">Add the first branch to get started.</p>
          <p v-else>No branch data available yet.</p>
          <router-link v-if="auth.isAuthenticated" to="/add" class="btn-primary">Add Branch</router-link>
        </div>
      </template>

      <template v-else-if="store.filtered.length === 0">
        <div class="empty-state" role="status" aria-live="polite">
          <div class="empty-icon" aria-hidden="true">🔍</div>
          <h3>No results for "{{ store.searchQuery }}"</h3>
          <p>Try a different search term.</p>
          <button class="btn-secondary" @click="store.searchQuery = ''">Clear search</button>
        </div>
      </template>

      <template v-else>
        <!-- Grid view -->
        <div
          v-if="store.viewMode === 'grid'"
          class="grid"
          role="list"
          aria-label="Branch cards"
        >
          <div role="listitem" v-for="r in store.paginated" :key="r.id">
            <RestaurantCard :r="r" @delete="confirmDelete" />
          </div>
        </div>

        <!-- Table view -->
        <div v-else class="table-wrap">
          <table class="table" role="table" aria-label="Branches table">
            <thead>
              <tr>
                <th scope="col">Branch</th>
                <th scope="col">Area</th>
                <th scope="col">Contact</th>
                <th scope="col">Hours</th>
                <th scope="col"><span class="sr-only">Favorite</span></th>
                <th v-if="auth.isAuthenticated" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in store.paginated" :key="r.id">
                <td>
                  <div class="table-name">
                    <button
                      class="clickable"
                      @click="$router.push({ name: 'RestaurantDetail', params: { id: r.id } })"
                      :aria-label="`View details for ${r.name}`"
                    >{{ r.name }}</button>
                    <span v-if="r.isMainBranch" class="flagship-badge" aria-label="Flagship branch">⭐ Flagship</span>
                  </div>
                </td>
                <td class="area-cell">{{ r.area }}</td>
                <td>
                  <a :href="`tel:${r.contact}`" class="phone-link">{{ r.contact }}</a>
                </td>
                <td class="hours-cell">{{ r.hours }}</td>
                <td>
                  <button
                    class="fav-inline"
                    @click="store.toggleFavorite(String(r.id))"
                    :aria-label="store.isFavorite(String(r.id)) ? `Remove ${r.name} from favorites` : `Save ${r.name} to favorites`"
                    :aria-pressed="store.isFavorite(String(r.id))"
                  >
                    <span aria-hidden="true">{{ store.isFavorite(String(r.id)) ? '❤️' : '🤍' }}</span>
                  </button>
                </td>
                <td v-if="auth.isAuthenticated" class="actions-cell">
                  <router-link
                    :to="{ name: 'Update', params: { id: r.id } }"
                    class="link-btn"
                    :aria-label="`Edit ${r.name}`"
                  >Edit</router-link>
                  <button
                    class="del-btn"
                    @click="confirmDelete(r)"
                    :aria-label="`Delete ${r.name}`"
                  >Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <nav v-if="store.totalPages > 1" class="pagination" aria-label="Branches pagination">
          <button
            class="page-btn"
            :disabled="store.currentPage <= 1"
            @click="store.currentPage--"
            aria-label="Previous page"
          >← Prev</button>
          <span class="page-info" aria-live="polite">Page {{ store.currentPage }} of {{ store.totalPages }}</span>
          <button
            class="page-btn"
            :disabled="store.currentPage >= store.totalPages"
            @click="store.currentPage++"
            aria-label="Next page"
          >Next →</button>
        </nav>
      </template>
    </section>

    <!-- ── Delete Modal ── -->
    <div
      v-if="deleteTarget"
      class="modal-overlay"
      @click.self="deleteTarget = null"
      role="dialog"
      aria-modal="true"
      :aria-label="`Confirm deletion of ${deleteTarget.name}`"
    >
      <div class="modal">
        <h3>Delete Branch?</h3>
        <p>Are you sure you want to remove <strong>{{ deleteTarget.name }}</strong>? This cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="deleteTarget = null" autofocus>Cancel</button>
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
import { useAuthStore } from '../stores/authStore'
import { useToast } from '../composables/useToast'
import { usePageMeta } from '../composables/usePageMeta'

usePageMeta({
  title: 'All Branches',
  description: 'Find all Koshary Abou Tarek branch locations, addresses, phone numbers, and opening hours across Cairo and Egypt.'
})

const store = useRestaurantStore()
const auth = useAuthStore()
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
  background: linear-gradient(135deg, #b00d28 0%, var(--primary) 40%, #8b0920 100%);
  padding: 52px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.hero-content { flex: 1; max-width: 560px; position: relative; z-index: 1; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.15); color: rgba(255,255,255,.92);
  border: 1px solid rgba(255,255,255,.2);
  padding: 5px 14px; border-radius: 20px;
  font-size: .75rem; font-weight: 600; letter-spacing: .04em; margin-bottom: 16px;
}
.hero-title {
  margin: 0 0 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.hero-ar {
  font-size: 2.4rem; font-weight: 900; color: #fff;
  direction: rtl; line-height: 1.1;
}
.hero-en {
  font-size: 1.05rem; font-weight: 600;
  color: rgba(255,255,255,.75); letter-spacing: .04em;
}
.hero-sub {
  color: rgba(255,255,255,.82); font-size: .9rem;
  line-height: 1.65; margin: 0 0 22px; max-width: 480px;
}
.hero-stats {
  display: flex; align-items: center; gap: 14px; margin-bottom: 22px; flex-wrap: wrap;
}
.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-num { font-size: 1.3rem; font-weight: 900; color: var(--gold); line-height: 1; }
.stat-label { font-size: .68rem; color: rgba(255,255,255,.6); text-transform: uppercase; letter-spacing: .07em; }
.stat-div { width: 1px; height: 30px; background: rgba(255,255,255,.2); }

.hero-hotline {
  display: inline-flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22);
  border-radius: 12px; padding: 11px 18px; flex-wrap: wrap;
}
.hotline-label { font-size: .8rem; color: rgba(255,255,255,.7); white-space: nowrap; }
.hotline-num {
  font-size: 1.5rem; font-weight: 900; color: var(--gold);
  text-decoration: none; letter-spacing: .06em;
}
.hotline-num:hover { text-decoration: underline; }
.hotline-sub { font-size: .75rem; color: rgba(255,255,255,.6); }

.hero-visual {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  position: relative; z-index: 1; flex-shrink: 0;
}
.dish-circle {
  width: 150px; height: 150px;
  background: rgba(255,255,255,.12); border: 3px solid rgba(255,255,255,.2);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 4.5rem; box-shadow: 0 0 60px rgba(245,166,35,.3);
}
.dish-label { font-size: .8rem; color: rgba(255,255,255,.7); text-align: center; line-height: 1.4; }

/* ── Menu ── */
.menu-section {
  padding: 40px 36px;
  border-bottom: 1px solid var(--border);
}
.section-header { margin-bottom: 24px; }
.section-title { margin: 0 0 4px; font-size: 1.4rem; font-weight: 800; color: var(--text); }
.section-sub { margin: 0; color: var(--text-muted); font-size: .9rem; }

.menu-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
}
.menu-item {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: 16px; padding: 20px;
  display: flex; flex-direction: column; gap: 10px;
  transition: border-color .15s, box-shadow .15s;
}
.menu-item:hover { border-color: var(--primary); box-shadow: 0 4px 16px rgba(200,16,46,.1); }
.menu-item.featured { border-color: var(--gold); background: var(--gold-light); }
.menu-item.featured:hover { box-shadow: 0 4px 16px rgba(245,166,35,.2); }
.menu-icon { font-size: 2rem; }
.menu-info h3 { margin: 0 0 5px; font-size: .95rem; font-weight: 800; color: var(--text); }
.menu-info p { margin: 0; font-size: .8rem; color: var(--text-muted); line-height: 1.55; }
.menu-price {
  margin-top: auto; font-size: .88rem; font-weight: 700; color: var(--primary);
  background: var(--primary-light); padding: 4px 10px; border-radius: 8px;
  align-self: flex-start;
}
.menu-item.featured .menu-price { background: rgba(245,166,35,.2); color: #b37400; }

/* ── Branches ── */
.branches-section { padding: 36px; }
.branches-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 20px; gap: 16px; flex-wrap: wrap;
}

.toolbar {
  display: flex; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; align-items: center;
}
.search-wrap {
  flex: 1; min-width: 200px; position: relative; display: flex; align-items: center;
}
.search-icon { position: absolute; left: 12px; pointer-events: none; font-size: .9rem; }
.search-input {
  width: 100%; padding: 10px 40px 10px 36px;
  border: 1.5px solid var(--border); border-radius: 10px;
  background: var(--surface); color: var(--text); font-size: .9rem;
  transition: border-color .15s; box-sizing: border-box;
}
.search-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(200,16,46,.12); }
.clear-btn {
  position: absolute; right: 10px; background: none; border: none;
  cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px;
  font-size: .9rem;
}
.clear-btn:hover { color: var(--primary); }

.view-toggle { display: flex; gap: 4px; }
.toggle-btn {
  width: 38px; height: 38px; border: 1.5px solid var(--border);
  background: var(--surface); border-radius: 8px; cursor: pointer;
  font-size: 1.1rem; color: var(--text-muted); transition: all .15s;
}
.toggle-btn:hover { border-color: var(--primary); color: var(--primary); }
.toggle-btn.active { background: var(--primary); border-color: var(--primary); color: #fff; }
.toggle-btn:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

/* Table */
.table-wrap { overflow-x: auto; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); }
.table { width: 100%; border-collapse: collapse; min-width: 600px; }
.table th {
  background: var(--bg); padding: 12px 16px; text-align: left;
  font-size: .75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .05em; color: var(--text-muted); border-bottom: 1px solid var(--border);
}
.table td { padding: 13px 16px; border-bottom: 1px solid var(--border); font-size: .88rem; color: var(--text); }
.table tbody tr:last-child td { border-bottom: none; }
.table tbody tr:hover { background: var(--bg); }

.table-name { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.clickable {
  cursor: pointer; font-weight: 700; color: var(--primary);
  background: none; border: none; padding: 0; font-size: inherit; font-family: inherit;
  text-align: left;
}
.clickable:hover { text-decoration: underline; }
.clickable:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 2px; }
.flagship-badge {
  font-size: .7rem; font-weight: 700; background: var(--gold-light);
  color: #b37400; padding: 2px 8px; border-radius: 10px; white-space: nowrap;
}
.area-cell { color: var(--text-muted); font-size: .83rem; }
.hours-cell { font-size: .83rem; white-space: nowrap; }
.phone-link { color: var(--primary); text-decoration: none; font-weight: 600; }
.phone-link:hover { text-decoration: underline; }
.fav-inline {
  background: none; border: none; cursor: pointer; font-size: 1rem;
  padding: 2px; border-radius: 4px; transition: transform .15s;
}
.fav-inline:hover { transform: scale(1.2); }
.actions-cell { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.link-btn {
  color: var(--primary); font-weight: 600; text-decoration: none;
  font-size: .82rem; padding: 5px 10px; border-radius: 6px;
  border: 1px solid var(--primary); white-space: nowrap; transition: all .15s;
}
.link-btn:hover { background: var(--primary); color: #fff; }
.del-btn {
  background: #fff0f0; color: #ef4444; border: none;
  padding: 5px 10px; border-radius: 6px; cursor: pointer;
  font-size: .82rem; font-weight: 600; transition: all .15s; white-space: nowrap;
}
.del-btn:hover { background: #ef4444; color: #fff; }

/* Pagination */
.pagination {
  display: flex; align-items: center; justify-content: center;
  gap: 16px; margin-top: 28px; flex-wrap: wrap;
}
.page-btn {
  padding: 8px 18px; border: 1.5px solid var(--border);
  background: var(--surface); color: var(--text);
  border-radius: 8px; cursor: pointer; font-size: .9rem; font-weight: 600;
  transition: all .15s;
}
.page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.page-btn:disabled { opacity: .4; cursor: not-allowed; }
.page-btn:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.page-info { font-size: .9rem; color: var(--text-muted); }

/* Empty states */
.empty-state { text-align: center; padding: 60px 24px; color: var(--text-muted); }
.empty-icon { font-size: 4rem; margin-bottom: 16px; }
.empty-state h3 { margin: 0 0 8px; font-size: 1.2rem; color: var(--text); }
.empty-state p { margin: 0 0 20px; }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 500; padding: 16px;
  backdrop-filter: blur(4px);
}
.modal {
  background: var(--surface); border-radius: 18px; padding: 28px;
  max-width: 380px; width: 100%;
  box-shadow: 0 24px 64px rgba(0,0,0,.25);
  animation: modalIn .2s ease-out;
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(.95) translateY(-8px); }
  to { opacity: 1; transform: none; }
}
.modal h3 { margin: 0 0 10px; font-size: 1.2rem; color: var(--text); }
.modal p { margin: 0 0 24px; color: var(--text-muted); font-size: .9rem; line-height: 1.55; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

/* Buttons */
.btn-add, .btn-primary {
  padding: 10px 20px; background: var(--primary); color: #fff;
  border: none; border-radius: 10px; font-size: .9rem; font-weight: 700;
  cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;
  gap: 6px; transition: opacity .15s; white-space: nowrap;
}
.btn-add:hover, .btn-primary:hover { opacity: .88; }
.btn-secondary {
  padding: 10px 20px; background: var(--bg); color: var(--text);
  border: 1.5px solid var(--border); border-radius: 10px;
  font-size: .9rem; font-weight: 600; cursor: pointer; transition: all .15s;
}
.btn-secondary:hover { border-color: var(--primary); color: var(--primary); }
.btn-danger {
  padding: 10px 20px; background: #ef4444; color: #fff;
  border: none; border-radius: 10px; font-size: .9rem; font-weight: 700;
  cursor: pointer; transition: opacity .15s;
}
.btn-danger:hover { opacity: .88; }

/* Accessibility */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .menu-grid { grid-template-columns: 1fr 1fr 1fr; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); }
}

@media (max-width: 860px) {
  .menu-grid { grid-template-columns: 1fr 1fr; }
  .menu-item.featured { grid-column: 1 / -1; flex-direction: row; align-items: center; }
}

@media (max-width: 768px) {
  .hero { flex-direction: column; padding: 36px 24px; }
  .hero-visual { display: none; }
  .hero-ar { font-size: 1.9rem; }
  .hero-stats { gap: 10px; }
  .menu-section, .branches-section { padding: 28px 20px; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
}

@media (max-width: 560px) {
  .hero { padding: 28px 16px; }
  .hero-ar { font-size: 1.6rem; }
  .hero-en { font-size: .9rem; }
  .hero-badge { font-size: .7rem; }
  .hero-sub { font-size: .85rem; }
  .hero-stats { gap: 8px; }
  .stat-num { font-size: 1.1rem; }
  .stat-div { height: 24px; }
  .hotline-num { font-size: 1.25rem; }
  .menu-grid { grid-template-columns: 1fr; }
  .menu-item.featured { flex-direction: column; }
  .menu-section, .branches-section { padding: 24px 16px; }
  .grid { grid-template-columns: 1fr; }
  .branches-header { gap: 12px; }
  .btn-add { font-size: .82rem; padding: 8px 14px; }
}

@media (max-width: 380px) {
  .hero { padding: 22px 12px; }
  .hero-ar { font-size: 1.35rem; }
  .hero-hotline { flex-direction: column; gap: 6px; padding: 10px 14px; }
  .stat-num { font-size: 1rem; }
}
</style>
