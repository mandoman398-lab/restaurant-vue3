# 🏗️ Complete Refactor & Enhancement Plan
## Koshary Abou Tarek Vue3 App

**Date**: June 21, 2026  
**Goal**: Reorganize data structure, eliminate backend API, integrate i18n, align with website

---

## 📋 Executive Summary

### Current State
- ✅ 12 pages, 8 components, 3 Pinia stores
- ✅ Branch CRUD, authentication, menu display
- ✅ Bilingual support (manual `useLanguage()` composable)
- ✅ Dark mode, favorites, search, pagination
- ❌ Menu system is hardcoded (no CRUD)
- ❌ Data structure needs reorganization
- ❌ Backend API should be eliminated (no backend needed)
- ❌ i18n not properly implemented (manual translations)
- ❌ Inconsistencies with official website

### Vision After Refactor
- ✅ Clean, modular data structure (separate concerns)
- ✅ No backend dependency (localStorage-only or static JSON)
- ✅ Professional i18n with vue-i18n
- ✅ Full menu CRUD (add, edit, delete menu items)
- ✅ Better organization: `/stores`, `/data`, `/i18n`, `/modules`
- ✅ Align UI with koshary-aboutarek.com
- ✅ Cleaner, more maintainable codebase

---

## 🎯 Refactoring Roadmap

### Phase 1: Data Layer Reorganization
**Goal**: Eliminate backend, use localStorage + seed data

#### 1.1 Create Module-Based Data Structure
```
src/
├── data/                    # ← NEW: Data layer
│   ├── modules/
│   │   ├── branches.json    # Restaurant/branch data
│   │   ├── menu.json        # Menu items by category
│   │   ├── users.json       # Users/accounts
│   │   ├── news.json        # News/blog posts
│   │   └── pages.json       # Static page content (about, contact, etc)
│   ├── seed.js              # Initialize localStorage from JSON
│   └── storage.js           # localStorage wrapper with CRUD helpers
├── services/
│   ├── api.js               # ← DEPRECATE: Won't need after Phase 1
│   ├── storage.js           # NEW: localStorage adapter
│   └── modules/
│       ├── branchService.js # CRUD for branches
│       ├── menuService.js   # CRUD for menu items
│       └── userService.js   # User management
```

#### 1.2 Data Structure: Branches Module
```json
{
  "id": "downtown",
  "name": {
    "ar": "الفرع الرئيسي - وسط البلد",
    "en": "Downtown — Main Branch"
  },
  "location": {
    "area": "downtown-cairo",
    "address": "16 Maarouf St., Champollion St., Downtown Cairo",
    "coordinates": { "lat": 30.0444, "lng": 31.2357 }
  },
  "contact": {
    "phone": "+20 2 2577 5935",
    "hotline": "16011",
    "email": "info@aboutarek.com"
  },
  "hours": {
    "open": "07:00",
    "close": "00:00",
    "timezone": "Africa/Cairo",
    "daysOpen": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  "delivery": {
    "available": true,
    "platforms": ["talabat", "elmenus", "phone"],
    "note": "7 AM - 10 PM daily"
  },
  "description": {
    "ar": "الفرع الأيقوني الأسطوري منذ الخمسينيات...",
    "en": "The iconic flagship restaurant serving Cairo since the 1950s..."
  },
  "flags": {
    "isMainBranch": true,
    "isActive": true,
    "isFeatured": true
  },
  "images": {
    "logo": "/images/branches/downtown-logo.png",
    "hero": "/images/branches/downtown-hero.webp",
    "gallery": ["/images/branches/downtown-1.jpg", "..."]
  },
  "metadata": {
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "editor": "admin"
  }
}
```

#### 1.3 Data Structure: Menu Items Module
```json
{
  "id": "koshary-signature",
  "category": "koshary",
  "name": {
    "ar": "كشري (الأصلي)",
    "en": "Koshary — Signature"
  },
  "description": {
    "ar": "الكشري الأسطوري: أرز، عدس، مكرونة، صلصة طماطم، بصل مقلي، دقة حارة",
    "en": "The iconic original: rice, lentils, pasta, tomato sauce, crispy onions, daqqah"
  },
  "ingredients": {
    "ar": ["أرز", "عدس", "مكرونة", "صلصة طماطم", "بصل مقلي", "حمص"],
    "en": ["rice", "lentils", "pasta", "tomato sauce", "fried onions", "chickpeas"]
  },
  "dietary": ["vegan", "vegetarian", "gluten-friendly"],
  "sizes": [
    { "size": "small", "label": { "ar": "صغير", "en": "Small" }, "price": 50 },
    { "size": "medium", "label": { "ar": "وسط", "en": "Medium" }, "price": 60 },
    { "size": "large", "label": { "ar": "كبير", "en": "Large" }, "price": 70 },
    { "size": "jumbo", "label": { "ar": "جامبو", "en": "Jumbo" }, "price": 85 }
  ],
  "customizations": [
    { "id": "extra-sauce", "label": { "ar": "صلصة إضافية", "en": "Extra sauce" } },
    { "id": "extra-onions", "label": { "ar": "بصل إضافي", "en": "Extra onions" } },
    { "id": "extra-daqqah", "label": { "ar": "دقة إضافية", "en": "Extra daqqah" } }
  ],
  "nutritionInfo": {
    "calories": 450,
    "protein": "12g",
    "carbs": "65g",
    "fat": "8g"
  },
  "image": "/images/menu/koshary-signature.jpg",
  "flags": {
    "isFeatured": true,
    "isAvailable": true,
    "isVegan": true
  },
  "metadata": {
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### 1.4 Data Structure: Static Pages
```json
{
  "about": {
    "title": { "ar": "من نحن", "en": "About Us" },
    "sections": [
      {
        "heading": { "ar": "القصة", "en": "Our Story" },
        "content": { "ar": "...", "en": "..." },
        "image": "..."
      }
    ]
  },
  "contact": {
    "title": { "ar": "تواصل معنا", "en": "Contact Us" },
    "email": "info@aboutarek.com",
    "phones": ["16011", "+20 2 2577 5935"],
    "socialLinks": { "facebook": "...", "instagram": "..." }
  }
}
```

---

### Phase 2: Implement i18n (vue-i18n)
**Goal**: Replace manual translation with professional i18n

#### 2.1 Install & Setup
```bash
npm install vue-i18n@9
```

#### 2.2 Project Structure
```
src/
├── i18n/
│   ├── index.js             # i18n configuration
│   ├── locales/
│   │   ├── ar.json          # Arabic translations
│   │   └── en.json          # English translations
│   └── messages.js          # Shared message keys
```

#### 2.3 Translation Files Structure

**ar.json:**
```json
{
  "common": {
    "appName": "كشري أبو طارق",
    "addBranch": "إضافة فرع",
    "editBranch": "تعديل الفرع",
    "deleteBranch": "حذف الفرع",
    "save": "حفظ",
    "cancel": "إلغاء",
    "search": "بحث"
  },
  "pages": {
    "home": { "title": "الفروع", "description": "جميع فروع كشري أبو طارق" },
    "menu": { "title": "القائمة", "description": "قائمة الطعام الكاملة" },
    "about": { "title": "من نحن", "description": "قصتنا" },
    "contact": { "title": "تواصل معنا", "description": "تواصل مع الفريق" }
  },
  "branches": {
    "total": "إجمالي الفروع",
    "mainBranch": "الفرع الرئيسي",
    "founded": "التأسيس",
    "floors": "طوابق",
    "delivery": "التوصيل"
  },
  "menu": {
    "koshary": "كشري",
    "soups": "الشوربة",
    "desserts": "الحلويات",
    "drinks": "المشروبات"
  },
  "auth": {
    "login": "دخول",
    "signup": "إنشاء حساب",
    "logout": "تسجيل خروج",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور"
  }
}
```

---

### Phase 3: Menu System Enhancement
**Goal**: Full CRUD for menu items, categories, and daqqah levels

#### 3.1 Menu Management Store (Pinia)
```javascript
// stores/menuStore.js
export const useMenuStore = defineStore('menu', () => {
  const categories = ref([
    { id: 'koshary', label: { ar: 'كشري', en: 'Koshary' }, icon: '🍲' },
    { id: 'soups', label: { ar: 'الشوربة', en: 'Soups' }, icon: '🥣' },
    { id: 'desserts', label: { ar: 'الحلويات', en: 'Desserts' }, icon: '🍮' },
    { id: 'drinks', label: { ar: 'المشروبات', en: 'Drinks' }, icon: '🥤' },
    { id: 'sides', label: { ar: 'الإضافات', en: 'Sides' }, icon: '🍟' }
  ])
  
  const items = ref([]) // Menu items
  const daqqahLevels = ref([
    { level: 0, label: { ar: 'بدون', en: 'Without' } },
    { level: 1, label: { ar: 'عادي', en: 'Regular' } },
    { level: 2, label: { ar: 'زيادة', en: 'Extra' } },
    { level: 3, label: { ar: 'حار جداً', en: 'Very Hot' } }
  ])
  
  // CRUD operations
  async function addItem(item) { ... }
  async function updateItem(id, data) { ... }
  async function deleteItem(id) { ... }
  async function getItemsByCategory(categoryId) { ... }
})
```

#### 3.2 Menu Editor Component
- **Create**: New menu item form with category, sizes, customizations
- **Edit**: Modify existing items
- **Delete**: Remove items with confirmation
- **Preview**: See how it looks in menu

---

### Phase 4: Feature Enhancements

#### 4.1 Branch Management Improvements
- ✅ Bulk operations (import/export branches)
- ✅ Branch hours editor (time picker)
- ✅ Delivery platforms toggles
- ✅ Branch images gallery
- ✅ Google Maps integration for location

#### 4.2 User Management
- ✅ User roles (admin, moderator, viewer)
- ✅ User activity log
- ✅ Account management page
- ✅ Password change

#### 4.3 Analytics & Dashboard
- ✅ Branch statistics (views, favorites)
- ✅ Menu item popularity
- ✅ User engagement metrics

#### 4.4 Content Management
- ✅ News/blog post CRUD
- ✅ About page editor
- ✅ Contact form submissions

---

### Phase 5: UI/UX Alignment with Official Website
**Reference**: https://www.koshary-aboutarek.com

#### 5.1 Visual Consistency
- ✅ Match hero section design
- ✅ Use same color palette (gold accent, dark bg)
- ✅ Adopt same typography hierarchy
- ✅ Consistent spacing and layout

#### 5.2 Content Parity
- ✅ Add all 6+ branches with accurate info
- ✅ Complete menu with all categories
- ✅ Testimonials section (from website)
- ✅ Social media links
- ✅ Footer with company info

#### 5.3 Navigation Updates
- ✅ Refine main nav (Home, Menu, Branches, About, News, Contact)
- ✅ Add breadcrumbs for detail pages
- ✅ Improve mobile navigation

---

## 🗂️ File Structure After Refactor

```
restaurant-vue3/
├── src/
│   ├── main.js                          # Entry point
│   ├── App.vue                          # Root component
│   │
│   ├── data/                            # ← NEW: Data layer
│   │   ├── modules/
│   │   │   ├── branches.json
│   │   │   ├── menu.json
│   │   │   ├── users.json
│   │   │   ├── news.json
│   │   │   └── pages.json
│   │   ├── seed.js
│   │   └── storage.js
│   │
│   ├── i18n/                            # ← NEW: Internationalization
│   │   ├── index.js
│   │   ├── locales/
│   │   │   ├── ar.json
│   │   │   └── en.json
│   │   └── messages.js
│   │
│   ├── services/                        # Business logic layer
│   │   ├── storage.js                   # localStorage wrapper
│   │   └── modules/
│   │       ├── branchService.js
│   │       ├── menuService.js
│   │       ├── userService.js
│   │       └── newsService.js
│   │
│   ├── stores/                          # Pinia state management
│   │   ├── authStore.js                 # (refactored)
│   │   ├── branchStore.js               # (refactored)
│   │   ├── menuStore.js                 # ← NEW
│   │   ├── newsStore.js                 # ← NEW
│   │   ├── toastStore.js
│   │   └── uiStore.js                   # ← NEW (theme, language, etc)
│   │
│   ├── composables/
│   │   ├── useLanguage.js               # (deprecated, use i18n)
│   │   ├── useDarkMode.js
│   │   ├── useToast.js
│   │   ├── usePageMeta.js
│   │   ├── useAuth.js                   # ← NEW: auth helpers
│   │   ├── useFetch.js                  # ← NEW: data fetching
│   │   └── usePagination.js             # ← NEW: pagination helper
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppIcon.vue
│   │   │   ├── AppLoader.vue
│   │   │   ├── AppToast.vue
│   │   │   └── Modal.vue
│   │   ├── forms/
│   │   │   ├── BranchForm.vue           # ← NEW: Branch edit/create
│   │   │   ├── MenuItemForm.vue         # ← NEW: Menu edit/create
│   │   │   └── ContactForm.vue          # ← NEW
│   │   ├── sections/
│   │   │   ├── BranchCard.vue
│   │   │   ├── MenuItemCard.vue         # ← NEW
│   │   │   ├── BranchGrid.vue
│   │   │   ├── MenuGrid.vue
│   │   │   └── BranchTable.vue
│   │   └── layout/
│   │       ├── Navbar.vue
│   │       ├── Footer.vue
│   │       └── Sidebar.vue              # ← NEW (admin)
│   │
│   ├── views/
│   │   ├── public/
│   │   │   ├── HomeView.vue             # Landing/branches
│   │   │   ├── MenuView.vue             # Menu browsing
│   │   │   ├── AboutView.vue
│   │   │   ├── NewsView.vue
│   │   │   ├── ContactView.vue
│   │   │   └── BranchDetailView.vue
│   │   ├── admin/
│   │   │   ├── DashboardView.vue        # ← NEW: Admin dashboard
│   │   │   ├── BranchManagementView.vue # ← NEW: Branch CRUD
│   │   │   ├── MenuManagementView.vue   # ← NEW: Menu CRUD
│   │   │   └── UserManagementView.vue   # ← NEW: User management
│   │   └── auth/
│   │       ├── LoginView.vue
│   │       └── SignUpView.vue
│   │
│   ├── layouts/
│   │   ├── DefaultLayout.vue
│   │   ├── AuthLayout.vue
│   │   └── AdminLayout.vue              # ← NEW
│   │
│   ├── router/
│   │   └── index.js                     # (updated routes)
│   │
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── variables.css
│   │   │   └── responsive.css
│   │   └── images/
│   │
│   └── utils/                           # ← NEW: Utility functions
│       ├── validators.js
│       ├── formatters.js
│       ├── constants.js
│       └── helpers.js
│
├── public/                              # Static files
├── db.json                              # ← DEPRECATE (data in /data)
├── package.json
└── vue.config.js
```

---

## 🚀 Implementation Steps

### Week 1: Data Layer
1. Create `/src/data` structure
2. Move db.json → modules JSON files
3. Create storage.js wrapper for localStorage
4. Create service modules (branchService, menuService, etc)
5. Refactor stores to use services instead of API

### Week 2: i18n Integration
1. Install vue-i18n
2. Create translation files (ar.json, en.json)
3. Replace all manual translation calls with i18n
4. Add missing translations for all UI elements
5. Test RTL/LTR switching

### Week 3: Menu System
1. Create menuStore (Pinia)
2. Build MenuItemForm component
3. Build MenuManagementView
4. Update menu display components
5. Test full menu CRUD

### Week 4: Admin Dashboard & Polish
1. Create DashboardView with analytics
2. Build BranchManagementView (table view with CRUD)
3. Build UserManagementView
4. Refine UI alignment with official website
5. Final testing and bug fixes

---

## 📊 Data Migration Strategy

### Current → New

**Before (db.json):**
```json
{
  "users": [],
  "restaurants": []
}
```

**After (modular):**
```
/data/modules/
├── branches.json (replaces restaurants)
├── menu.json
├── users.json
└── pages.json (new static content)
```

**localStorage Sync:**
```javascript
// seed.js - Run once on app first load
function seedStorage() {
  if (!localStorage.getItem('_app_seeded')) {
    // Import JSON data
    localStorage.setItem('branches', JSON.stringify(branchesData))
    localStorage.setItem('menuItems', JSON.stringify(menuData))
    localStorage.setItem('users', JSON.stringify(usersData))
    localStorage.setItem('_app_seeded', 'true')
  }
}
```

---

## ✅ Quality Checklist

### Code Quality
- [ ] ESLint passes all files
- [ ] No console errors/warnings
- [ ] All components have proper prop validation
- [ ] Consistent code style (Prettier)

### Functionality
- [ ] All CRUD operations work (branches, menu, users)
- [ ] Search/filter working correctly
- [ ] Pagination works
- [ ] Authentication flows properly
- [ ] Favorites/saved items persist

### i18n
- [ ] Both languages fully translated
- [ ] RTL layout correct for Arabic
- [ ] Language toggle works smoothly
- [ ] No untranslated strings

### UI/UX
- [ ] Mobile responsive at all breakpoints
- [ ] Dark mode toggles correctly
- [ ] Accessibility: keyboard navigation, ARIA labels
- [ ] Forms have validation and error messages
- [ ] Toast notifications display properly

### Performance
- [ ] Lazy-loaded routes
- [ ] Optimized component bundles
- [ ] Images optimized/webp format
- [ ] Load time < 3 seconds (target)

### Data & Storage
- [ ] localStorage persists correctly
- [ ] Export/import functionality works
- [ ] Data is sanitized (XSS prevention)
- [ ] No sensitive data in localStorage

---

## 🎨 Design Tokens (Maintain Existing)

```css
--primary: #c81030 (Red)
--primary-light: rgba(200, 16, 46, 0.1)
--primary-shadow: rgba(200, 16, 46, 0.2)
--gold: #f5a623 (Accent)
--gold-light: rgba(245, 166, 35, 0.1)
--gold-text: #7a4f00
--surface: #fff / #1a1a1a (dark)
--bg: #f5f5f5 / #0d0d0d (dark)
--border: #e0e0e0 / #2a2a2a (dark)
--text: #1a1a1a / #fff (dark)
--text-muted: #666 / #999 (dark)
--error: #dc2626
--error-light: rgba(220, 38, 38, 0.1)
--success: #16a34a
```

---

## 📱 Breakpoints (Maintain Existing)

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: 640px - 767px
- Small Mobile: < 640px

---

## 🔗 Dependencies to Add

```json
{
  "vue-i18n": "^9.10.0",
  "date-fns": "^3.0.0",
  "lodash-es": "^4.17.21"
}
```

**Remove if unused:**
- `json-server` (replaced by localStorage)
- Any backend dependencies

---

## 🧪 Testing Strategy

### Unit Tests (components, composables, utilities)
```bash
npm run test:unit  # Jest/Vitest
```

### E2E Tests (user flows)
```bash
npm run test:e2e   # Cypress/Playwright
```

### Manual Testing Checklist
- [ ] Add/Edit/Delete branch in admin
- [ ] Add/Edit/Delete menu item
- [ ] Search branches
- [ ] Filter by category
- [ ] Change language (AR ↔ EN)
- [ ] Toggle dark mode
- [ ] Test on mobile devices
- [ ] Test on slow 3G connection

---

## 📞 Support & Questions

For each phase, verify:
1. No API calls (all localStorage)
2. i18n properly configured
3. Components render without errors
4. Mobile responsive
5. Accessibility compliant

---

**Next Steps**: Begin Phase 1 (Data Layer Reorganization)

**Estimated Timeline**: 4 weeks (1 week per phase)

**Success Criteria**:
- ✅ Zero backend dependency
- ✅ Professional i18n implementation
- ✅ Full menu CRUD system
- ✅ UI/UX parity with official website
- ✅ Clean, maintainable codebase
