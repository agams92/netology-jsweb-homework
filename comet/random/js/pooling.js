'use strict';
const cards = document.querySelectorAll('.pooling div');
let xhr = new XMLHttpRequest();

xhr.addEventListener('load', flipCardP);

setInterval(() => {
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
    xhr.send();
}, 5000)

function flipCardP() {
    try{
        if(xhr.status >= 200 && xhr.status < 300){
            Array.from(cards).forEach(card => {
                card.classList.remove('flip-it');
                if (Number(card.innerText) === Number(xhr.responseText)) {
                    card.classList.add('flip-it');
                }
            })
        } else {
            throw new Error();
        }
    } catch(error) {
        console.log(error.message);
    }
}