/* MSS CMS Service Worker — shell caching for PWA offline support */
var CACHE_NAME = "mss-cms-v2";
var SHELL_URLS = [
  "/admin/index.html",
  "/admin/config.yml",
  "/admin/custom.css",
  "/admin/manifest.json"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL_URLS);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (e) {
  /* Navigation requests: network-first, fall back to cached index.html */
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(function () {
        return caches.match("/admin/index.html");
      })
    );
    return;
  }
  /* Static shell assets: cache-first */
  var url = e.request.url;
  var isCmsJs = url.includes("decap-cms") || url.includes("unpkg.com");
  if (isCmsJs) {
    e.respondWith(
      caches.match(e.request).then(function (cached) {
        return cached || fetch(e.request).then(function (resp) {
          var clone = resp.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(e.request, clone); });
          return resp;
        });
      })
    );
    return;
  }
  /* Everything else: network-first */
  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request);
    })
  );
});
