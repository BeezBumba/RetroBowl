const KEY = 'RETROBOWL';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then((cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      try {
        console.log(`[Service Worker] Attempting live fetch: ${e.request.url}`);
        const response = await fetch(e.request);
        const cache = await caches.open(KEY);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      } catch (err) {
        console.error(`[Service Worker] Fetch failed, attempting to serve from cache: ${err}`);
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
      }
    })()
  );
});
