'use strict'
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
            seatMapTitle.innerText = `${plane.title} (${plane.passengers} пассажиров)`;
            seatMap.appendChild(
                createScheme(plane.scheme.map((row,index) => createRow(row,index, plane.letters4, plane.letters6)))
            );
            buttonFillMap.removeAttribute('disabled');
            buttonEmptyMap.removeAttribute('disabled');
            Array.from(document.getElementsByClassName('col-xs-4')).forEach(seat => seat.addEventListener('click', reserveSeat));
            calculateTotal();
        })
}

function createRow(seatNumbers,index, seatLetters4, seatLetters6){
    let noSeatFour, noSeatAll;
    let seat = 'seat';
    let noNumber = '';
    let i = 0;
    let i2 = 0;
    if (seatNumbers === 4) {
        noSeatFour = 'no-seat';
        seatLetters6 = [];
    } else if (seatNumbers === 0) {
        noSeatAll = 'no-seat';
        seatLetters6 = [];
        seatLetters4 = [];
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

function reserveSeat(){
    if(event.currentTarget.classList.contains('no-seat')) return;
    if (event.altKey) {
        event.currentTarget.classList.remove('adult');
        event.currentTarget.classList.toggle('half');
    } else {
        event.currentTarget.classList.remove('half');
        event.currentTarget.classList.toggle('adult');
    }
    calculateTotal();
}

function fillMap(){
    event.preventDefault();
    let seats = Array.from(seatMap.getElementsByClassName('col-xs-4'));
    seats.forEach(seat => {
        if (seat.classList.contains('no-seat')) return;
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

function calculateTotal() {
    totalReserved.innerText = document.getElementsByClassName('half').length + document.getElementsByClassName('adult').length;
    totalAdult.innerText = document.getElementsByClassName('adult').length;
    totalHalf.innerText = document.getElementsByClassName('half').length;
}