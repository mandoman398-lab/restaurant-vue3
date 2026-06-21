<template>
  <AuthLayout>
    <h2 class="auth-title">Welcome back</h2>
    <p class="auth-sub">Sign in to manage Koshary Abou Tarek branches</p>

    <div class="demo-hint">
      <span class="hint-label">Demo credentials</span>
      <code @click="fillDemo" class="hint-code" title="Click to fill">
        admin@aboutarek.com / admin123
      </code>
    </div>

    <form @submit.prevent="handleLogin" class="auth-form" novalidate>
      <div class="form-field">
        <label class="form-label" for="login-email">Email</label>
        <input
          id="login-email"
          class="form-input"
          :class="{ 'has-error': submitFailed && !email }"
          v-model="email"
          type="email"
          placeholder="you@example.com"
          required
          autocomplete="email"
        />
      </div>
      <div class="form-field">
        <label class="form-label" for="login-password">Password</label>
        <input
          id="login-password"
          class="form-input"
          :class="{ 'has-error': submitFailed && !password }"
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
          autocomplete="current-password"
        />
      </div>

      <p v-if="auth.error" class="form-error-msg" role="alert">{{ auth.error }}</p>

      <button type="submit" class="btn btn-primary btn-full" :disabled="auth.loading">
        <span v-if="auth.loading" class="spinner" aria-hidden="true"></span>
        {{ auth.loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <p class="auth-link">
      <router-link to="/" class="subtle-link">← Back to branches</router-link>
    </p>
    <p class="auth-link">No account? <router-link to="/sign-up">Create one</router-link></p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/authStore'
import { useToast } from '../composables/useToast'

const auth = useAuthStore()
const router = useRouter()
const route  = useRoute()
const toast  = useToast()

const email       = ref('')
const password    = ref('')
const submitFailed = ref(false)

function fillDemo() {
  email.value    = 'admin@aboutarek.com'
  password.value = 'admin123'
}

async function handleLogin() {
  submitFailed.value = false
  if (!email.value || !password.value) { submitFailed.value = true; return }
  const ok = await auth.login(email.value, password.value)
  if (ok) {
    toast.success(`Welcome back, ${auth.userName}!`)
    router.push(route.query.redirect || '/')
  }
}
</script>

<style scoped>
.auth-title { margin: 0 0 var(--sp-1); font-size: 1.5rem; font-weight: 800; color: var(--text); }
.auth-sub   { margin: 0 0 var(--sp-5); color: var(--text-muted); font-size: .9rem; }

.demo-hint {
  background: var(--gold-light); border: 1px solid rgba(245,166,35,.3);
  border-radius: var(--r-lg); padding: 11px var(--sp-4); margin-bottom: var(--sp-5);
  display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap;
}
.hint-label { font-size: .72rem; font-weight: 700; color: var(--gold-text); text-transform: uppercase; letter-spacing: .05em; }
.hint-code {
  font-size: .82rem; background: rgba(245,166,35,.15); padding: 4px var(--sp-3);
  border-radius: var(--r-sm); color: #7a4f00; font-family: monospace; cursor: pointer; transition: background .15s;
}
.hint-code:hover { background: rgba(245,166,35,.3); }

.auth-form { display: flex; flex-direction: column; gap: var(--sp-4); }

.auth-link { margin-top: var(--sp-4); text-align: center; font-size: .9rem; color: var(--text-muted); }
.auth-link a { color: var(--primary); font-weight: 600; }
.auth-link a:hover { text-decoration: underline; }
.subtle-link { color: var(--text-muted) !important; font-weight: 500 !important; font-size: .85rem; }

/* Spinner from global — just needs border override for size */
.spinner { border-width: 2px; width: 16px; height: 16px; }
</style>
