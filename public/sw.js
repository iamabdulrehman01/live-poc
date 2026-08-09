const CACHE_NAME = "my-app-v1";

self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activated...");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
