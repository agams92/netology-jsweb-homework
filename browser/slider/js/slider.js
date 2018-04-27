'use strict';
let sources = ['i/airmax-jump.png','i/airmax-on-foot.png','i/airmax-playground.png','i/airmax-top-view.png','i/airmax.png'];
let index = 0;
let image = document.getElementById('slider');
setInterval(() => {
  if(index === sources.length) {
    index = 0;
  }
  image.src = sources[index];
  index++;
}, 5000)