<template>
  <AuthLayout>
    <h2 class="auth-title">Create an account 🚀</h2>
    <p class="auth-sub">Manage Koshary Abou Tarek branch listings</p>

    <form @submit.prevent="handleSignUp" class="auth-form">
      <div class="field">
        <label>Name</label>
        <input v-model="name" type="text" placeholder="Your name" required autocomplete="name" />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" required autocomplete="email" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" required autocomplete="new-password" minlength="4" />
      </div>

      <p v-if="auth.error" class="form-error">{{ auth.error }}</p>

      <button type="submit" class="btn-primary" :disabled="auth.loading">
        <span v-if="auth.loading" class="btn-spinner"></span>
        {{ auth.loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <p class="auth-link">
      <router-link to="/" class="subtle-link">← Back to branches</router-link>
    </p>
    <p class="auth-link">Already have an account? <router-link to="/login">Sign in</router-link></p>
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

const name = ref('')
const email = ref('')
const password = ref('')

async function handleSignUp() {
  const ok = await auth.register(name.value, email.value, password.value)
  if (ok) {
    toast.success(`Welcome, ${name.value}! Account created.`)
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.auth-title { margin: 0 0 4px; font-size: 1.6rem; font-weight: 800; color: var(--text); }
.auth-sub { margin: 0 0 28px; color: var(--text-muted); font-size: .9rem; }
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
.subtle-link { color: var(--text-muted) !important; font-weight: 500 !important; font-size: .85rem; }
</style>
