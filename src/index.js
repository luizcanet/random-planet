/* global customElements */
import RandomPlanet from './component.js'

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('pwa.js')
}

customElements.define('random-planet', RandomPlanet)
