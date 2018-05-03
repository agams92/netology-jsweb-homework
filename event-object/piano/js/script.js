'use strict'
let sounds = ['/first.mp3','/second.mp3','/third.mp3','/fourth.mp3','/fifth.mp3'];
let players = document.getElementsByTagName('audio');
const piano = document.getElementsByTagName('ul')[0];
const buttons = document.getElementsByTagName('li');

function changeTone(event) {
    if (event.shiftKey) {
        for (let i = 0; i < players.length; i++) {
            players[i].src = 'sounds/lower' + sounds[i];
            // console.log(players[i].getAttribute('src'));
        }
        // console.log(`Клавиша - ${event.code}, тип - ${event.type}, event.repeat - ${event.repeat}`);
        piano.classList.remove('middle','higher');
        piano.classList.add('lower');
    } else if (event.altKey) {
        for (let i = 0; i < players.length; i++) {
            players[i].src = 'sounds/higher' + sounds[i];
            // console.log(players[i].getAttribute('src'));
        }
        // console.log(`Клавиша - ${event.code}, тип - ${event.type}, event.repeat - ${event.repeat}`);
        piano.classList.remove('middle','lower');
        piano.classList.add('higher');
    } 
}

function basicTone(event) {
    if (event.key === 'Shift' || event.key === 'Alt') {
        for (let i = 0; i < players.length; i++) {
            players[i].src = 'sounds/middle' + sounds[i];
            // console.log(players[i].getAttribute('src'));
        }
        // console.log(`Клавиша - ${event.code}, тип - ${event.type}, event.repeat - ${event.repeat}`);
        piano.classList.remove('lower','higher');
        piano.classList.add('middle');
    }
}

function playMusic() {
    let player = this.getElementsByTagName('audio')[0];
    if (player.currentTime > 0) {
        player.load();
        player.play();
    } else {
        player.play();
    }
}

document.addEventListener('keydown',changeTone);
document.addEventListener('keyup',basicTone);
for (let button of buttons) {
    button.addEventListener('click',playMusic);
}