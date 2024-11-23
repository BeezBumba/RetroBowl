const CACHE_NAME = 'retro-bowl';
const urlsToCache = [
  '/',
  '/fix',
  '/html5game',
  '/icons',
  '/img',
  '/js',
  'index.html',
  'manifest.json',
  'production.html',
  'script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
