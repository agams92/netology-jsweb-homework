'use strict';
const webSocketCards = document.querySelectorAll('.websocket div');

let ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
ws.addEventListener('message', flipCardWS);

function flipCardWS(){
    try{
        Array.from(webSocketCards).forEach(card => {
            card.classList.remove('flip-it');
            if (Number(card.innerText) === Number(event.data)) {
                card.classList.add('flip-it');
            }
        })
    } catch(error) {
        console.log(error.message);
    }
}