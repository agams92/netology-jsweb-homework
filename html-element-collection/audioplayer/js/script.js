'use strict'
const player = document.getElementsByTagName('audio')[0];
const playButton = document.getElementsByClassName('playstate')[0];
const stopButton = document.getElementsByClassName('stop')[0];
const nextButton = document.getElementsByClassName('next')[0];
const prevButton = document.getElementsByClassName('back')[0];
const songs = ['mp3/LA Chill Tour.mp3','mp3/LA Fusion Jam.mp3','mp3/This is it band.mp3'];
const vinyl = document.getElementsByClassName('mediaplayer')[0];

let name = document.getElementsByClassName('title')[0];
let titleRule = /(mp3)|(\/)|(\.)/g
let index = 0;

function playMusic () {
    vinyl.classList.toggle('play');
    if (vinyl.classList.contains('play')) {
        player.play()
    } else {
        player.pause()
    }
}

function stopMusic() {
    player.pause();
    player.currentTime = 0;
    vinyl.classList.remove('play')
}

function changeSongs(i) {
    player.src = songs[i];
    if (!(vinyl.classList.contains('play'))) {
        vinyl.classList.toggle('play')
    }
    player.play();
    name.title = songs[i].replace(titleRule,'');
}

playButton.onclick = playMusic;
stopButton.onclick = stopMusic;

nextButton.onclick = function () {
  index++;
  if(index > songs.length - 1) {
      index = 0;
  }
  changeSongs(index);
}

prevButton.onclick = function () {
  index--;
  if(index < 0) {
      index = songs.length - 1;
  }
  changeSongs(index);
}