'use strict';
const plus = document.getElementById('increment');
const minus = document.getElementById('decrement');
const reset = document.getElementById('reset');
const counter = document.getElementById('counter');

document.getElementsByClassName('wrap-btns')[0].addEventListener('click', count);

if(!localStorage.counter) {
    localStorage.counter = 0;
}
counter.innerText = localStorage.counter;

function count(event) {
    if (event.target == plus) localStorage.counter++;
    else if(event.target == minus) localStorage.counter--;
    else if(event.target == reset) localStorage.counter = 0;
    counter.innerText = localStorage.counter;
}