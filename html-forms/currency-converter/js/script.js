const selectFrom = document.querySelector('#from');
const selectTo = document.querySelector('#to');
const output = document.querySelector('output');
const numberToConvert = document.querySelector('input');

let currencies = new XMLHttpRequest();
currencies.addEventListener('loadstart', onStart);
currencies.addEventListener('load', onLoad);
currencies.addEventListener('loadend', onEnd);
currencies.open('GET','https://neto-api.herokuapp.com/currency');
currencies.send();

function onStart() {
    document.querySelector('#loader').classList.toggle('hidden');
}
function onEnd() {
    document.querySelector('#content').classList.toggle('hidden');
    onStart();
}
function onLoad() {
    currencies = JSON.parse(currencies.responseText);
    let list = '';
    for (let currency of currencies) {
        list += `<option value='${currency.value}'>${currency.code}</option>`;
    }
    selectFrom.innerHTML = list;
    selectTo.innerHTML = list;
    convert();
    console.log(currencies);
}

numberToConvert.addEventListener('input', convert);
selectFrom.addEventListener('change', convert);
selectTo.addEventListener('change', convert);

function convert() {
    output.value = (Number(numberToConvert.value) * selectFrom.value / selectTo.value).toFixed(2);
}