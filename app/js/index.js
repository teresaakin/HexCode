// import { getPaletteTitle } from "./api.js"
// debugger

console.clear();


document.addEventListener('DOMContentLoaded', () => {
const $title = document.querySelector('[data-title]');
const $samples = document.querySelector('[data-colors]');
const $button = document.querySelector('[data-randombtn]');



function generateColorSwatch(color) {
    const $li = document.createElement('li');
    $li.classList.add('color-sample');

    
    // Use tinycolor library to convert HSL to Hex directly
    const colorConv = tinycolor(color);

    $li.style.setProperty('--currentColor', color)
    
    const $sample = document.createElement('div');
    $sample.classList.add('color-sample__swatch');
    
    const $title = document.createElement('span');
    $title.classList.add('color-sample__value');
    $title.innerHTML = color;
    $title.innerHTML = colorConv.toHexString(); // to display HEX codes on UI

  
    $li.append($sample);
    $li.append($title);
    return $li;
  }


  // custom color curation


  function generateColor () {
    const h = Math.round( Math.random() * 360 );
    const s = Math.round( Math.random() * 100 );
    const l = Math.round( Math.random() * 100 );
    
    return `hsl(${h} ${s}% ${l}%)`;
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
  


//   // color ramp geneation 

//   function doTheColorThing () {
//     const colors = colorRamp();
//     colors.forEach((color) => {
//       $samples.append(generateColorSwatch(color));
//     })
//   }


function doTheColorThing () {
  const colors = colorRamp();
  colors.forEach((color) => {
    $samples.append(generateColorSwatch(color));
  })

  const hexColors = colors.map(color => {
    const colorConv = tinycolor(color);
    return colorConv.toHexString();

  });


  console.log(hexColors);

  // get name of palette

  const hexColorString = hexColors.join(',').replace('#', '');
  fetch(`https://api.color.pizza/v1/?values=${hexColorString}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.paletteTitle);

      // Update the title element in the HTML
      const titleElement = document.querySelector('[data-title]');
      if (titleElement) {
      titleElement.textContent = data.paletteTitle;
      }



    });
}
  doTheColorThing(); 
  
//   setInterval(() => {
//    $samples.innerHTML = '';  
//     doTheColorThing();  
//   }, 500)
  
  $button.addEventListener('click', () => {
    $samples.innerHTML = '';  
    doTheColorThing()
    
  })




// Initialize liked palettes array from local storage
let likedPalettes = JSON.parse(localStorage.getItem('likedPalettes')) || [];

// like button toggle
const likeButtonContainer = document.getElementById('likeButtonContainer');

likeButtonContainer.addEventListener('click', function() {
    // likeButtonContainer.classList.toggle('clicked');

    // Get the current palette title from the DOM
    const paletteTitle = $title.textContent;

    // check if it has the clicked class
    const isClicked = likeButtonContainer.classList.contains("clicked");


        if (isClicked) { 
        const indexOfTitle = likedPalettes.indexOf(paletteTitle); // this gets the index of paletteTitle in likedPalettes
        // slice the array to remove the title
        likedPalettes.splice(indexOfTitle, 1);
      }
         else {
          likedPalettes.push(paletteTitle);
        }

        // Toggle the class after modifying the array
        likeButtonContainer.classList.toggle("clicked");

        // Save the updated liked palettes array to local storage
        localStorage.setItem('likedPalettes', JSON.stringify(likedPalettes));


});


// code for displaying liked palettes onto likes.html

const $x = document.querySelector('[data-allLikedPalettes]');
const $y = document.querySelector('[data-paletteContainer]');



const savedPalettes = new Map();
savedPalettes.set('[data-title]', ['data-colors']); 
savedPalettes.get('[data-title]')

console.log(savedPalettes);






// Event handler for the refresh button
const refreshButton = document.querySelector('[data-randombtn]');
refreshButton.addEventListener('click', function() {
    likeButtonContainer.classList.remove("clicked");   // Reset the heart button to its default state

});


// localStorage.clear();




})
