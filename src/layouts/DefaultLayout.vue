<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header class="navbar" role="banner">
      <router-link to="/" class="navbar-brand" aria-label="Koshary Abou Tarek – Home">
        <div class="brand-logo" aria-hidden="true">🍲</div>
        <div class="brand-text">
          <span class="brand-ar">كشري أبو طارق</span>
          <span class="brand-en">Koshary Abou Tarek</span>
        </div>
      </router-link>

      <nav class="navbar-links" aria-label="Main navigation">
        <router-link to="/" class="nav-link">
          <span aria-hidden="true">🏠</span>
          <span class="nav-label">Branches</span>
        </router-link>
        <router-link to="/menu" class="nav-link">
          <span aria-hidden="true">🍽️</span>
          <span class="nav-label">Menu</span>
        </router-link>
        <router-link v-if="auth.isAuthenticated" to="/add" class="nav-link">
          <span aria-hidden="true">➕</span>
          <span class="nav-label">Add</span>
        </router-link>
      </nav>

      <div class="navbar-actions">
        <button
          v-if="canInstall"
          class="install-btn"
          @click="install"
          aria-label="Install app"
        >📲 <span class="install-label">Install</span></button>

        <button
          class="icon-btn"
          @click="toggleDark"
          :title="dark ? 'Light mode' : 'Dark mode'"
          :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
        ><span aria-hidden="true">{{ dark ? '☀️' : '🌙' }}</span></button>

        <!-- Authenticated user menu -->
        <div
          v-if="auth.isAuthenticated"
          class="user-menu"
          @click="menuOpen = !menuOpen"
          ref="userMenu"
          role="button"
          :aria-expanded="menuOpen"
          aria-haspopup="true"
          tabindex="0"
          @keydown.enter="menuOpen = !menuOpen"
          @keydown.escape="menuOpen = false"
        >
          <div class="avatar" aria-hidden="true">{{ initial }}</div>
          <span class="username">{{ auth.userName }}</span>
          <span class="caret" aria-hidden="true">▾</span>
          <div class="dropdown" v-if="menuOpen" role="menu">
            <button class="dropdown-item" role="menuitem" @click="doLogout">
              <span aria-hidden="true">🚪</span> Log out
            </button>
          </div>
        </div>

        <!-- Guest login button -->
        <router-link v-else to="/login" class="login-btn" aria-label="Sign in to manage branches">
          <span aria-hidden="true">🔑</span>
          <span class="login-label">Sign in</span>
        </router-link>
      </div>
    </header>

    <main class="main-content" id="main-content">
      <slot />
    </main>

    <footer class="app-footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-brand">🍲 كشري أبو طارق — Koshary Abou Tarek</div>
        <nav class="footer-links" aria-label="Footer navigation">
          <router-link to="/" class="footer-nav-link">Branches</router-link>
          <router-link to="/menu" class="footer-nav-link">Menu</router-link>
        </nav>
        <div class="footer-info">
          <a href="tel:16011" class="footer-link">📞 Hotline: <strong>16011</strong></a>
          <span>🛵 Delivery: 7 AM – 10 PM</span>
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
import { usePWAInstall } from '../composables/usePWAInstall'

const auth = useAuthStore()
const router = useRouter()
const { dark, toggle: toggleDark } = useDarkMode()
const { canInstall, install } = usePWAInstall()
const menuOpen = ref(false)
const userMenu = ref(null)

const initial = computed(() => auth.userName?.charAt(0)?.toUpperCase() || '?')

function doLogout() {
  auth.logout()
  router.push({ name: 'Home' })
}

function handleClickOutside(e) {
  if (userMenu.value && !userMenu.value.contains(e.target)) menuOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.skip-link {
  position: absolute; top: -100px; left: 16px;
  background: var(--gold); color: #1a0a0a;
  padding: 8px 16px; border-radius: 0 0 8px 8px;
  font-weight: 700; font-size: .9rem; text-decoration: none;
  z-index: 9999; transition: top .15s;
}
.skip-link:focus { top: 0; }

.app-shell {
  min-height: 100vh;
  display: flex; flex-direction: column;
  background: var(--bg); color: var(--text);
}

/* ── Navbar ── */
.navbar {
  display: flex; align-items: center;
  padding: 0 24px; height: 64px;
  background: var(--primary);
  box-shadow: 0 2px 12px rgba(200,16,46,.35);
  position: sticky; top: 0; z-index: 100; gap: 12px;
}

.navbar-brand {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; flex-shrink: 0;
}
.brand-logo {
  width: 40px; height: 40px;
  background: rgba(255,255,255,.15); border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; border: 1.5px solid rgba(255,255,255,.3); flex-shrink: 0;
}
.brand-text { display: flex; flex-direction: column; gap: 1px; }
.brand-ar { font-size: .92rem; font-weight: 800; color: #fff; direction: rtl; line-height: 1; }
.brand-en { font-size: .65rem; color: rgba(255,255,255,.72); letter-spacing: .03em; line-height: 1; }

.navbar-links { display: flex; gap: 2px; flex: 1; }
.nav-link {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 12px; border-radius: 8px;
  text-decoration: none; color: rgba(255,255,255,.8);
  font-weight: 500; font-size: .88rem;
  transition: all .15s; white-space: nowrap;
}
.nav-link:hover,
.nav-link.router-link-exact-active {
  background: rgba(255,255,255,.2); color: #fff;
}
.nav-link:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

.navbar-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.install-btn {
  display: flex; align-items: center; gap: 5px;
  background: var(--gold); color: #1a0a0a;
  border: none; border-radius: 8px; padding: 6px 12px;
  cursor: pointer; font-size: .8rem; font-weight: 700;
  transition: opacity .15s; white-space: nowrap;
}
.install-btn:hover { opacity: .88; }

.icon-btn {
  width: 36px; height: 36px; border: none;
  background: rgba(255,255,255,.15); border-radius: 50%;
  cursor: pointer; font-size: 1rem;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s; flex-shrink: 0;
}
.icon-btn:hover { background: rgba(255,255,255,.28); }
.icon-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

.user-menu {
  display: flex; align-items: center; gap: 7px;
  cursor: pointer; padding: 5px 9px; border-radius: 8px;
  position: relative; transition: background .15s; user-select: none;
}
.user-menu:hover { background: rgba(255,255,255,.15); }
.user-menu:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
.avatar {
  width: 32px; height: 32px; background: var(--gold); color: #1a0a0a;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .88rem; flex-shrink: 0;
}
.username { font-weight: 600; font-size: .88rem; color: #fff; }
.caret { font-size: .65rem; color: rgba(255,255,255,.65); }

.dropdown {
  position: absolute; top: calc(100% + 6px); right: 0;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 10px; box-shadow: 0 8px 28px rgba(0,0,0,.18);
  min-width: 140px; overflow: hidden; z-index: 200;
}
.dropdown-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; padding: 11px 16px; font-size: .9rem;
  cursor: pointer; color: var(--text); background: none;
  border: none; text-align: left; transition: background .12s;
}
.dropdown-item:hover { background: var(--bg); }

.login-btn {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.18); color: #fff;
  border: 1.5px solid rgba(255,255,255,.35);
  border-radius: 8px; padding: 7px 14px;
  text-decoration: none; font-size: .88rem; font-weight: 700;
  transition: all .15s; white-space: nowrap;
}
.login-btn:hover { background: rgba(255,255,255,.28); }
.login-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

/* ── Main ── */
.main-content { flex: 1; padding: 0; max-width: 1200px; width: 100%; margin: 0 auto; box-sizing: border-box; }

/* ── Footer ── */
.app-footer { background: #1a0a0a; color: #c49898; padding: 28px 24px; margin-top: 48px; }
.footer-inner {
  max-width: 900px; margin: 0 auto; text-align: center;
  display: flex; flex-direction: column; gap: 10px;
}
.footer-brand { font-size: 1rem; font-weight: 800; color: #fff; }
.footer-links { display: flex; justify-content: center; gap: 20px; }
.footer-nav-link {
  color: rgba(255,255,255,.6); text-decoration: none; font-size: .84rem; font-weight: 600;
  transition: color .15s;
}
.footer-nav-link:hover { color: var(--gold); }
.footer-info { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; font-size: .83rem; }
.footer-link { color: inherit; text-decoration: none; }
.footer-link:hover { color: var(--gold); }
.footer-info strong { color: var(--gold); }
.footer-copy { font-size: .76rem; opacity: .5; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .install-label { display: none; }
}
@media (max-width: 640px) {
  .navbar { padding: 0 14px; height: 58px; }
  .username { display: none; }
  .brand-en { display: none; }
  .nav-label { display: none; }
  .nav-link { padding: 7px 10px; }
  .login-label { display: none; }
  .footer-info { gap: 12px; font-size: .78rem; }
  .app-footer { padding: 20px 16px; }
}
@media (max-width: 380px) {
  .brand-ar { font-size: .78rem; }
  .brand-logo { width: 34px; height: 34px; font-size: 1.1rem; }
}
</style>
