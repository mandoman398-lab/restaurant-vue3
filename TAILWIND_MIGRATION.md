# 🎨 Tailwind CSS Migration Guide

## Overview
Converting from massive inline/scoped CSS to clean Tailwind utilities.

---

## Step 1: Install Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
```

Files created:
- ✅ `tailwind.config.js` - All design tokens
- ✅ `postcss.config.js` - CSS processing
- ✅ `src/assets/styles/globals.css` - Global Tailwind setup

---

## Step 2: Update main.js

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import './assets/styles/globals.css'  // ← ADD THIS

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

---

## Step 3: Migrate Components

### Example 1: Button Component

**BEFORE (Inline CSS):**
```vue
<template>
  <button class="my-btn" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup>
defineProps({ label: String })
defineEmits(['click'])
</script>

<style scoped>
.my-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: #c81030;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.my-btn:hover {
  opacity: 0.9;
}

.my-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

**AFTER (Tailwind):**
```vue
<template>
  <button class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold border-none cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup>
defineProps({ label: String })
defineEmits(['click'])
</script>

<!-- No <style> block! -->
```

Or even better, use the @apply component:

```vue
<template>
  <button class="btn btn-primary" @click="onClick">
    {{ label }}
  </button>
</template>
```

The `btn` and `btn-primary` classes come from `globals.css` using @apply!

---

### Example 2: Card Component

**BEFORE:**
```vue
<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-desc">{{ description }}</p>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  border: 1.5px solid #e0e0e0;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.card-title {
  margin: 0 0 16px;
  font-size: 1.25rem;
  font-weight: bold;
  color: #1a1a1a;
}

.card-desc {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
</style>
```

**AFTER:**
```vue
<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <p class="text-neutral-600 text-sm">{{ description }}</p>
  </div>
</template>

<!-- No <style> block! -->
```

---

### Example 3: Hero Section

**BEFORE:**
```vue
<template>
  <section class="hero">
    <h1 class="hero-title">Welcome</h1>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1a0a0a 0%, #2d1015 100%);
  padding: 48px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('pattern.svg');
  opacity: 0.1;
  pointer-events: none;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero {
    padding: 24px 16px;
  }
  .hero-title {
    font-size: 2rem;
  }
}
</style>
```

**AFTER:**
```vue
<template>
  <section class="relative overflow-hidden bg-hero min-h-96 px-10 md:px-6 py-12 md:py-8 flex items-center justify-center">
    <!-- Pattern overlay -->
    <div class="absolute inset-0 bg-cover opacity-10 pointer-events-none" />
    
    <h1 class="relative z-10 text-6xl md:text-4xl font-black text-white leading-tight">
      Welcome
    </h1>
  </section>
</template>

<!-- No <style> block! -->
```

---

## Common Class Conversions

| Purpose | Before | After (Tailwind) |
|---------|--------|------------------|
| **Spacing** | `padding: 24px` | `p-6` |
| | `margin: 16px` | `m-4` |
| | `gap: 8px` | `gap-2` |
| **Colors** | `background: #c81030` | `bg-primary` |
| | `color: #666` | `text-neutral-500` |
| | `border: 1px solid #e0e0e0` | `border border-neutral-200` |
| **Typography** | `font-size: 24px` | `text-2xl` |
| | `font-weight: 700` | `font-bold` |
| | `line-height: 1.5` | `leading-relaxed` |
| **Layout** | `display: flex` | `flex` |
| | `justify-content: center` | `justify-center` |
| | `align-items: center` | `items-center` |
| | `flex-direction: column` | `flex-col` |
| **Borders** | `border-radius: 8px` | `rounded-lg` |
| | `border-radius: 16px` | `rounded-2xl` |
| **Shadows** | `box-shadow: 0 4px 8px rgba(0,0,0,0.1)` | `shadow-md` |
| | `box-shadow: 0 8px 24px rgba(0,0,0,0.12)` | `shadow-lg` |
| **Effects** | `opacity: 0.5` | `opacity-50` |
| | `transition: all .2s` | `transition-all duration-200` |
| **Responsive** | `@media (max-width: 640px)` | `sm:`, `md:`, `lg:`, etc. |

---

## Responsive Design Breakpoints

```javascript
// From tailwind.config.js
Breakpoint: Size
sm: 640px   →   sm:class
md: 768px   →   md:class
lg: 1024px  →   lg:class
xl: 1280px  →   xl:class
2xl: 1536px →   2xl:class
```

**Example:**
```vue
<!-- Full width on mobile, side-by-side on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Dark Mode

**Toggle dark mode:**
```vue
<button @click="toggleDark">
  {{ dark ? 'Light' : 'Dark' }}
</button>
```

**Use in components:**
```vue
<!-- Automatic dark mode -->
<div class="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
  Content adapts to light/dark mode
</div>
```

---

## Best Practices

### ✅ DO:

```vue
<!-- Short, readable Tailwind classes -->
<div class="flex items-center justify-between p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold">Title</h2>
  <button class="btn btn-primary">Action</button>
</div>

<!-- Group related classes -->
<div class="flex flex-col gap-4 p-6 md:p-8 dark:bg-neutral-900">
  <!-- Content -->
</div>

<!-- Use @apply for repeated patterns -->
<style>
  .section-header {
    @apply flex flex-col gap-2 mb-8;
  }
</style>
```

### ❌ DON'T:

```vue
<!-- Don't use style attribute -->
<div style="display: flex; justify-content: space-between;">
  <!-- Bad! -->
</div>

<!-- Don't use scoped CSS for utility-like styles -->
<style scoped>
  .box { display: flex; justify-content: center; }
</style>

<!-- Don't inline too many classes (extract to @apply) -->
<div class="flex items-center justify-center gap-4 p-6 bg-primary text-white rounded-lg font-semibold">
  <!-- Hard to read -->
</div>
```

---

## Custom Utilities

Add custom utilities in `globals.css`:

```css
@layer utilities {
  .flex-center {
    @apply flex items-center justify-center;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent;
  }

  .card-hover {
    @apply transition-shadow hover:shadow-lg;
  }
}
```

Then use:
```vue
<div class="flex-center gap-4">Centered content</div>
<h2 class="gradient-text">Gradient Text</h2>
```

---

## Migration Checklist

### Global Setup
- [ ] Install Tailwind + PostCSS
- [ ] Create `tailwind.config.js` with tokens
- [ ] Create `postcss.config.js`
- [ ] Create `globals.css` with @tailwind directives
- [ ] Import `globals.css` in `main.js`
- [ ] Update `package.json` with build scripts

### Component Migration (Priority Order)
- [ ] **DefaultLayout.vue** (biggest impact)
- [ ] **LandingView.vue** (~800 lines → ~100)
- [ ] **MenuView.vue** (~700 lines → ~80)
- [ ] **RestaurantCard.vue**
- [ ] Other components

### Testing
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Responsive (sm, md, lg breakpoints)
- [ ] Hover/focus states work
- [ ] Forms display correctly
- [ ] No layout shifts
- [ ] Performance improved (fewer bytes)

### Cleanup
- [ ] Remove all `<style scoped>` blocks
- [ ] Delete old CSS files if any
- [ ] Verify no inline styles remain
- [ ] Run PurgeCSS (automatic in production)
- [ ] Test final bundle size

---

## Build Performance

**Before Tailwind:**
- CSS file size: ~50+ KB (if scoped styles compiled)
- Runtime performance: Good (browser processes scoped CSS)

**After Tailwind:**
- CSS file size: ~10-15 KB (PurgeCSS removes unused)
- Runtime performance: Excellent (simpler CSS)
- Development: Faster (no CSS processing per component)

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Color Reference](https://tailwindcss.com/docs/customizing-colors)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Dark Mode](https://tailwindcss.com/docs/dark-mode)

---

## FAQ

**Q: Will this break existing functionality?**
A: No! Tailwind replaces only the styling. JavaScript functionality remains unchanged.

**Q: Can I keep some scoped CSS?**
A: Yes, but avoid it. Use @apply in globals.css instead.

**Q: Does Tailwind work with Vue 3?**
A: Yes! Perfectly compatible with Vue 3 and Composition API.

**Q: How do I customize the theme?**
A: Edit `tailwind.config.js` and rebuild. Changes apply everywhere!

**Q: Is the bundle size smaller?**
A: Yes! PurgeCSS removes unused utilities. Typically 50-70% smaller than scoped CSS.

---

## Timeline

- Phase 1 (Setup): 15 minutes
- Phase 2 (Migrate layouts): 30 minutes
- Phase 3 (Migrate components): 45 minutes
- Phase 4 (Testing & polish): 30 minutes

**Total: ~2 hours**

---

**Status**: Ready to implement
**Difficulty**: Low (copy/paste + class names)
**Impact**: High (3000+ lines of CSS eliminated)
