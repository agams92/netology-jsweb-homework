'use strict';

document.getElementsByClassName('items-list')[0].addEventListener('click', buttonAdd);

function buttonAdd() {
    console.log(event.currentTarget)
    if (!event.target.classList.contains('add-to-cart')) return;
    else {
        let item = {};
        item.title = event.target.dataset.title;
        item.price = event.target.dataset.price;
        addToCart(item);
    }
    
}