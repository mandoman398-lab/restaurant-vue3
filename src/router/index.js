import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  /* ── Public ── */
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LandingView.vue'),
    meta: { title: 'إمبراطورية أبو طارق' }
  },
  {
    path: '/branches',
    name: 'Branches',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'الفروع' }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/MenuView.vue'),
    meta: { title: 'القائمة' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'من نحن' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/NewsView.vue'),
    meta: { title: 'الأخبار' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'تواصل معنا' }
  },
  {
    path: '/restaurant/:id',
    name: 'RestaurantDetail',
    component: () => import('../views/RestaurantDetailView.vue'),
    meta: { title: 'تفاصيل الفرع' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true, title: 'تسجيل الدخول' }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUpView.vue'),
    meta: { requiresGuest: true, title: 'إنشاء حساب' }
  },

  /* ── Admin ── */
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/AddRestaurantView.vue'),
    meta: { requiresAuth: true, title: 'إضافة فرع' }
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: () => import('../views/EditRestaurantView.vue'),
    meta: { requiresAuth: true, title: 'تعديل الفرع' }
  },

  /* ── 404 ── */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'الصفحة غير موجودة' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, saved) => saved || { top: 0, behavior: 'smooth' }
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return { name: 'Home' }
  }
})

router.afterEach((to) => {
  const base = 'كشري أبو طارق | Koshary Abou Tarek'
  document.title = to.meta.title ? `${to.meta.title} – ${base}` : base
})

export default router
