/* Koshary Abou Tarek – Service Worker v1.0 */
const CACHE_NAME = 'aboutarek-v1';
const API_CACHE = 'aboutarek-api-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon.svg'
];

/* ── Install: pre-cache app shell ── */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== API_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: routing strategy ── */
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  /* Skip non-GET and cross-origin except same-host API */
  if (request.method !== 'GET') return;

  /* API calls (port 3000) → Network-first, fallback to cache */
  if (url.port === '3000' || url.pathname.startsWith('/api/')) {
    e.respondWith(networkFirst(request, API_CACHE, 5000));
    return;
  }

  /* Navigation requests → Network-first, fallback to cached index */
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() =>
        caches.match('/').then(r => r || fetch(request))
      )
    );
    return;
  }

  /* JS/CSS/fonts/images → Cache-first with network update */
  if (/\.(js|css|woff2?|ttf|eot|png|jpg|jpeg|svg|ico|webp)(\?|$)/.test(url.pathname)) {
    e.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  /* Everything else → Network-first */
  e.respondWith(networkFirst(request, CACHE_NAME, 8000));
});

/* ── Strategies ── */

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    /* Refresh cache in background (stale-while-revalidate) */
    fetch(request).then(res => {
      if (res && res.status === 200) {
        caches.open(cacheName).then(c => c.put(request, res));
      }
    }).catch(() => {});
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName, timeout = 5000) {
  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(
      JSON.stringify({ error: 'You are offline', offline: true }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/* ── Background sync for failed mutations ── */
self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-branches') {
    e.waitUntil(syncPendingRequests());
  }
});

async function syncPendingRequests() {
  /* Placeholder for future offline-first mutation support */
  return Promise.resolve();
}
