export default function (planet) {
  return `
    <h1 class="planet__name">${planet.name}</h1>
    <div class="planet__info">
      <div><b>Population:</b> ${planet.name}</div>
      <div><b>Climate:</b> ${planet.climate}</div>
      <div><b>Terrain:</b> ${planet.terrain}</div>
      <div>Featured in <b>${planet.terrain.length}</b> films</div>
    </div>
  `
}
