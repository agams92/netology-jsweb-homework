'use strict'
const buttons = document.getElementsByClassName('drum-kit__drum');
		
function playMusic() {
   let sound = this.getElementsByTagName('audio')[0]
   if (sound.currentTime > 0) {
       sound.load();
       sound.play();
   } else {
       sound.play();
   }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = playMusic;
}
