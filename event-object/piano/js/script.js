'use strict'
let sounds = ['/first.mp3','/second.mp3','/third.mp3','/fourth.mp3','/fifth.mp3'];
let players = document.getElementsByTagName('audio');
const piano = document.getElementsByTagName('ul')[0];
const buttons = document.getElementsByTagName('li');

function changeTone(event) {
    let currentPlayer = this.getElementsByTagName('audio')[0];
    let currentPlayerIndex = Array.from(players).findIndex((el) => el === currentPlayer);

    if (event.shiftKey) {
        currentPlayer.src = 'sounds/lower' + sounds[currentPlayerIndex];
        piano.classList.remove('middle','higher');
        piano.classList.add('lower');
    } else if (event.altKey) {
        currentPlayer.src = 'sounds/higher' + sounds[currentPlayerIndex];
        piano.classList.remove('middle','lower');
        piano.classList.add('higher');
    }
    else {
        currentPlayer.src = 'sounds/middle' + sounds[currentPlayerIndex];
        piano.classList.remove('lower','higher');
        piano.classList.add('middle');
    }
}

function playMusic() {
    let player = this.getElementsByTagName('audio')[0];
    player.play();
}

for (let button of buttons) {
    button.addEventListener('click', changeTone);
    button.addEventListener('click', playMusic);
}