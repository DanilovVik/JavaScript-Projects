const NAME = 'audio-player-v1'

const FILES = [
    './index.html',
    './css',
    './js',
    './img'
]

self.addEventListener("install", ev => {
    ev.waitUntil(
        caches.open(NAME).then(cache => {
            return cache.addAll(FILES)
        })
    )
    self.skipWaiting()
})

self.addEventListener("activate", ev => {
    ev.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== NAME) {
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
            caches.open(NAME).then(cache => {
                cache.put(ev.request, cacheClone)
            })
            return res
        })
        .catch(() => caches.match(ev.request).then(res => res))
    )
})
