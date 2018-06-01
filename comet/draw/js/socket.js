'use strict';
let ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
window.editor.addEventListener('update', check);

function check(){
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let image = context.getImageData(0,0,canvas.width,canvas.height);
    let binary = Uint8Array.from(image.data);
    ws.send(binary.buffer);
}