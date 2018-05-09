const list = document.querySelector('.list-block');
const inputs = document.querySelectorAll('.list-block li input');
const output = document.querySelector('output');
let checkedInputs = Array.from(inputs).filter(input => {
    return input.checked === true;
}).length;

for (let input of inputs) {
    input.addEventListener('click', check);
}

function check() {
    if (this.checked) checkedInputs++;
    if (!this.checked) checkedInputs--;
    if (checkedInputs === inputs.length) {
        list.classList.add('complete');
    } else {
        list.classList.remove('complete');
    }
    output.value = `${checkedInputs} из ${inputs.length}`;
}

output.value = `${checkedInputs} из ${inputs.length}`;