/* global HTMLElement, Worker */
import randomPlanetTemplate from './templates/random-planet.js'
import planetTemplate from './templates/planet.js'

let service = new Worker('service.js')

export default class RandomPlanet extends HTMLElement {
  constructor () {
    super()
    let template = document.createElement('template')

    template.innerHTML = randomPlanetTemplate
    this.appendChild(template.content)
    this.nextButton = this.querySelector('.random-planet__next-button')
    this.planet = this.querySelector('.planet')

    this.nextButton.addEventListener('click', () => { this.goToNext() })
    service.addEventListener('message', msg => { this.messageHandler(msg) })
  }

  goToNext () {
    this.planet.classList.add('planet--loading')
    service.postMessage({ get: this.getRandom() })
  }

  getRandom () {
    return Math.floor((Math.random() * this.count) + 1)
  }

  updateCount (count) {
    this.count = count
  }

  render (planet) {
    this.planet.innerHTML = planetTemplate(planet)
    this.planet.classList.remove('planet--loading')
  }

  messageHandler (msg) {
    if ('count' in msg.data) {
      this.updateCount(msg.data.count)
      this.goToNext()
    } else {
      this.render(msg.data)
    }
  }

  connectedCallback () {
    service.postMessage({ get: '' })
  }
}
