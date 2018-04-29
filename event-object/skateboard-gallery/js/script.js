'use strict'
const links = document.getElementsByTagName('a');
const mainPhoto = document.getElementsByClassName('gallery-view')[0];

function selectSkate(event) {
    event.preventDefault();
    for (let link of links) {
        link.classList.remove('gallery-current');
    }
    this.classList.add('gallery-current');
    mainPhoto.src = this.href;
}

for (let link of links) {
    link.addEventListener('click', selectSkate);
}