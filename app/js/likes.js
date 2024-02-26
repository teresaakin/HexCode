function renderFavs() {
  const favs = getFavs()

  console.log(favs)

  if (favs.length > 0) {
    const palettes = document.querySelector('.liked-palettes__wrapper')

    favs.forEach(fav => {
      const f = document.createElement('div')
      f.classList.add('palette')

      f.style.backgroundImage = `linear-gradient(to right, ${fav.colors[0]}, ${fav.colors[1]}, ${fav.colors[2]})`
      // f.style.width = '150px'

      //just for testing purposes
      f.style.height = '100px'

      palettes.appendChild(f)
    })
  }
}

renderFavs()