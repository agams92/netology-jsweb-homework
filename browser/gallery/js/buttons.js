'use strict';
let sources = ['i/breuer-building.jpg','i/guggenheim-museum.jpg','i/headquarters.jpg','i/IAC.jpg','i/new-museum.jpg']
let index = 0;      
let buttonNext = document.getElementById('nextPhoto');
let buttonPrev = document.getElementById('prevPhoto');
let photo = document.getElementById('currentPhoto');

// buttonNext.addEventListener('click', () => {
//   index++;
//   if(index > sources.length - 1) {
//     index = 0;
//   }
//   document.getElementById('currentPhoto').src = sources[index];
// })
// buttonPrev.addEventListener('click',() => {
//   index--;
//   if(index < 0) {
//     index = sources.length - 1;
//   }
//   document.getElementById('currentPhoto').src = sources[index];
// })

buttonNext.onclick = function () {
  index++;
  if(index > sources.length - 1) {
    index = 0;
  }
  photo.src = sources[index];
}

buttonPrev.onclick = function() {
  index--;
  if(index < 0) {
    index = sources.length - 1;
  }
  photo.src = sources[index];
}
