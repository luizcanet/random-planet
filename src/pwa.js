/* global self, caches, fetch */
const CACHE_NAME = 'random-planet-1.0.0'

let contentToCache = [
  '/random-planet/',
  '/random-planet/index.html',
  '/random-planet/index.js',
  '/random-planet/favicon.ico',
  '/random-planet/styles/main.css',
  '/random-planet/icons/icon-32.png',
  '/random-planet/icons/icon-64.png',
  '/random-planet/icons/icon-96.png',
  '/random-planet/icons/icon-128.png',
  '/random-planet/icons/icon-168.png',
  '/random-planet/icons/icon-192.png',
  '/random-planet/icons/icon-256.png',
  '/random-planet/icons/icon-512.png'
]

// Installing Service Worker
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(contentToCache)
    })
  )
})

// Fetching content using Service Worker
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (response) {
        return caches.open(CACHE_NAME).then(function (cache) {
          cache.put(e.request, response.clone())
          return response
        })
      })
    })
  )
})

// Clearing old cached files
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})
