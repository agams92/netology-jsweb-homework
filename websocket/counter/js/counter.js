'use strict';
const openConnectionsCount = document.getElementsByClassName('counter')[0];
const errorConnectionsCount = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', event => console.log('Соединение открыто'));
connection.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    openConnectionsCount.innerText = data.connections;
    errorConnectionsCount.innerText = data.errors;
})
window.addEventListener('beforeunload', event => {
    connection.close(1000, 'WASTED');
})
