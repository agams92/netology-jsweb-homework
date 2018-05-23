'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', event => showBubbles(connection));
document.addEventListener('click', event => {
    let coordinates = {
        x : event.pageX,
        y : event.pageY
    };
    connection.send(JSON.stringify(coordinates));
});
