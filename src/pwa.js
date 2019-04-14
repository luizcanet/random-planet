/* global self, caches, fetch */
const CACHE_NAME = 'random-planet-1.0.0'

let contentToCache = [
  '/random-planet/',
  '/random-planet/index.html',
  '/random-planet/index.js',
  '/random-planet/service.js',
  '/random-planet/component.js',
  '/random-planet/templates/random-planet.js',
  '/random-planet/templates/planet.js',
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
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(contentToCache)
    })
  )
})

// Fetching content using Service Worker
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (r) {
      return r || fetch(event.request).then(function (response) {
        return caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})

// Clearing old cached files
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})
