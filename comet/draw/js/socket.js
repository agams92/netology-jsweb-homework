'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
window.editor.addEventListener('update', updateDraw);

function updateDraw(){
    const canvas = document.getElementById('canvas');
    canvas.toBlob(img => ws.send(img));
}