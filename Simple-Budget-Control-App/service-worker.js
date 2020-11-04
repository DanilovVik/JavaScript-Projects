const CACHE_NAME = 'cache-v1'

const FILES_TO_CACHE = [
    './index.html',
    './style.css',
    './script.js',
    './img/buttons/edit-regular.svg',
    './img/buttons/money-bill-alt-solid.svg',
    './img/buttons/money-bill-solid.svg',
    './img/buttons/dollar-sign-solid.svg',
    './img/buttons/trash-alt-regular.svg',
    './img/icons/icon-64.png',
    './img/icons/icon-128.png',
    './img/icons/icon-256.png',
    './img/icons/icon-512.png'
]

self.addEventListener("install", ev => {
    ev.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE)
        })
    )
    self.skipWaiting()
})

self.addEventListener("activate", ev => {
    ev.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                })
            )
        })
    )
    self.clients.claim()
})

self.addEventListener('fetch', ev => {
    ev.respondWith(
        fetch(ev.request)
        .then(res => {
            const cacheClone = res.clone()
            caches.open(CACHE_NAME).then(cache => {
                cache.put(ev.request, cacheClone)
            })
            return res
        })
        .catch(() => caches.match(ev.request).then(res => res))
    )
})
