'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

function sendCoordinates() {
    let coordinates = {};
    coordinates.pageX = event.pageX;
    coordinates.pageY = event.pageY;
    connection.send(JSON.stringify(coordinates));
}

connection.addEventListener('open', event => showBubbles(connection));
connection.addEventListener('error', event => console.log('Error= ' + event.error));