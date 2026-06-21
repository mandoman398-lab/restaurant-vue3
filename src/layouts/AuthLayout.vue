<template>
  <div class="auth-shell">
    <div class="auth-card">
      <div class="auth-brand">
        <div class="brand-logo">🍲</div>
        <div class="brand-text">
          <span class="brand-ar">كشري أبو طارق</span>
          <span class="brand-en">Koshary Abou Tarek</span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f0f0 0%, #fff5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
[data-theme="dark"] .auth-shell {
  background: linear-gradient(135deg, #120808 0%, #1e0e0e 100%);
}
.auth-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 44px 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 12px 48px rgba(200,16,46,.1);
}
.auth-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  text-decoration: none;
}
.brand-logo {
  width: 52px; height: 52px;
  background: var(--primary);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 4px 16px rgba(200,16,46,.3);
}
.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.brand-ar {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--primary);
  direction: rtl;
  line-height: 1;
}
.brand-en {
  font-size: .72rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: .04em;
  line-height: 1;
}
</style>
