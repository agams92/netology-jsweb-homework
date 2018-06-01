'use strict';
let longPoolingCards = document.querySelectorAll('.long-pooling div');

flipCardLP();

function flipCardLP(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        try{
            if(xhr.status >= 200 && xhr.status < 300){
                Array.from(longPoolingCards).forEach(card => {
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
        flipCardLP();
    });
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling', true);
    xhr.send();
}