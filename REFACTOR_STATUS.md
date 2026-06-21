# 🔄 Refactor Status - Clean Public SPA

## ✅ COMPLETED

### Phase 1: Cleaning Old Structure
- ✅ **Deleted**: `db.json` - No longer needed (data in /data/modules)
- ✅ **Deleted**: `server.js` - No backend server needed
- ✅ **Deleted**: `.replit` - No Replit-specific code
- ✅ **Updated Router**: Now only has public pages (/, /menu, /about, /news, /contact)
- ✅ **Removed**: All admin routes (/add, /update, /login, /sign-up, /branches)
- ✅ **Removed**: RestaurantDetailView route and related admin features
- ✅ **Architecture**: Now a clean public SPA matching koshary-aboutarek.com

### Current Public Pages (Routes)
```
/                    → LandingView (hero, about, news, reviews, stats)
/menu                → MenuView (full menu display)
/about               → AboutView (about the brand)
/news                → NewsView (news/blog posts)
/contact             → ContactView (contact form)
/:notfound           → NotFoundView (404 page)
```

### Views to Keep
- ✅ **LandingView.vue** - Main landing page (/)
- ✅ **MenuView.vue** - Menu browsing page
- ✅ **AboutView.vue** - About page
- ✅ **NewsView.vue** - News/blog page
- ✅ **ContactView.vue** - Contact form page
- ✅ **NotFoundView.vue** - 404 page

### Views to Delete
- ❌ **HomeView.vue** - Old branch management page (replaced by LandingView)
- ❌ **RestaurantDetailView.vue** - Branch detail (not needed for public SPA)
- ❌ **AddRestaurantView.vue** - Admin add (not in current structure)
- ❌ **EditRestaurantView.vue** - Admin edit (not in current structure)
- ❌ **LoginView.vue** - Admin login (not in current structure)
- ❌ **SignUpView.vue** - Admin signup (not in current structure)

---

## 🚀 IN PROGRESS

### Phase 2: Remove API Dependencies
- [ ] Delete `/src/services/api.js` - Replace with localStorage
- [ ] Create `/src/services/storage.js` - localStorage wrapper
- [ ] Update stores to use localStorage instead of API calls
- [ ] Remove axios dependency from `package.json`

### Phase 3: Create Data Layer
- [ ] Create `/src/data/` folder structure
- [ ] Create `/src/data/modules/`:
  - [ ] `branches.json` - Restaurant locations
  - [ ] `menu.json` - Food items
  - [ ] `news.json` - Blog/news posts
  - [ ] `pages.json` - Static content (about, contact info)
- [ ] Create `/src/data/seed.js` - Initialize localStorage on first load
- [ ] Create `/src/data/storage.js` - localStorage CRUD operations

### Phase 4: Implement i18n
- [ ] Install `vue-i18n@9`
- [ ] Create `/src/i18n/` folder
- [ ] Create `/src/i18n/locales/ar.json` - Arabic translations
- [ ] Create `/src/i18n/locales/en.json` - English translations
- [ ] Configure i18n in `main.js`
- [ ] Replace all manual `t()` calls with `$t('key')`

---

## 📊 File Structure After Refactor

```
restaurant-vue3/
├── src/
│   ├── main.js                      # Entry point (setup i18n)
│   ├── App.vue
│   │
│   ├── data/                        # ← NEW: Data layer
│   │   ├── modules/
│   │   │   ├── branches.json
│   │   │   ├── menu.json
│   │   │   ├── news.json
│   │   │   └── pages.json
│   │   ├── seed.js
│   │   └── storage.js
│   │
│   ├── i18n/                        # ← NEW: Internationalization
│   │   ├── index.js
│   │   ├── locales/
│   │   │   ├── ar.json
│   │   │   └── en.json
│   │   └── messages.js
│   │
│   ├── services/
│   │   ├── storage.js               # ← NEW (replaces api.js)
│   │   └── api.js                   # ← DELETE
│   │
│   ├── stores/
│   │   ├── toastStore.js            # Keep (no changes)
│   │   ├── uiStore.js               # ← NEW (theme, language)
│   │   ├── authStore.js             # ← DELETE (no auth in public SPA)
│   │   └── restaurantStore.js       # ← DELETE (no branches management)
│   │
│   ├── views/
│   │   ├── LandingView.vue          # Keep
│   │   ├── MenuView.vue             # Keep
│   │   ├── AboutView.vue            # Keep
│   │   ├── NewsView.vue             # Keep
│   │   ├── ContactView.vue          # Keep
│   │   ├── NotFoundView.vue         # Keep
│   │   ├── HomeView.vue             # ← DELETE
│   │   └── RestaurantDetailView.vue # ← DELETE
│   │
│   ├── router/index.js              # ✅ Updated
│   └── ...other files
│
├── public/
├── package.json
├── vue.config.js
└── README.md
```

---

## 🗑️ Files to Delete

```
db.json                               # Database (moved to /data/modules)
server.js                            # API server (not needed)
start-dev.bat                        # Development script
start-dev.ps1                        # Development script
src/services/api.js                  # API service (replaced by storage.js)
src/views/HomeView.vue               # Old branch management
src/views/RestaurantDetailView.vue   # Branch detail
src/stores/authStore.js              # Authentication (public SPA only)
src/stores/restaurantStore.js        # Branch management (public SPA only)
src/composables/useLanguage.js       # Manual i18n (replaced by vue-i18n)
```

---

## 📦 Dependencies Changes

### Remove
```json
{
  "axios": "^1.18.0"                  # No longer needed
}
```

### Add
```json
{
  "vue-i18n": "^9.10.0"              # Professional i18n
}
```

---

## 🎯 Next Steps

1. **Remove API Service** → Replace with localStorage storage.js
2. **Create Data Layer** → Move all data to /src/data/modules/
3. **Implement i18n** → Install vue-i18n and configure
4. **Update Components** → Replace manual translations with $t()
5. **Test Public SPA** → Ensure all public pages work
6. **Cleanup** → Remove unused code and dependencies

---

## ✨ Result: Clean Public SPA

After refactor:
- ✅ No backend dependency (localStorage only)
- ✅ No authentication (public website)
- ✅ No branch/menu management
- ✅ Professional i18n (vue-i18n)
- ✅ Clean, modular data structure
- ✅ Matches koshary-aboutarek.com perfectly
- ✅ Ready for production as public website

---

**Status**: Phase 1 ✅ Complete | Phase 2 🚀 In Progress

**Updated**: June 21, 2026
