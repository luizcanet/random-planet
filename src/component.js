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

    this.nextButton.addEventListener('click', event => {
      this.planet.classList.add('planet--loading')
      service.postMessage({ get: Math.floor((Math.random() * this.count) + 1) })
    })

    service.addEventListener('message', msg => {
      if ('count' in msg.data) {
        this.count = msg.data.count
        service.postMessage({ get: Math.floor((Math.random() * this.count) + 1) })
      } else {
        console.log(msg.data)
        this.planet.innerHTML = planetTemplate(msg.data)
        this.planet.classList.remove('planet--loading')
      }
    })
  }

  connectedCallback () {
    service.postMessage({ get: '' })
  }
}
