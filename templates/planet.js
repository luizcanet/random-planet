export default function (planet) {
  return `
    <h1 class="planet__name">${planet.name}</h1>
    <dl class="planet__info">
      <dt class="planet__data-label">Population:</dt>
      <dd class="planet__data">${planet.name}</dd>
      <dt class="planet__data-label">Climate:</dt>
      <dd class="planet__data">${planet.climate}</dd>
      <dt class="planet__data-label">Terrain:</dt>
      <dd class="planet__data">${planet.terrain}</dd>
    </dl>
    <p class="planet__featured-in">Featured in <b>${planet.films.length}</b> films</p>
  `
}
