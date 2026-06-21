<template>
  <AuthLayout>
    <h2 class="auth-title">Welcome back 👋</h2>
    <p class="auth-sub">Sign in to manage Koshary Abou Tarek branches</p>

    <div class="demo-hint">
      <span class="hint-label">Demo credentials</span>
      <code>admin@aboutarek.com</code>
      <code>admin123</code>
    </div>

    <form @submit.prevent="handleLogin" class="auth-form">
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" required autocomplete="email" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" required autocomplete="current-password" />
      </div>

      <p v-if="auth.error" class="form-error">{{ auth.error }}</p>

      <button type="submit" class="btn-primary" :disabled="auth.loading">
        <span v-if="auth.loading" class="btn-spinner"></span>
        {{ auth.loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <p class="auth-link">No account? <router-link to="/sign-up">Create one</router-link></p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/authStore'
import { useToast } from '../composables/useToast'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')

async function handleLogin() {
  const ok = await auth.login(email.value, password.value)
  if (ok) {
    toast.success(`Welcome back, ${auth.userName}!`)
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.auth-title { margin: 0 0 4px; font-size: 1.6rem; font-weight: 800; color: var(--text); }
.auth-sub { margin: 0 0 20px; color: var(--text-muted); font-size: .9rem; }

.demo-hint {
  background: var(--gold-light);
  border: 1px solid rgba(245,166,35,.3);
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.hint-label { font-size: .75rem; font-weight: 700; color: #b37400; text-transform: uppercase; letter-spacing: .05em; flex-basis: 100%; }
.demo-hint code { font-size: .82rem; background: rgba(245,166,35,.15); padding: 2px 8px; border-radius: 6px; color: #7a4f00; font-family: monospace; }

.auth-form { display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: .85rem; font-weight: 600; color: var(--text); }
.field input {
  padding: 11px 14px; border: 1.5px solid var(--border); border-radius: 10px;
  background: var(--bg); color: var(--text); font-size: .95rem; transition: border-color .15s;
}
.field input:focus { outline: none; border-color: var(--primary); }
.form-error { color: #ef4444; font-size: .85rem; margin: 0; }
.btn-primary {
  padding: 12px; background: var(--primary); color: #fff; border: none; border-radius: 10px;
  font-size: .95rem; font-weight: 700; cursor: pointer; display: flex; align-items: center;
  justify-content: center; gap: 8px; transition: opacity .15s;
}
.btn-primary:hover:not(:disabled) { opacity: .88; }
.btn-primary:disabled { opacity: .6; cursor: not-allowed; }
.btn-spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
  border-radius: 50%; animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.auth-link { margin-top: 20px; text-align: center; font-size: .9rem; color: var(--text-muted); }
.auth-link a { color: var(--primary); font-weight: 600; text-decoration: none; }
.auth-link a:hover { text-decoration: underline; }
</style>
