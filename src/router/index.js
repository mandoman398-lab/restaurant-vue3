import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  /* ── Public routes — no login required ── */
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true, title: 'Sign In' }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUpView.vue'),
    meta: { requiresGuest: true, title: 'Create Account' }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'All Branches' }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/MenuView.vue'),
    meta: { title: 'Our Menu' }
  },
  {
    path: '/restaurant/:id',
    name: 'RestaurantDetail',
    component: () => import('../views/RestaurantDetailView.vue'),
    meta: { title: 'Branch Details' }
  },

  /* ── Admin routes — login required ── */
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/AddRestaurantView.vue'),
    meta: { requiresAuth: true, title: 'Add Branch' }
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: () => import('../views/EditRestaurantView.vue'),
    meta: { requiresAuth: true, title: 'Edit Branch' }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  /* Protected admin routes → redirect to login with return path */
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  /* Already logged in → skip login/signup */
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return { name: 'Home' }
  }
})

router.afterEach((to) => {
  const base = 'كشري أبو طارق | Koshary Abou Tarek'
  document.title = to.meta.title ? `${to.meta.title} – ${base}` : base
})

export default router
