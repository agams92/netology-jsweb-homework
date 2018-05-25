'use strict'
const select = document.getElementById('acSelect');
const buttonShowMap = document.getElementById('btnSeatMap');
const buttonFillMap = document.getElementById('btnSetFull');
const buttonEmptyMap = document.getElementById('btnSetEmpty');
const seatMap = document.getElementById('seatMapDiv');
const seatMapTitle = document.getElementById('seatMapTitle');
const totalReserved = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

buttonShowMap.addEventListener('click', event => formPlane(select.value));
buttonFillMap.addEventListener('click', fillMap);
buttonEmptyMap.addEventListener('click', emptyMap);
seatMap.addEventListener('click', reserveSeat);

if(!document.getElementsByClassName('seating-row')[0]){
    buttonFillMap.setAttribute('disabled',true);
    buttonEmptyMap.setAttribute('disabled',true);
}

function formPlane(planeModel) {
    event.preventDefault();
    buttonFillMap.setAttribute('disabled',true);
    buttonEmptyMap.setAttribute('disabled',true);
    fetch(`https://neto-api.herokuapp.com/plane/${planeModel}`)
        .then(res => res.json())
        .then(plane => {
            seatMap.innerHTML = '';
            totalReserved.innerText = 0;
            totalAdult.innerText = 0;
            totalHalf.innerText = 0;
            seatMapTitle.innerText = `${plane.title} (${plane.passengers} пассажиров)`;
            seatMap.appendChild(
                createScheme(plane.scheme.map((row,index) => createRow(row,index, plane.letters4, plane.letters6)))
            );
            buttonFillMap.removeAttribute('disabled');
            buttonEmptyMap.removeAttribute('disabled');
        })
}

function createRow(seatNumbers,index, seatLetters4, seatLetters6){
    let noSeatFour, noSeatAll, seat, noNumber = '';
    let i = 0;
    let i2 = 0;
    seat = 'seat';
    if (seatNumbers === 6) {
        noSeatFour = false;
        noSeatAll = false;
    } else if (seatNumbers === 4) {
        noSeatFour = 'no-seat';
        seatLetters6 = [];
    } else {
        seatLetters6 = [];
        seatLetters4 = [];
        noSeatFour = false;
        noSeatAll = 'no-seat';
    }
    return {
        tag: 'div', cls: ['row', 'seating-row', 'text-center'],
        content: [
            {tag: 'div', cls: ['col-xs-1','row-number'],content: {tag: 'h2', cls: 'class', txt: index + 1}},
            {tag: 'div', cls: 'col-xs-5',
                content: [
                    {tag: 'div', cls: ['col-xs-4', noSeatFour || noSeatAll || seat],
                        content: {tag: 'span', cls: 'seat-label', txt: seatLetters6[i++] || noNumber}},
                    {tag: 'div', cls: ['col-xs-4', noSeatAll || seat],
                        content: {tag: 'span', cls: 'seat-label', txt: seatLetters6[i++] || seatLetters4[i2++] || noNumber}},
                    {tag: 'div', cls: ['col-xs-4', noSeatAll || seat],
                        content: {tag: 'span', cls: 'seat-label', txt: seatLetters6[i++] || seatLetters4[i2++] || noNumber}}
                ]},
            {tag: 'div', cls: 'col-xs-5',
                content: [
                    {tag: 'div', cls: ['col-xs-4', noSeatAll || seat],
                        content: {tag: 'span', cls: 'seat-label', txt: seatLetters6[i++] || seatLetters4[i2++] || noNumber}},
                    {tag: 'div', cls: ['col-xs-4', noSeatAll || seat],
                        content: {tag: 'span', cls: 'seat-label', txt: seatLetters6[i++] || seatLetters4[i2++] || noNumber}},
                    {tag: 'div', cls: ['col-xs-4', noSeatFour || noSeatAll || seat],
                        content: {tag: 'span', cls: 'seat-label', txt: seatLetters6[i++] || noNumber}}
                ]},
        ]
    }
}

function createScheme(block){
    if ((block === undefined) || (block === null) || (block === false)) return document.createTextNode('');
    if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) return document.createTextNode(block);
    if (Array.isArray(block)) {
        return block.reduce((f, elem) => {
            f.appendChild(createScheme(elem));
            return f;
        }, document.createDocumentFragment());
    }

    let element = document.createElement(block.tag || 'div');
    [].concat(block.cls || [])
        .forEach(className => element.classList.add(className));
    element.appendChild(createScheme(block.content));
    if(block.txt) {
        element.innerText = block.txt;
    }
    return element;
}

function reserveSeat() {
    if(!event.target.classList.contains('col-xs-4') && !event.target.classList.contains('seat-label')) return;
    if (event.target.classList.contains('col-xs-4')) {
        if (event.altKey) {
            event.target.classList.remove('adult');
            event.target.classList.toggle('half');
        } else {
            event.target.classList.remove('half');
            event.target.classList.toggle('adult');
        }
    } else if (event.target.classList.contains('seat-label')) {
        if (event.altKey) {
            event.target.parentElement.classList.remove('adult');
            event.target.parentElement.classList.toggle('half');
        } else {
            event.target.parentElement.classList.remove('half');
            event.target.parentElement.classList.toggle('adult');
        }
    }
    calculateTotal();
}

function calculateTotal() {
    totalReserved.innerText = document.getElementsByClassName('half').length + document.getElementsByClassName('adult').length;
    totalAdult.innerText = document.getElementsByClassName('adult').length;
    totalHalf.innerText = document.getElementsByClassName('half').length;
}

function fillMap(){
    event.preventDefault();
    let seats = Array.from(seatMap.getElementsByClassName('col-xs-4'));
    seats.forEach(seat => {
        if (event.altKey) {
            seat.classList.add('half');
        } else {
            seat.classList.add('adult');
        }
    })
    calculateTotal();
}

function emptyMap(){
    event.preventDefault();
    let seats = Array.from(seatMap.getElementsByClassName('col-xs-4'));
    seats.forEach(seat => {
            seat.classList.remove('half');
            seat.classList.remove('adult');
        }
    )
    calculateTotal();
}