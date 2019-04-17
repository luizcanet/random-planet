/* global describe, it, expect, before */

describe('Testing Random Planet', function () {
  let randomPlanet = document.querySelector('random-planet')

  it('Expect to have a Random Planet in the page', function () {
    expect(randomPlanet).to.exist
  })

  before(function (done) {
    setTimeout(done, 1000)
  })

  it('Expect to have a next button', function () {
    let nextButton = randomPlanet.querySelector('.random-planet__next-button')

    expect(nextButton).to.exist
  })

  describe('Testing Next Planet', function () {
    before(function (done) {
      setTimeout(done, 1000)
    })

    it('Expect to have a planet information', function () {
      let nextButton = randomPlanet.querySelector('.random-planet__next-button')
      let planet = randomPlanet.querySelector('.planet')
      let planetName
      let planetInfo
      let planetFeaturedIn

      nextButton.click()

      setTimeout(function () {
        planetName = planet.querySelector('.planet__name')
        planetInfo = planet.querySelector('.planet__info')
        planetFeaturedIn = planet.querySelector('.planet__featured-in')

        expect(planetName).to.exist
        expect(planetInfo).to.exist
        expect(planetFeaturedIn).to.exist
      }, 1000)
    })
  })
})
