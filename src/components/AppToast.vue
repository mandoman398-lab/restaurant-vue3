<template>
  <Teleport to="body">
    <div class="toast-container" role="region" aria-label="Notifications" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="t in store.toasts"
          :key="t.id"
          :class="['toast', `toast--${t.type}`]"
          role="alert"
          @click="store.dismiss(t.id)"
        >
          <span class="toast-icon" aria-hidden="true">{{ icons[t.type] }}</span>
          <span class="toast-msg">{{ t.message }}</span>
          <button class="toast-close" @click.stop="store.dismiss(t.id)" aria-label="Dismiss notification">✕</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToastStore } from '../stores/toastStore'
const store = useToastStore()
const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  max-width: min(360px, calc(100vw - 32px));
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,.18);
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  pointer-events: all;
  color: #fff;
  word-break: break-word;
}
.toast--success { background: #10b981; }
.toast--error   { background: #ef4444; }
.toast--info    { background: #6366f1; }
.toast--warning { background: #f59e0b; color: #1a0a0a; }
.toast-msg { flex: 1; }
.toast-close {
  background: none; border: none; color: inherit;
  cursor: pointer; opacity: .7; font-size: .8rem; padding: 0 2px;
  flex-shrink: 0;
}
.toast-close:hover { opacity: 1; }

.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from { transform: translateX(110%); opacity: 0; }
.toast-leave-to   { transform: translateX(110%); opacity: 0; }

@media (max-width: 480px) {
  .toast-container { bottom: 16px; right: 16px; left: 16px; max-width: none; }
}
</style>
