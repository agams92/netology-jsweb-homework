'use strict';
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
let drawning = false;
let currentPoint, previousPoint = false;
let colorHue = 0;
let lineWidth = 100;
let lineWidthMax = 100;
let lineWidthMin = 5;
let widthDown = true;

window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('dblclick', clearCanvas);
canvas.addEventListener('mousedown', () => drawning = true);
canvas.addEventListener('mousemove', event => drawLine(event));
canvas.addEventListener('mouseup', () => {
    drawning = false;
    previousPoint = false;
});
canvas.addEventListener('mouseleave', () => drawning = false);
resizeCanvas();

function drawLine(event){
    if (drawning) {
        currentPoint = [event.offsetX, event.offsetY];
        ctx.beginPath();
        ctx.arc(event.offsetX,event.offsetY,0,0,2 * Math.PI);
        if(previousPoint) {
            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.moveTo(...previousPoint);
            ctx.quadraticCurveTo(...previousPoint, ...currentPoint);
            ctx.strokeStyle = `hsl(${colorHue}, 100%, 50%`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
        ctx.closePath();
        handleColor(event);
        handleWidth();
        previousPoint = currentPoint;
    }
}

function handleColor(event) {
    event.shiftKey ? colorHue -- : colorHue++;
    if (colorHue == 359) colorHue = 0;
    else if (colorHue == 0) colorHue = 359;
}

function handleWidth() {
    if (widthDown && lineWidth > lineWidthMin) {
        lineWidth--;
        if(lineWidth == lineWidthMin) widthDown = false;
    } else {
        lineWidth++;
        if (lineWidth == lineWidthMax) widthDown = true;
    }
}

function resizeCanvas(){
    canvas.setAttribute('width',`${innerWidth}`);
    canvas.setAttribute('height',`${innerHeight}`); 
    clearCanvas();
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}