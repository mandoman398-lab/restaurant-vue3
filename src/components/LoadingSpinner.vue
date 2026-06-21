<template>
  <div class="spinner-wrap" :class="{ 'spinner-full': full }">
    <div class="spinner" :style="{ width: size + 'px', height: size + 'px' }"></div>
    <p v-if="label" class="spinner-label">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 40 },
  full: { type: Boolean, default: false },
  label: { type: String, default: '' }
})
</script>

<style scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 12px;
}
.spinner-full {
  min-height: 300px;
}
.spinner {
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.spinner-label {
  color: var(--text-muted);
  font-size: .9rem;
  margin: 0;
}
</style>
