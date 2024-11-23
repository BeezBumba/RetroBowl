const CACHE_NAME = 'retro-bowl';
const urlsToCache = [
  '/',
  '/assets',
  '/index.html',
  '/script.js',
  '/manifest.json',
  '/basketball_legends_2019.min.js',
  '/basketball-stars.png'
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
