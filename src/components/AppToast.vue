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
          <AppIcon :name="iconMap[t.type]" :size="18" aria-hidden="true" />
          <span class="toast-msg">{{ t.message }}</span>
          <button class="toast-close icon-btn" @click.stop="store.dismiss(t.id)" aria-label="Dismiss notification">
            <AppIcon name="x" :size="14" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToastStore } from '../stores/toastStore'
import AppIcon from './AppIcon.vue'

const store   = useToastStore()
const iconMap = { success: 'check-circle', error: 'alert-circle', info: 'info', warning: 'alert-circle' }
</script>

<style scoped>
.toast-container {
  position: fixed; bottom: var(--sp-6); right: var(--sp-6);
  z-index: 9999; display: flex; flex-direction: column;
  gap: var(--sp-2); pointer-events: none;
  max-width: min(360px, calc(100vw - var(--sp-8)));
}

.toast {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-lg);
  font-size: .88rem; font-weight: 500;
  cursor: pointer; pointer-events: all; color: #fff;
  word-break: break-word;
}
.toast--success { background: var(--success); }
.toast--error   { background: var(--error);   }
.toast--info    { background: var(--info);     }
.toast--warning { background: var(--warning);  color: #1a0a0a; }

.toast-msg { flex: 1; line-height: 1.4; }

.toast-close { color: inherit; opacity: .75; }
.toast-close:hover { opacity: 1; background: rgba(255,255,255,.2); }

.toast-enter-active, .toast-leave-active { transition: all .28s ease; }
.toast-enter-from { transform: translateX(110%); opacity: 0; }
.toast-leave-to   { transform: translateX(110%); opacity: 0; }

@media (max-width: 480px) {
  .toast-container { bottom: var(--sp-4); right: var(--sp-4); left: var(--sp-4); max-width: none; }
}
</style>
