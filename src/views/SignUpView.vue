<template>
  <AuthLayout>
    <h2 class="auth-title">Create an account</h2>
    <p class="auth-sub">Manage Koshary Abou Tarek branch listings</p>

    <form @submit.prevent="handleSignUp" class="auth-form">
      <div class="form-field">
        <label class="form-label">Name</label>
        <input class="form-input" v-model="name" type="text" placeholder="Your name" required autocomplete="name" />
      </div>
      <div class="form-field">
        <label class="form-label">Email</label>
        <input class="form-input" v-model="email" type="email" placeholder="you@example.com" required autocomplete="email" />
      </div>
      <div class="form-field">
        <label class="form-label">Password</label>
        <input class="form-input" v-model="password" type="password" placeholder="••••••••" required autocomplete="new-password" minlength="4" />
      </div>

      <p v-if="auth.error" class="form-error-msg" role="alert">{{ auth.error }}</p>

      <button type="submit" class="btn btn-primary btn-full" :disabled="auth.loading">
        <span v-if="auth.loading" class="spinner" aria-hidden="true"></span>
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

const auth   = useAuthStore()
const router = useRouter()
const toast  = useToast()

const name     = ref('')
const email    = ref('')
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
.auth-title { margin: 0 0 var(--sp-1); font-size: 1.5rem; font-weight: 800; color: var(--text); }
.auth-sub   { margin: 0 0 var(--sp-6); color: var(--text-muted); font-size: .9rem; }
.auth-form  { display: flex; flex-direction: column; gap: var(--sp-4); }
.auth-link  { margin-top: var(--sp-5); text-align: center; font-size: .9rem; color: var(--text-muted); }
.auth-link a { color: var(--primary); font-weight: 600; }
.auth-link a:hover { text-decoration: underline; }
.subtle-link { color: var(--text-muted) !important; font-weight: 500 !important; font-size: .85rem; }
.spinner { border-width: 2px; width: 16px; height: 16px; }
</style>
