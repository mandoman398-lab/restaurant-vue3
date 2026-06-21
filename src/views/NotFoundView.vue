<template>
  <div class="notfound">
    <div class="notfound-icon">🍽️</div>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="btn-primary">← Go Home</router-link>
  </div>
</template>

<style scoped>
.notfound {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: var(--bg);
  color: var(--text);
}
.notfound-icon { font-size: 5rem; margin-bottom: 16px; }
h1 { font-size: 5rem; font-weight: 900; color: var(--primary); margin: 0; line-height: 1; }
h2 { font-size: 1.5rem; font-weight: 700; margin: 12px 0 8px; }
p { color: var(--text-muted); margin: 0 0 28px; font-size: .95rem; }
.btn-primary { padding: 12px 28px; background: var(--primary); color: #fff; border: none; border-radius: 10px; font-size: .95rem; font-weight: 700; cursor: pointer; text-decoration: none; }
.btn-primary:hover { opacity: .88; }
</style>
