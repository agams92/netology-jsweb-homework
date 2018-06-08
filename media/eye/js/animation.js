'use strict';
const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');
let eyePoint = {
    x: 0,
    y: 0
};
let mousePos = {
    x: 0,
    y: 0
};

document.addEventListener('mousemove', event => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
});

requestAnimationFrame(tick);

function tick(timestamp) {
    getEyePoint();
    pupil.style.setProperty('--pupil-size', getPupilSize());
    const shift = getPupilShift();
    pupil.style.setProperty('--pupil-x', `${shift.x}px`);
    pupil.style.setProperty('--pupil-y', `${shift.y}px`);
    requestAnimationFrame(tick);
}

function getEyePoint() {
    const coords = eye.getBoundingClientRect();
    eyePoint = {
        x: coords.left + (coords.right - coords.left) / 2,
        y: coords.top + (coords.bottom - coords.top) / 2
  };
}

function getDistance(to, from) {
    return Math.sqrt(Math.pow((to.x - from.x), 2) + Math.pow((to.y - from.y), 2));
}

function getPupilSize() {
    const distance = getDistance(mousePos, eyePoint);
    return Math.max((1 - Math.min(distance / eyePoint.x, 1)) * 3, 1);
}

function getPupilShift() {
    const shift = {
        x: 0,
        y: 0
    };
    shift.x = getShift(mousePos.x, eyePoint.x, document.documentElement.clientWidth);
    shift.y = getShift(mousePos.y, eyePoint.y, document.documentElement.clientHeight);
    return shift;
}

function getShift(coord1, coord2, axisSize) {
    const shift = coord1 > coord2 ? (coord1 - coord2) / (axisSize - coord2) * 30 : (coord1 - coord2) / coord2 * 30;
    return Math.min(shift, 30);
}