<template>
  <div class="app-shell">
    <header class="navbar">
      <div class="navbar-brand">
        <div class="brand-logo">🍲</div>
        <div class="brand-text">
          <span class="brand-ar">كشري أبو طارق</span>
          <span class="brand-en">Koshary Abou Tarek</span>
        </div>
      </div>
      <nav class="navbar-links">
        <router-link to="/" class="nav-link">
          <span class="nav-icon">🏠</span> Branches
        </router-link>
        <router-link to="/add" class="nav-link">
          <span class="nav-icon">➕</span> Add Branch
        </router-link>
      </nav>
      <div class="navbar-actions">
        <button class="icon-btn" @click="toggleDark" :title="dark ? 'Light mode' : 'Dark mode'">
          {{ dark ? '☀️' : '🌙' }}
        </button>
        <div class="user-menu" @click="menuOpen = !menuOpen" ref="userMenu">
          <div class="avatar">{{ initial }}</div>
          <span class="username">{{ auth.userName }}</span>
          <span class="caret">▾</span>
          <div class="dropdown" v-if="menuOpen">
            <div class="dropdown-item" @click="doLogout">🚪 Log out</div>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-brand">🍲 كشري أبو طارق — Koshary Abou Tarek</div>
        <div class="footer-info">
          <span>📞 Hotline: <strong>16011</strong></span>
          <span>🛵 Delivery: 7AM – 10PM</span>
          <span>🌍 Egypt · Saudi Arabia · UAE</span>
        </div>
        <div class="footer-copy">© 2025 Koshary Abou Tarek. All rights reserved.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useDarkMode } from '../composables/useDarkMode'

const auth = useAuthStore()
const router = useRouter()
const { dark, toggle: toggleDark } = useDarkMode()
const menuOpen = ref(false)
const userMenu = ref(null)

const initial = computed(() => auth.userName?.charAt(0)?.toUpperCase() || '?')

function doLogout() {
  auth.logout()
  router.push({ name: 'Login' })
}

function handleClickOutside(e) {
  if (userMenu.value && !userMenu.value.contains(e.target)) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.navbar {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 68px;
  background: var(--primary);
  box-shadow: 0 2px 12px rgba(200,16,46,.35);
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 16px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.brand-logo {
  width: 44px; height: 44px;
  background: rgba(255,255,255,.15);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  border: 1.5px solid rgba(255,255,255,.3);
}
.brand-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.brand-ar {
  font-size: .95rem;
  font-weight: 800;
  color: #fff;
  direction: rtl;
  line-height: 1;
}
.brand-en {
  font-size: .7rem;
  color: rgba(255,255,255,.75);
  letter-spacing: .03em;
  line-height: 1;
}

.navbar-links {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255,255,255,.8);
  font-weight: 500;
  font-size: .9rem;
  transition: all .15s;
}
.nav-link:hover, .nav-link.router-link-exact-active {
  background: rgba(255,255,255,.2);
  color: #fff;
}
.nav-icon { font-size: .9rem; }

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.icon-btn {
  width: 38px; height: 38px;
  border: none;
  background: rgba(255,255,255,.15);
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s;
}
.icon-btn:hover { background: rgba(255,255,255,.28); }

.user-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  position: relative;
  transition: background .15s;
  user-select: none;
}
.user-menu:hover { background: rgba(255,255,255,.15); }

.avatar {
  width: 34px; height: 34px;
  background: var(--gold);
  color: #1a0a0a;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .9rem;
}
.username { font-weight: 600; font-size: .9rem; color: #fff; }
.caret { font-size: .7rem; color: rgba(255,255,255,.7); }

.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.18);
  min-width: 140px;
  overflow: hidden;
  z-index: 200;
}
.dropdown-item {
  padding: 10px 16px;
  font-size: .9rem;
  cursor: pointer;
  color: var(--text);
  transition: background .12s;
}
.dropdown-item:hover { background: var(--bg); }

.main-content {
  flex: 1;
  padding: 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.app-footer {
  background: #1a0a0a;
  color: #c49898;
  padding: 28px 24px;
  margin-top: 48px;
}
.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-brand {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
}
.footer-info {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  font-size: .85rem;
}
.footer-info strong { color: var(--gold); }
.footer-copy { font-size: .78rem; opacity: .6; }

@media (max-width: 640px) {
  .navbar { padding: 0 14px; }
  .username { display: none; }
  .brand-ar { font-size: .82rem; }
  .brand-en { display: none; }
  .footer-info { gap: 12px; font-size: .8rem; }
}
</style>
