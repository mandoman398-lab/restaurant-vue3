<template>
  <div v-if="mode === 'grid'" class="skeleton-grid" aria-busy="true" aria-label="Loading branches…">
    <div v-for="n in count" :key="n" class="card sk-card">
      <div class="sk-row">
        <span class="shimmer" style="width:72px;height:22px;border-radius:var(--r-pill)"></span>
        <span class="shimmer" style="width:22px;height:22px;border-radius:var(--r-pill)"></span>
      </div>
      <div style="display:flex;flex-direction:column;gap:var(--sp-2)">
        <span class="shimmer" style="width:78%;height:15px"></span>
        <span class="shimmer" style="width:54%;height:12px"></span>
      </div>
      <div class="sk-details">
        <div v-for="d in 3" :key="d" class="sk-row" style="gap:var(--sp-2)">
          <span class="shimmer" style="width:16px;height:13px;flex-shrink:0"></span>
          <span class="shimmer" :style="`width:${58 + d * 8}%;height:12px`"></span>
        </div>
      </div>
      <div class="sk-row" style="gap:var(--sp-2)">
        <span class="shimmer" style="flex:1;height:30px;border-radius:var(--r-lg)"></span>
        <span class="shimmer" style="flex:1;height:30px;border-radius:var(--r-lg)"></span>
      </div>
    </div>
  </div>

  <div v-else class="sk-table" aria-busy="true" aria-label="Loading branches…">
    <div class="sk-table-head">
      <span v-for="w in ['28%','12%','15%','20%','5%','15%']" :key="w"
        class="shimmer" :style="`width:${w};height:12px`"></span>
    </div>
    <div v-for="n in count" :key="n" class="sk-table-row">
      <div style="width:28%;display:flex;flex-direction:column;gap:var(--sp-1)">
        <span class="shimmer" style="width:88%;height:13px"></span>
        <span class="shimmer" style="width:50%;height:10px;border-radius:var(--r-pill)"></span>
      </div>
      <span v-for="w in ['12%','15%','20%','5%']" :key="w" class="shimmer" :style="`width:${w};height:12px`"></span>
      <div style="width:15%;display:flex;gap:var(--sp-2)">
        <span class="shimmer" style="flex:1;height:26px;border-radius:var(--r-md)"></span>
        <span class="shimmer" style="flex:1;height:26px;border-radius:var(--r-md)"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mode:  { type: String, default: 'grid' },
  count: { type: Number, default: 6 }
})
</script>

<style scoped>
@keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; } }

.skeleton-grid {
  display: grid;
  grid-template-columns: var(--grid-cards);
  gap: var(--sp-4);
}

.sk-card {
  padding: var(--sp-5);
  display: flex; flex-direction: column; gap: var(--sp-4);
  animation: fadeIn .35s ease;
}

.sk-row { display: flex; align-items: center; justify-content: space-between; }

.sk-details {
  display: flex; flex-direction: column; gap: var(--sp-2);
  background: var(--bg); border-radius: var(--r-lg); padding: var(--sp-3);
}
.sk-details .sk-row { justify-content: flex-start; }

.sk-table {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-2xl); overflow: hidden;
}
.sk-table-head {
  display: flex; gap: var(--sp-3); align-items: center;
  padding: var(--sp-3) var(--sp-5);
  background: var(--bg); border-bottom: 1px solid var(--border);
}
.sk-table-row {
  display: flex; gap: var(--sp-3); align-items: center;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
  animation: fadeIn .35s ease;
}
.sk-table-row:last-child { border-bottom: none; }

@media (max-width: 640px) {
  .skeleton-grid { grid-template-columns: 1fr; }
  .sk-table { display: none; }
}
</style>
