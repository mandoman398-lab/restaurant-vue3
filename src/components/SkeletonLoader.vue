<template>
  <div class="skeleton-grid">
    <div v-for="n in count" :key="n" class="skeleton-card">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({ count: { type: Number, default: 6 } })
</script>

<style scoped>
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.skeleton-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skeleton-line {
  height: 14px;
  background: var(--skeleton);
  border-radius: 6px;
  animation: shimmer 1.4s ease infinite;
}
.skeleton-line.title { height: 20px; width: 60%; }
.skeleton-line.short { width: 40%; }
@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
}
</style>
