// import { getPaletteTitle } from "./api.js"
// debugger

console.clear();


//get fav palettes from local storage if there's any,
//or return an empty array if there's none
function getFavourites() {
  const favs = localStorage.getItem('favs')

  if (!favs) return []

  return JSON.parse(favs)
}

function colorRamp () {
  // const startHue = Math.random() * 360;
  // const startS = 40 + Math.random() * 60;
  // const startL = 80 + Math.random() * 20;
    

  // const hueRange = startHue + Math.random() * 180;

  const startHue = Math.random() * 360;
  const startS = 80 + Math.random() * 60;
  const startL = 50 + Math.random() * 30;
    

  const hueRange = startHue + Math.random() * 180;
    
  /*
    Math.random() => Number between 0 - 1
    Times 20
    Results in something between 0 - 20
    Add Minimum of 10
    Math.random() * 20 + 10
  */
    
  // return [
  //   `hsl(${startHue} ${startS}% ${startL}%)`,
  //   `hsl(${startHue + 180} ${startS}% ${startL - (
  //     10 + Math.random() * 40
  //   )}%)`,
  //   `hsl(${startHue + 180} ${startS}% ${startL - (
  //     50 + Math.random() * 50
  //   )}%)`,
  // ]

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

function generateColorSwatch(color) {
    // Use tinycolor library to convert HSL to Hex directly
    const colorConv = tinycolor(color);

    const swatch = `
      <li class="color-sample" style="--current-color: ${color}">
        <div class="color-sample__swatch"></div>
        <p class="color-sample__value>
          ${colorConv.toHexString()}
        </p>
      </li>
    `

    return swatch

    // const $li = document.createElement('li');
    // $li.classList.add('color-sample');

    // $li.style.setProperty('--currentColor', color)
    
    // const $sample = document.createElement('div');
    // $sample.classList.add('color-sample__swatch');
    
    // const $title = document.createElement('span');
    // $title.classList.add('color-sample__value');
    // $title.innerHTML = color;
    // $title.innerHTML = colorConv.toHexString(); // to display HEX codes on UI

  
    // $li.append($sample);
    // $li.append($title);
    // return $li;
}

function generateColor () {
  const h = Math.round( Math.random() * 360 );
  const s = Math.round( Math.random() * 100 );
  const l = Math.round( Math.random() * 100 );
    
  return `hsl(${h} ${s}% ${l}%)`;
}

function doTheColorThing () {
  const $samples = document.querySelector('[data-colors]')
  const $title = document.querySelector('[data-title]')

  const colors = colorRamp();

  colors.forEach(color => {
    $samples.insertAdjacentHTML(
      'beforeend',
      generateColorSwatch(color)
    )
  })

  // colors.forEach((color) => {
  //   $samples.append(generateColorSwatch(color));
  // })

  const hexColors = colors.map(color => {
    const colorConv = tinycolor(color);
    return colorConv.toHexString();
  });

  // get name of palette
  const hexColorString = hexColors.join(',').replace('#', '');

  fetch(`https://api.color.pizza/v1/?values=${hexColorString}`)
    .then(response => response.json())
    .then(data => {

      //destructure the data object and get the palette title
      const { paletteTitle: title } = data

      // Update the title element in the HTML
      $title.textContent = title

      // if (titleElement) {
      //   titleElement.textContent = data.paletteTitle;
      // }
  });
}


//this function is reponsible for orchestrating the behaviour of our app
//depending on the page we're currently on
function startApp() {
  const $sample = document.querySelector('[data-colors]')
  const $randomPaletteButton = document.querySelector('[data-randombtn]')

  const url = new URL(window.location.href)

  if (url.pathname === '/generator.html') {
    //generate a random palette
    doTheColorThing()
  }

  if (url.pathname === '/likes.html') {
    console.log('welcome to the likes the page!')
  }

  //add an event listener to the 'generate random palette' button
  $randomPaletteButton.addEventListener('click', function() {
      const onGeneratorPage = url.pathname === '/generator.html'

      //check if we're on the generator page before trying to generate a new color palette.
      //if not, we navigate to the generator page which automatically generates a new color palette
      if (!onGeneratorPage) {

        //tells the browser to navigate to generator.html
        window.location.href = '/generator.html'

        //end this function call
        return null
      }

      //if we're currently on the generator page, we skip the above condition and generate
      //a new color palette in 2 steps as we normally would:

      //step 1. clear the samples container
      $sample.innerHTML = ''

      //step 2. generate a new color palette
      doTheColorThing()
    }
  )
}

document.addEventListener(
  'DOMContentLoaded',
  startApp
)
  
//   setInterval(() => {
//    $samples.innerHTML = '';  
//     doTheColorThing();  
//   }, 500)




// Initialize liked palettes array from local storage
// let likedPalettes = JSON.parse(localStorage.getItem('likedPalettes')) || [];

// // like button toggle
// const likeButtonContainer = document.getElementById('likeButtonContainer');

// likeButtonContainer.addEventListener('click', function() {
//     // likeButtonContainer.classList.toggle('clicked');

//     // Get the current palette title from the DOM
//     const paletteTitle = $title.textContent;

//     // check if it has the clicked class
//     const isClicked = likeButtonContainer.classList.contains("clicked");


//         if (isClicked) { 
//         const indexOfTitle = likedPalettes.indexOf(paletteTitle); // this gets the index of paletteTitle in likedPalettes
//         // slice the array to remove the title
//         likedPalettes.splice(indexOfTitle, 1);
//       }
//          else {
//           likedPalettes.push(paletteTitle);
//         }

//         // Toggle the class after modifying the array
//         likeButtonContainer.classList.toggle("clicked");

//         // Save the updated liked palettes array to local storage
//         localStorage.setItem('likedPalettes', JSON.stringify(likedPalettes));


// });



// code for displaying liked palettes onto likes.html

// const $x = document.querySelector('[data-allLikedPalettes]');
// const $y = document.querySelector('[data-paletteContainer]');



// const savedPalettes = new Map();
// savedPalettes.set('[data-title]', ['data-colors']); 
// savedPalettes.get('[data-title]')

// console.log(savedPalettes);






// // Event handler for the refresh button
// const refreshButton = document.querySelector('[data-randombtn]');
// refreshButton.addEventListener('click', function() {
//     likeButtonContainer.classList.remove("clicked");   // Reset the heart button to its default state

// });


// localStorage.clear();
