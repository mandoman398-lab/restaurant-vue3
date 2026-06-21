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
          <AppIcon name="home" :size="17" aria-hidden="true" />
          <span class="nav-label">Branches</span>
        </router-link>
        <router-link to="/menu" class="nav-link">
          <AppIcon name="utensils" :size="17" aria-hidden="true" />
          <span class="nav-label">Menu</span>
        </router-link>
        <router-link v-if="auth.isAuthenticated" to="/add" class="nav-link">
          <AppIcon name="plus" :size="17" aria-hidden="true" />
          <span class="nav-label">Add</span>
        </router-link>
      </nav>

      <div class="navbar-actions">
        <button
          v-if="canInstall"
          class="install-btn btn btn-sm"
          @click="install"
          aria-label="Install app"
        >
          <AppIcon name="download" :size="15" aria-hidden="true" />
          <span class="install-label">Install</span>
        </button>

        <button
          class="icon-btn dark-btn"
          @click="toggleDark"
          :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="dark ? 'Light mode' : 'Dark mode'"
        >
          <AppIcon :name="dark ? 'sun' : 'moon'" :size="18" color="rgba(255,255,255,.85)" />
        </button>

        <!-- Authenticated user menu -->
        <div
          v-if="auth.isAuthenticated"
          class="user-menu"
          @click="menuOpen = !menuOpen"
          ref="userMenuEl"
          role="button"
          :aria-expanded="menuOpen"
          aria-haspopup="true"
          tabindex="0"
          @keydown.enter="menuOpen = !menuOpen"
          @keydown.escape="menuOpen = false"
        >
          <div class="avatar" aria-hidden="true">{{ initial }}</div>
          <span class="username">{{ auth.userName }}</span>
          <AppIcon name="chevron-down" :size="14" color="rgba(255,255,255,.65)" aria-hidden="true" />

          <div class="dropdown" v-if="menuOpen" role="menu">
            <button class="dropdown-item" role="menuitem" @click="doLogout">
              <AppIcon name="log-out" :size="16" aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>

        <!-- Guest login -->
        <router-link v-else to="/login" class="login-btn" aria-label="Sign in to manage branches">
          <AppIcon name="log-in" :size="17" aria-hidden="true" />
          <span class="login-label">Sign in</span>
        </router-link>
      </div>
    </header>

    <main class="main-content" id="main-content">
      <slot />
    </main>

    <footer class="app-footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-brand">كشري أبو طارق — Koshary Abou Tarek</div>
        <nav class="footer-links" aria-label="Footer navigation">
          <router-link to="/" class="footer-nav-link">Branches</router-link>
          <router-link to="/menu" class="footer-nav-link">Menu</router-link>
        </nav>
        <div class="footer-meta">
          <a href="tel:16011" class="footer-link">
            <AppIcon name="phone" :size="14" aria-hidden="true" />
            Hotline <strong>16011</strong>
          </a>
          <span>🛵 Delivery 7 AM – 10 PM</span>
          <span>Egypt · Saudi Arabia · UAE</span>
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
import AppIcon from '../components/AppIcon.vue'

const auth = useAuthStore()
const router = useRouter()
const { dark, toggle: toggleDark } = useDarkMode()
const { canInstall, install } = usePWAInstall()

const menuOpen  = ref(false)
const userMenuEl = ref(null)
const initial   = computed(() => auth.userName?.charAt(0)?.toUpperCase() || '?')

function doLogout() {
  auth.logout()
  menuOpen.value = false
  router.push({ name: 'Home' })
}

function handleClickOutside(e) {
  if (userMenuEl.value && !userMenuEl.value.contains(e.target)) menuOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* ── Skip link ── */
.skip-link {
  position: absolute; top: -100px; left: var(--sp-4);
  background: var(--gold); color: #1a0a0a;
  padding: var(--sp-2) var(--sp-4);
  border-radius: 0 0 var(--r-md) var(--r-md);
  font-weight: 700; font-size: .9rem;
  z-index: 9999; transition: top .15s;
}
.skip-link:focus { top: 0; }

/* ── Shell ── */
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }

/* ── Navbar ── */
.navbar {
  display: flex; align-items: center;
  padding: 0 var(--sp-6); height: 62px;
  background: var(--primary);
  box-shadow: var(--shadow-primary);
  position: sticky; top: 0; z-index: 100; gap: var(--sp-3);
}

.navbar-brand {
  display: flex; align-items: center; gap: var(--sp-3);
  text-decoration: none; flex-shrink: 0;
}
.brand-logo {
  width: 40px; height: 40px; flex-shrink: 0;
  background: var(--hero-glass); border: 1.5px solid var(--hero-glass-border);
  border-radius: var(--r-lg);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem;
}
.brand-text { display: flex; flex-direction: column; gap: 1px; line-height: 1; }
.brand-ar { font-size: .92rem; font-weight: 800; color: #fff; }
.brand-en { font-size: .65rem; color: rgba(255,255,255,.7); letter-spacing: .02em; }

/* ── Nav links ── */
.navbar-links { display: flex; gap: var(--sp-1); flex: 1; }
.nav-link {
  display: flex; align-items: center; gap: var(--sp-2);
  padding: 7px var(--sp-3); border-radius: var(--r-md);
  color: rgba(255,255,255,.82); font-weight: 600; font-size: .88rem;
  text-decoration: none; transition: all .15s;
}
.nav-link:hover,
.nav-link.router-link-exact-active { background: rgba(255,255,255,.2); color: #fff; }
.nav-link:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

/* ── Actions ── */
.navbar-actions { display: flex; align-items: center; gap: var(--sp-2); flex-shrink: 0; }

.install-btn {
  background: var(--gold) !important;
  color: #1a0a0a !important;
  border-color: var(--gold) !important;
  box-shadow: none !important;
}
.install-btn:hover:not(:disabled) { opacity: .88; }

.dark-btn { background: var(--hero-glass); }
.dark-btn:hover { background: rgba(255,255,255,.24); }

/* ── User menu ── */
.user-menu {
  display: flex; align-items: center; gap: var(--sp-2);
  cursor: pointer; padding: 5px var(--sp-2); border-radius: var(--r-md);
  position: relative; user-select: none; transition: background .15s;
}
.user-menu:hover { background: rgba(255,255,255,.16); }
.user-menu:focus-visible { outline: 2px solid var(--gold); }

.avatar {
  width: 32px; height: 32px; flex-shrink: 0;
  background: var(--gold); color: #1a0a0a;
  border-radius: var(--r-pill);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .88rem;
}
.username { font-weight: 600; font-size: .88rem; color: #fff; }

.dropdown {
  position: absolute; top: calc(100% + var(--sp-2)); right: 0;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-xl); box-shadow: var(--shadow-lg);
  min-width: 150px; overflow: hidden; z-index: 200;
}
.dropdown-item {
  display: flex; align-items: center; gap: var(--sp-2);
  width: 100%; padding: 11px var(--sp-4);
  font-size: .9rem; color: var(--text);
  background: none; border: none; cursor: pointer; text-align: left;
  transition: background .12s;
}
.dropdown-item:hover { background: var(--bg); }

/* ── Login btn ── */
.login-btn {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--hero-glass); color: #fff;
  border: 1.5px solid var(--hero-glass-border);
  border-radius: var(--r-md); padding: 7px var(--sp-4);
  font-size: .88rem; font-weight: 700; text-decoration: none;
  transition: background .15s;
}
.login-btn:hover { background: rgba(255,255,255,.26); }
.login-btn:focus-visible { outline: 2px solid var(--gold); }

/* ── Main content ── */
.main-content { flex: 1; width: 100%; max-width: var(--max-content); margin: 0 auto; }

/* ── Footer ── */
.app-footer { background: #180a0a; color: rgba(255,255,255,.5); padding: var(--sp-8) var(--sp-6); margin-top: var(--sp-12); }
.footer-inner {
  max-width: var(--max-body); margin: 0 auto; text-align: center;
  display: flex; flex-direction: column; gap: var(--sp-3);
}
.footer-brand { font-size: 1rem; font-weight: 800; color: #fff; }
.footer-links { display: flex; justify-content: center; gap: var(--sp-6); }
.footer-nav-link { color: rgba(255,255,255,.55); font-size: .84rem; font-weight: 600; transition: color .15s; }
.footer-nav-link:hover { color: var(--gold); }
.footer-meta { display: flex; gap: var(--sp-5); justify-content: center; flex-wrap: wrap; font-size: .83rem; align-items: center; }
.footer-link { display: flex; align-items: center; gap: var(--sp-1); color: inherit; }
.footer-link:hover { color: var(--gold); }
.footer-link strong { color: var(--gold); }
.footer-copy { font-size: .75rem; opacity: .45; }

/* ── Responsive ── */
@media (max-width: 860px) { .install-label { display: none; } }
@media (max-width: 640px) {
  .navbar { padding: 0 var(--sp-4); height: 56px; }
  .username, .brand-en { display: none; }
  .nav-label, .login-label { display: none; }
  .nav-link { padding: 7px var(--sp-2); }
  .footer-meta { gap: var(--sp-3); font-size: .78rem; }
}
@media (max-width: 380px) {
  .brand-ar { font-size: .78rem; }
  .brand-logo { width: 34px; height: 34px; font-size: 1.1rem; }
}
</style>
