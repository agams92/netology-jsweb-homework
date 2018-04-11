'use strict';
let sources = ['i/airmax.png','i/airmax-jump.png','i/airmax-on-foot.png','i/airmax-playground.png','i/airmax-top-view.png'];
let index = 0;
setInterval(() => {
  if(index === sources.length) {
    index = 0;
  }
  document.getElementById('slider').src = sources[index];
  index++;
}, 5000)