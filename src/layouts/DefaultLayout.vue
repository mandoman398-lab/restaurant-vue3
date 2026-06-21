<template>
  <div class="app-shell" :class="{ rtl: isAR, ltr: !isAR }">
    <a href="#main-content" class="skip-link">{{ t('تخطى إلى المحتوى', 'Skip to content') }}</a>

    <!-- ══ NAVBAR ══ -->
    <header class="navbar" role="banner">
      <div class="navbar-inner">

        <!-- Logo — start side (right in AR, left in EN) -->
        <router-link to="/" class="navbar-logo" :aria-label="t('كشري أبو طارق – الرئيسية', 'Koshary Abou Tarek – Home')">
          <img src="/apple-touch-icon.png" :alt="t('شعار كشري أبو طارق', 'Koshary Abou Tarek logo')" class="logo-img" />
        </router-link>

        <!-- Centre nav links -->
        <nav class="navbar-links" :aria-label="t('التنقل الرئيسي', 'Main navigation')">
          <router-link to="/" class="nav-link" exact-active-class="nav-active">
            {{ t('الرئيسية', 'Home') }}
          </router-link>
          <router-link to="/menu" class="nav-link" active-class="nav-active">
            {{ t('القائمة', 'Menu') }}
          </router-link>
          <router-link to="/" class="nav-link">
            {{ t('الفروع', 'Branches') }}
          </router-link>
          <router-link v-if="auth.isAuthenticated" to="/add" class="nav-link" active-class="nav-active">
            {{ t('إضافة فرع', 'Add Branch') }}
          </router-link>
        </nav>

        <!-- End side: actions + phone (left in AR, right in EN) -->
        <div class="navbar-end">
          <!-- Language toggle -->
          <button class="lang-toggle" @click="toggle" :aria-label="t('التبديل إلى الإنجليزية', 'Switch to Arabic')">
            {{ isAR ? 'EN' : 'عر' }}
          </button>

          <!-- Dark mode -->
          <button
            class="icon-btn dark-btn"
            @click="toggleDark"
            :aria-label="dark ? t('الوضع الفاتح', 'Light mode') : t('الوضع الداكن', 'Dark mode')"
          >
            <AppIcon :name="dark ? 'sun' : 'moon'" :size="17" color="rgba(255,255,255,.8)" />
          </button>

          <!-- Auth -->
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
            <div class="avatar">{{ initial }}</div>
            <AppIcon name="chevron-down" :size="13" color="rgba(255,255,255,.6)" />
            <div class="dropdown" v-if="menuOpen" role="menu">
              <button class="dropdown-item" role="menuitem" @click="doLogout">
                <AppIcon name="log-out" :size="15" />
                {{ t('تسجيل الخروج', 'Log out') }}
              </button>
            </div>
          </div>

          <router-link v-else to="/login" class="login-btn">
            <AppIcon name="log-in" :size="16" />
            <span>{{ t('دخول', 'Sign in') }}</span>
          </router-link>

          <!-- Phone — end side -->
          <a href="tel:16011" class="navbar-phone" aria-label="Hotline 16011">
            <span class="phone-icon">📞</span>
            <span class="phone-num">16011</span>
          </a>
        </div>

      </div>
    </header>

    <!-- ══ MAIN ══ -->
    <main class="main-content" id="main-content">
      <slot />
    </main>

    <!-- ══ FOOTER ══ -->
    <footer class="app-footer" role="contentinfo">
      <div class="footer-overlay"></div>
      <div class="footer-inner">

        <!-- Logo -->
        <div class="footer-logo-wrap">
          <img src="/apple-touch-icon.png" alt="Koshary Abou Tarek" class="footer-logo-img" />
        </div>

        <!-- Columns -->
        <div class="footer-cols">

          <!-- About -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('تعرف علينا', 'About Us') }}</h3>
            <ul class="footer-col-links">
              <li><router-link to="/" class="footer-link">{{ t('الرئيسية', 'Home') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('من نحن', 'About') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('الأخبار', 'News') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('تواصل معنا', 'Contact') }}</router-link></li>
            </ul>
          </div>

          <!-- Menu categories -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('أصناف', 'Menu') }}</h3>
            <ul class="footer-col-links">
              <li><router-link to="/menu" class="footer-link">{{ t('كشري', 'Koshary') }}</router-link></li>
              <li><router-link to="/menu" class="footer-link">{{ t('شوربة', 'Soup') }}</router-link></li>
              <li><router-link to="/menu" class="footer-link">{{ t('حلويات', 'Desserts') }}</router-link></li>
              <li><router-link to="/menu" class="footer-link">{{ t('مشروبات', 'Drinks') }}</router-link></li>
              <li><router-link to="/menu" class="footer-link">{{ t('إضافات', 'Add-ons') }}</router-link></li>
            </ul>
          </div>

          <!-- Branches -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('الفروع', 'Branches') }}</h3>
            <ul class="footer-col-links">
              <li><router-link to="/" class="footer-link">{{ t('مصر', 'Egypt') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('الإمارات العربية المتحدة', 'UAE') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('المملكة العربية السعودية', 'Saudi Arabia') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('فرع أبحر الشمالية', 'Abhur Al Shamaliyah') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('فرع شارع الأمير سلطان', 'Prince Sultan St.') }}</router-link></li>
              <li><router-link to="/" class="footer-link">{{ t('فرع مكة', 'Makkah') }}</router-link></li>
            </ul>
          </div>

          <!-- Follow us -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('تابعونا', 'Follow Us') }}</h3>
            <div class="footer-socials">
              <a href="https://www.instagram.com/koshariabotarek" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/kosharyabotarek" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@koshariaboutarek" target="_blank" rel="noopener" class="social-btn" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.youtube.com/@koshari_apo_tareq" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
            </div>
            <div class="footer-hotline">
              <a href="tel:16011" class="hotline-link">
                📞 <strong>16011</strong>
              </a>
              <span class="hotline-hours">{{ t('يومياً ٧ ص – ١٠ م', 'Daily 7 AM – 10 PM') }}</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-badges">
            <span class="guinness-badge">🏆 {{ t('موسوعة غينيس للأرقام القياسية', 'Guinness World Records') }}</span>
            <span class="tasteatlas-badge">⭐ {{ t('أفضل ١٠٠ مطعم – TasteAtlas', 'Top 100 Legendary – TasteAtlas') }}</span>
          </div>
          <p class="footer-copy">© {{ new Date().getFullYear() }} {{ t('كشري أبو طارق. جميع الحقوق محفوظة.', 'Koshary Abou Tarek. All rights reserved.') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useDarkMode } from '../composables/useDarkMode'
import { useLanguage } from '../composables/useLanguage'
import AppIcon from '../components/AppIcon.vue'

const auth    = useAuthStore()
const router  = useRouter()
const { dark, toggle: toggleDark } = useDarkMode()
const { isAR, toggle, t } = useLanguage()

const menuOpen   = ref(false)
const userMenuEl = ref(null)
const initial    = computed(() => auth.userName?.charAt(0)?.toUpperCase() || '?')

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
/* ── Shell ── */
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }

/* ── Skip link ── */
.skip-link {
  position: absolute; top: -100px; inset-inline-start: var(--sp-4);
  background: var(--gold); color: #1a0a0a;
  padding: var(--sp-2) var(--sp-4); border-radius: 0 0 var(--r-md) var(--r-md);
  font-weight: 700; font-size: .9rem; z-index: 9999; transition: top .15s;
}
.skip-link:focus { top: 0; }

/* ══ NAVBAR ══ */
.navbar {
  position: sticky; top: 0; z-index: 200;
  background: #0d0d0d;
  border-bottom: 1px solid rgba(255,255,255,.06);
  box-shadow: 0 2px 20px rgba(0,0,0,.5);
}
.navbar-inner {
  max-width: 1300px; margin: 0 auto;
  display: flex; align-items: center;
  padding: 0 var(--sp-6); height: 66px;
  gap: var(--sp-4);
  /* RTL: phone left, logo right */
  flex-direction: row;
}

/* Phone */
.navbar-phone {
  display: flex; align-items: center; gap: 6px;
  color: rgba(255,255,255,.75); text-decoration: none;
  font-size: .9rem; font-weight: 600;
  transition: color .15s; white-space: nowrap;
  flex-shrink: 0;
}
.navbar-phone:hover { color: var(--gold); }
.phone-icon { font-size: 1rem; }
.phone-num  { font-size: 1rem; font-weight: 800; letter-spacing: .04em; }

/* Nav links */
.navbar-links {
  display: flex; align-items: center; gap: var(--sp-1);
  flex: 1; justify-content: center;
}
.nav-link {
  padding: 7px var(--sp-4); border-radius: var(--r-md);
  color: rgba(255,255,255,.72); font-weight: 600; font-size: .92rem;
  text-decoration: none; transition: all .15s; white-space: nowrap;
}
.nav-link:hover { color: #fff; background: rgba(255,255,255,.1); }
.nav-active,
.nav-link.router-link-active { color: var(--gold) !important; }
.nav-link:focus-visible { outline: 2px solid var(--gold); }

/* Right cluster */
.navbar-end {
  display: flex; align-items: center; gap: var(--sp-2); flex-shrink: 0;
}

/* Language toggle */
.lang-toggle {
  background: rgba(255,255,255,.1); color: #fff;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: var(--r-md);
  padding: 5px 14px; font-size: .82rem; font-weight: 700;
  cursor: pointer; transition: all .15s;
  font-family: 'Cairo', sans-serif;
  letter-spacing: .04em;
}
.lang-toggle:hover { background: rgba(255,255,255,.2); border-color: var(--gold); color: var(--gold); }
.lang-toggle:focus-visible { outline: 2px solid var(--gold); }

/* Dark btn */
.dark-btn {
  width: 36px; height: 36px; border-radius: var(--r-pill);
  background: rgba(255,255,255,.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: background .15s;
}
.dark-btn:hover { background: rgba(255,255,255,.18); }

/* Login btn */
.login-btn {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--primary); color: #fff;
  border: 1.5px solid var(--primary);
  border-radius: var(--r-md); padding: 6px var(--sp-4);
  font-size: .85rem; font-weight: 700; text-decoration: none;
  transition: all .15s;
}
.login-btn:hover { background: var(--primary-dark); }
.login-btn:focus-visible { outline: 2px solid var(--gold); }

/* User menu */
.user-menu {
  display: flex; align-items: center; gap: var(--sp-2);
  cursor: pointer; padding: 5px var(--sp-2); border-radius: var(--r-md);
  position: relative; user-select: none; transition: background .15s;
}
.user-menu:hover { background: rgba(255,255,255,.1); }
.avatar {
  width: 32px; height: 32px; flex-shrink: 0;
  background: var(--gold); color: #1a0a0a;
  border-radius: var(--r-pill);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .88rem;
}
.dropdown {
  position: absolute; top: calc(100% + 8px);
  inset-inline-end: 0;
  background: #1a1a1a; border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--r-xl); box-shadow: 0 8px 30px rgba(0,0,0,.5);
  min-width: 160px; overflow: hidden; z-index: 300;
}
.dropdown-item {
  display: flex; align-items: center; gap: var(--sp-2);
  width: 100%; padding: 11px var(--sp-4);
  font-size: .9rem; color: rgba(255,255,255,.8);
  background: none; border: none; cursor: pointer;
  transition: background .12s;
}
.dropdown-item:hover { background: rgba(255,255,255,.08); color: #fff; }

/* Brand logo */
.navbar-logo { display: flex; align-items: center; flex-shrink: 0; }
.logo-img {
  width: 48px; height: 48px; border-radius: var(--r-pill);
  object-fit: cover;
  border: 2px solid rgba(255,255,255,.15);
  transition: border-color .15s;
}
.navbar-logo:hover .logo-img { border-color: var(--gold); }

/* ══ MAIN ══ */
.main-content { flex: 1; width: 100%; max-width: var(--max-content); margin: 0 auto; }

/* ══ FOOTER ══ */
.app-footer {
  position: relative; overflow: hidden;
  background: #0d0d0d;
  margin-top: var(--sp-12);
  color: rgba(255,255,255,.65);
}
.footer-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(200,16,46,.12) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(245,166,35,.08) 0%, transparent 60%);
}
.footer-inner {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: var(--sp-12) var(--sp-8) var(--sp-8);
  display: flex; flex-direction: column; gap: var(--sp-10);
}

/* Logo */
.footer-logo-wrap { display: flex; justify-content: center; }
.footer-logo-img {
  width: 80px; height: 80px; border-radius: var(--r-pill);
  object-fit: cover; border: 2px solid rgba(255,255,255,.15);
  filter: drop-shadow(0 0 20px rgba(245,166,35,.3));
}

/* Columns */
.footer-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-8);
}
.footer-col-title {
  font-size: .9rem; font-weight: 800; color: #fff;
  margin-bottom: var(--sp-4); letter-spacing: .02em;
  position: relative; padding-bottom: var(--sp-3);
}
.footer-col-title::after {
  content: ''; position: absolute; bottom: 0;
  inset-inline-start: 0; width: 28px; height: 2px;
  background: var(--primary);
}
.footer-col-links {
  list-style: none; display: flex; flex-direction: column; gap: var(--sp-2);
}
.footer-link {
  color: rgba(255,255,255,.5); font-size: .85rem; text-decoration: none;
  transition: color .15s;
}
.footer-link:hover { color: var(--gold); }

/* Socials */
.footer-socials {
  display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-4);
}
.social-btn {
  width: 38px; height: 38px; border-radius: var(--r-pill);
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
  color: rgba(255,255,255,.65);
  display: flex; align-items: center; justify-content: center;
  transition: all .15s; text-decoration: none;
}
.social-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

/* Hotline in footer */
.footer-hotline { display: flex; flex-direction: column; gap: 4px; }
.hotline-link {
  color: rgba(255,255,255,.75); text-decoration: none;
  font-size: 1rem; font-weight: 700; transition: color .15s;
}
.hotline-link:hover { color: var(--gold); }
.hotline-link strong { color: var(--gold); }
.hotline-hours { font-size: .78rem; color: rgba(255,255,255,.4); }

/* Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.08);
  padding-top: var(--sp-6);
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-3);
  text-align: center;
}
.footer-badges { display: flex; gap: var(--sp-4); flex-wrap: wrap; justify-content: center; }
.guinness-badge,
.tasteatlas-badge {
  font-size: .75rem; color: rgba(255,255,255,.45);
  background: rgba(255,255,255,.05);
  padding: 5px 12px; border-radius: var(--r-pill);
  border: 1px solid rgba(255,255,255,.08);
}
.footer-copy { font-size: .75rem; color: rgba(255,255,255,.3); }

/* ── RTL: logo is on right (start), phone on left (end) — browser handles this via dir=rtl */
/* ── LTR: logo is on left (start), phone on right (end) — browser handles this via dir=ltr */

/* ── Responsive ── */
@media (max-width: 1024px) {
  .footer-cols { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
  .navbar-links { gap: 0; }
  .nav-link { padding: 7px var(--sp-2); font-size: .82rem; }
}
@media (max-width: 640px) {
  .navbar-inner { padding: 0 var(--sp-3); height: 58px; }
  .phone-num { display: none; }
  .navbar-links { display: none; }
  .footer-cols { grid-template-columns: 1fr 1fr; gap: var(--sp-6); }
  .footer-inner { padding: var(--sp-8) var(--sp-4) var(--sp-6); }
}
@media (max-width: 400px) {
  .footer-cols { grid-template-columns: 1fr; }
}
</style>
