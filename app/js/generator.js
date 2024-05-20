const addToFavsButton = document.querySelector('#likeButtonContainer');

let currentPalette = null

function colorRamp() {
  const startHue = Math.random() * 360;
  const startS = 80 + Math.random() * 60;
  const startL = 50 + Math.random() * 30;

  // const hueRange = startHue + Math.random() * 180;

  return [
    `hsl(${startHue} ${startS}% ${startL}%)`,
    `hsl(${startHue + 180} ${startS}% ${startL - (
      10 + Math.random() * 20
    )}%)`,
    `hsl(${startHue + 180} ${startS}% ${startL - (
      20 + Math.random() * 10
    )}%)`,
  ]
}

function createPalette() {
  const colors = colorRamp()

  const colorsHex = colors.map(color => tinycolor(color).toHexString()).join(',').replace('#', '')

  fetch(`https://api.color.pizza/v1/?values=${colorsHex}`)
  .then(res => res.json())
  .then(data => {

    //create the current palette object to hold the current palette data
    currentPalette = {
      colors: colors,
      title: data.paletteTitle
    }

    renderPalette()
  })
}

function renderPalette() {
  const title = document.querySelector('[data-title]')
  const palette = document.querySelector('[data-colors]')

  title.textContent = currentPalette.title
  palette.innerHTML = ""
  addToFavsButton.classList.remove('clicked')

  for (let color of currentPalette.colors) {
    const el = document.createElement('li')
    const swatch = document.createElement('div')
    const swatch_title = document.createElement('span')

    swatch.classList.add('color-sample__swatch')
    swatch_title.classList.add('color-sample__value')

    el.style.setProperty('--current-color', color)
    swatch_title.textContent = tinycolor(color).toHexString()  // Set the hex value text


    el.appendChild(swatch)
    el.appendChild(swatch_title)

    palette.appendChild(el)
  }
}

function addToFavorites() {
  const favs = getFavs()
  const alreadyAdded = addToFavsButton.classList.contains('clicked')

  if (alreadyAdded) {
    //remove the last item since it is the one recently added to favs
    favs.pop()

    localStorage.setItem('favs', JSON.stringify(favs))
    addToFavsButton.classList.remove('clicked')

  } else if (favs.length < 6) {
    //add the recently created palette to the favs array
    favs.push(currentPalette)

    localStorage.setItem('favs', JSON.stringify(favs))
    addToFavsButton.classList.add('clicked')
  }
}

addToFavsButton.addEventListener(
  'click',
  addToFavorites
)

generateButton.addEventListener(
  'click',
  createPalette
)

createPalette()