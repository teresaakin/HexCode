function renderFavs() {
  const favs = getFavs()

  console.log(favs)

  if (favs.length > 0) {
    const palettes = document.querySelector('.liked-palettes__wrapper');

    favs.forEach(fav => {
      //main card 
      const card = document.createElement('div')
      card.classList.add('card')

      //is the trio content
      const f = document.createElement('div')
      f.classList.add('palette')

      // Set background color for each color in the palette
      fav.colors.forEach(color => {
        const colorBlock = document.createElement('div');
        colorBlock.style.backgroundColor = color;
        colorBlock.classList.add('color-block');
        f.appendChild(colorBlock);
      });

      // f.style.backgroundImage = `linear-gradient(to right, ${fav.colors[0]}, ${fav.colors[1]}, ${fav.colors[2]})`
      // f.style.width = '150px'

      //just for testing purposes
      // f.style.height = '100px'

      // const swatch = document.createElement('div')
      // swatch.classList.add('sample__swatch')

      const paletteTitle = document.createElement('h3');
      paletteTitle.textContent = fav.title; // Use the global variable

      // place card inside main wrapper
      palettes.appendChild(card)

      
      // place the trio colors into the card
      card.appendChild(f)
      // card.appendChild(swatch)

      // // Append title inside the palette div
      // f.appendChild(paletteTitle)

      // Append title to card
      card.appendChild(paletteTitle);


      // to get like button on the cards only if they are clicked (make them also red)

      // Create heart icon container
      const heartContainer = document.createElement('div');
      heartContainer.classList.add('likeButton__container');

      // Create heart icon
      const heartIcon = document.createElement('div');
      heartIcon.id = 'heart';

      // Add 'clicked' class to make the heart icon red
      heartContainer.classList.add('clicked');

      // Append heart icon to container
      heartContainer.appendChild(heartIcon);

      // append heart container to card
      card.appendChild(heartContainer);
 
      // heart button toggle - basically to remove from likes page
      
      // the purpose of this function is to update the changes made on the favs array
      function saveFavs(favs) {
        localStorage.setItem('favs', JSON.stringify(favs));
      }

      heartContainer.addEventListener('click', () => {
        // remove the liked palette from likes page
        heartContainer.classList.toggle('clicked');

        // if the palette is unliked, remove it from the DOM
        if (!heartContainer.classList.contains('clicked')) {
          palettes.removeChild(card);

          // remove the palette from the favs array
          const index = favs.indexOf(fav);
          if (index > -1) {
            favs.splice(index, 1);

            console.log('updated favs array:', favs);
            saveFavs(favs);
            console.log('saved favs array to local storage:',JSON.parse(localStorage.getItem('favs')));
          }
        }

      });

      palettes.appendChild(card);


    })
  }
}

renderFavs()