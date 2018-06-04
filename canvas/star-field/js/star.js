const canvas = document.getElementsByTagName('canvas')[0];
const maxHeight = canvas.height;
const maxWidth = canvas.width;
const ctx = canvas.getContext('2d');
const colors = ['#ffffff','#ffe9c4','#d4fbff'];
const minStars = 200;
const maxStars = 400;
let starsCount = getRandomNumber(minStars,maxStars).toFixed(0);

canvas.setAttribute('style','background-color: #000');
canvas.addEventListener('click',generateStars);

function generateStars(){
    ctx.clearRect(0,0,maxWidth,maxHeight);
    let i = minStars;
    for(i; i < starsCount; i++) {
        createStar();
    }
}

function createStar() {
    ctx.beginPath();
    let x = Number(getRandomNumber(0, maxWidth).toFixed(0));
    let y = Number(getRandomNumber(0, maxHeight).toFixed(0));
    let size = Number(getRandomNumber(0, 1.1).toFixed(1));
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.globalAlpha = getRandomNumber(0.8, 1);
    ctx.strokeStyle = colors[getRandomNumber(0, 2).toFixed(0)];
    ctx.stroke();
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}