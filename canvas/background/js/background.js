'use strict';
const canvas = document.querySelector('#wall');
const ctx = canvas.getContext('2d');
const objects = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#fff';

createObjects();
tick();

function createCross(x, y, size, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 5 * size;
    size = 20 * size;
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(angle);
    ctx.translate(- (x + size / 2), - (y + size / 2));
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x + size / 2, y + size);
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(x + size, y + size / 2);
    ctx.stroke();
    ctx.restore();
}

function createCircle(x, y, size) {
    ctx.beginPath();
    ctx.lineWidth = 5 * size;
    size = 12 * size;
    ctx.arc(x + size, y + size, size / 2, 0, 2 * Math.PI);
    ctx.stroke();
}

function createObjects() {
    const count = getRandomNumber(50, 200);
    for (let i = 0; i < count; i++) {
        let figure = {};
        figure.nextPosition = getTimeFunc();
        figure.x = getRandomNumber(5, canvas.width - 5);
        figure.y = getRandomNumber(5, canvas.height - 5);
        figure.size = getRandomNumber(0.1, 0.6, 2);
        if (i < count / 2) {
            figure.func = createCross;
            figure.type = 'cross';
            figure.stepAngle = getRandomNumber(0, 1) ? getRandomNumber(0, 0.2, 2) : getRandomNumber(0, 0.2, 2) * -1;
            figure.currentAngle = 0;
        } else {
            figure.func = createCircle;
            figure.type = 'circle';
        }
    objects.push(figure);
  }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(figure => {
        let coords = figure.nextPosition(figure.x, figure.y, Date.now());
        figure.func(coords.x, coords.y, figure.size, figure.currentAngle += figure.stepAngle);
        if (figure.currentAngle >= 2 * Math.PI || figure.currentAngle <= -2 * Math.PI) figure.currentAngle = 0;
    });
}

function getTimeFunc() {
    let randVal = getRandomNumber(0, 1);
    return randVal === 0 ? randomTime1 : randomTime2;

    function randomTime1(x,y,time) {
        return {
            x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
            y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
        };
    }
    function randomTime2(x,y,time) {
        return {
            x: x + Math.sin((x + (time / 10)) / 100) * 5,
            y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        };
    }
}

function getRandomNumber(min, max, digits = 0) {
    return Number((Math.random() * (max - min) + min).toFixed(digits));
}

function tick() {
    animate();
    requestAnimationFrame(tick);
}