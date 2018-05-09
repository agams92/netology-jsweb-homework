const inputs = document.querySelectorAll('label input');
const sendButton = document.querySelector('form .button-contact');
const changeButton = document.querySelector('main .button-contact');
const form = document.querySelector('.contentform');
const inputMessage = document.querySelector('textarea');
const wholeMessage = document.querySelector('#output');
let index = 0;

function transferData(item = this) {
    let fieldName = this.getAttribute('name');
    if (fieldName !== 'email' && fieldName !== 'phone') {
        let output = document.querySelector(`#${fieldName}`);   
        output.value = this.value;
    }
    if (this.value != ''){
        index++;
    } else {
        index--
    }
}

function zipFormat(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
}

function checkIndex() {
    if (index >= 10 && this.value) {
        sendButton.removeAttribute('disabled');
    } else if (!sendButton.getAttribute('disabled')){
        sendButton.setAttribute('disabled','')
    } else {
        return;
    }
}

function toggle(event) {
    event.preventDefault();
    form.classList.toggle('hidden');
    wholeMessage.classList.toggle('hidden');
}

for (let input of inputs) {
    if (input.getAttribute('name') === 'zip') {
        input.addEventListener('input', zipFormat);
    }
    input.addEventListener('change', transferData);
    input.addEventListener('input', checkIndex)
}

inputMessage.addEventListener('change', transferData);
inputMessage.addEventListener('input', checkIndex);
sendButton.addEventListener('click', toggle);
changeButton.addEventListener('click',toggle);



