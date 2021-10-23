const FILES_TO_CACHE = [
    '/',
    '/style.css',
    '/db.js',
    '/index.js',
    '/manifest.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
  ];
  
  const PRECACHE = 'my-site-cache-v1';
  const RUNTIME = 'data-cache-v1';
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches
        .open(PRECACHE)
        .then((cache) => cache.addAll(FILES_TO_CACHE))
        .then(self.skipWaiting())
    );
  });
  
  // The activate handler takes care of cleaning up old caches.
  self.addEventListener('install', (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
      caches.open(PRECACHE)
        .then((cacheNames) => {
          return cache.addAll(FILES_TO_CACHE)
        })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
      event.respondWith(
        caches.open(RUNTIME).then((cachedResponse) => {
        //   if (cachedResponse) {
        //     return cachedResponse;
        //   }
        if (cachedResponse) {
            cache.put(event.request.url, response.clone());
                     }
            return cachedResponse;
         }
         
                     

              });
            });
          })
  