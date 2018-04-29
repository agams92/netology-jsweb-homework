'use strict'
const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
let input, codeWord = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';

function enableNav(event) {
    if(!event.ctrlKey && !event.altKey) {
        return;
    } else if (event.code == 'KeyT') {
        nav.classList.toggle('visible');
    }
}

function checkPhrase(event) {
    input += event.code;
    if(input.search(codeWord) != -1) {
        input = 0;
        secret.classList.toggle('visible');
    }
    console.log(input);
}

document.addEventListener('keydown', enableNav);
document.addEventListener('keydown', checkPhrase);