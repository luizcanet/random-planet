/* global self, fetch, postMessage */
const SWAPI = 'https://swapi.co/api'

self.addEventListener('message', msg => {
  fetch(`${SWAPI}/planets/${msg.data.get}`).then(response => {
    if (response.ok) {
      response.json().then(data => {
        postMessage(data)
      })
    } else {
      throw new Error(response.statusText)
    }
  }).catch(err => {
    msg.status = 'serviceError'
    msg.errorMessage = err.message
    postMessage(msg)
  })
})
