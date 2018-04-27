'use strict'
const menu = document.getElementsByClassName('wrapper-dropdown')[0];

function toggleState() {
  this.classList.toggle('active');
}

menu.onclick = toggleState;
