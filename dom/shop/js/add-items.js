'use strict'
let totalItems = 0, 
    totalPrice = 0,
    buttons = document.querySelectorAll('button.add'),
    cartItems = document.querySelector('#cart-count'),
    cartPrice = document.querySelector('#cart-total-price');

function addItem() {
    totalItems += 1;
    totalPrice += Number(this.dataset.price);
    cartItems.innerHTML = totalItems;
    cartPrice.innerHTML = getPriceFormatted(totalPrice);
}

buttons.forEach(button => {
    button.addEventListener('click', addItem);
})