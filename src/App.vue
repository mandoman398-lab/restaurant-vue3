<template>
  <router-view />
  <AppToast />
</template>

<script setup>
import AppToast from './components/AppToast.vue'
</script>

<style>
:root {
  --primary: #C8102E;
  --primary-dark: #a00d24;
  --primary-light: #fff0f2;
  --gold: #F5A623;
  --gold-light: #fff8ec;
  --bg: #f8f5f5;
  --surface: #ffffff;
  --border: #ede0e0;
  --text: #1a0a0a;
  --text-muted: #7a5a5a;
  --skeleton: #f0e0e0;
}

[data-theme="dark"] {
  --primary: #e84060;
  --primary-dark: #ff6080;
  --primary-light: #2d1015;
  --gold: #F5A623;
  --gold-light: #2d2210;
  --bg: #120808;
  --surface: #1e0e0e;
  --border: #3d2020;
  --text: #fdf0f0;
  --text-muted: #c49898;
  --skeleton: #3d2020;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  transition: background .25s, color .25s;
}

a { color: inherit; }
input, button, textarea, select { font-family: inherit; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
</style>
