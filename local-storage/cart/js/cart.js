'use strict';
const colorsSnippet = document.getElementById('colorSwatch');
const sizeSnippet = document.getElementById('sizeSwatch');
const cartSnippet = document.getElementById('quick-cart');
const addButton = document.getElementById('AddToCart');
const cartForm = document.getElementById('AddToCartForm');
const thumbs = document.getElementsByClassName('thumbs')[0];
const bigImage = document.getElementById('big-image');

Array.from(thumbs.querySelectorAll('.thumb-image span img')).forEach((span) => {
    span.addEventListener('mouseover', event => changeImage(event,thumbs));
})
addButton.addEventListener('click', addToCart);

getColors();
getSizes();
updateCart();

function getColors (){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        let data = JSON.parse(xhr.responseText);
        data.forEach(color => {
            let presence, disabled, checked;
            if(color.isAvailable) {
                presence = 'available';
                disabled = '';
            } else {
                presence = 'soldout';
                disabled = 'disabled';
            }
            if (localStorage.colorChecked == color.type) {
                checked = 'checked';
            } else {
                checked = '';
            }
            colorsSnippet.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${presence}">
            <div class="tooltip">${color.title}</div>
            <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${checked} ${disabled}>
            <label for="swatch-1-${color.type}" style="border-color: red;">
              <span style="background-color: ${color.type};"></span>
              <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
            </label>
            </div>`
        })
        let inputs = colorsSnippet.getElementsByTagName('input');
        for (let input of inputs) {
            input.addEventListener('click', event => rememberChecked(event,inputs));
        }
    });
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
    xhr.send();
}

function getSizes() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        let data = JSON.parse(xhr.responseText);
        data.forEach(size => {
            let presence, disabled, checked;
            if(size.isAvailable) {
                presence = 'available';
                disabled = '';
            } else {
                presence = 'soldout';
                disabled = 'disabled';
            }
            if (localStorage.sizeChecked == size.type) {
                checked = 'checked';
            } else {
                checked = '';
            }
            sizeSnippet.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${presence}">
            <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${checked} ${disabled}>
            <label for="swatch-0-${size.type}">
              ${size.title}
              <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
            </label>
            </div>`
        })
        let inputs = sizeSnippet.getElementsByTagName('input');
        for (let input of inputs) {
            input.addEventListener('click', event => rememberChecked(event,inputs));
        }
    });
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
    xhr.send();
}

function updateCart() {
    let xhr = new XMLHttpRequest();
    try {
        xhr.addEventListener('load', (e) => {
            if(200 <= xhr.status && xhr.status < 300){
                let data = JSON.parse(xhr.responseText);
                let totalPrice = 0;
                let classOpen = '';
                cartSnippet.innerHTML = '';
                if(data.length > 0) {
                    data.forEach(product => {
                        cartSnippet.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
                        <div class="quick-cart-product-wrap">
                          <img src="${product.pic}" title="${product.title}">
                          <span class="s1" style="background-color: #000; opacity: .5">${product.price}</span>
                          <span class="s2"></span>
                        </div>
                        <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
                        <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
                        </div>`
                        totalPrice += product.price * product.quantity;
                    })
                    classOpen = 'open';
                }
                cartSnippet.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${classOpen}" >
                <span>
                    <strong class="quick-cart-text">Оформить заказ<br></strong>
                    <span id="quick-cart-price">${totalPrice}</span>
                </span>
                </a>`
                cartSnippet.addEventListener('click', removeFromCart)
            } else {
                throw new Error(error);
            }
        });
        xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
        xhr.send();
    } catch (error) {
        alert(error.message);
    }
}

function addToCart(event) {
    event.preventDefault();
    let formData = new FormData(cartForm);
    formData.append('productId',cartForm.dataset.productId);
    let xhr = new XMLHttpRequest();
    try {
        xhr.addEventListener('load', (e) => {
            if(200 <= xhr.status && xhr.status < 300) {
                let data = JSON.parse(xhr.responseText);
                if (data.error) {
                    alert(data.message);
                } else {
                    updateCart();
                }
            } else {
                throw new Error(error);
            }
        });
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
        xhr.send(formData);
    } catch (error) {
        alert(error.message);
    }
}

function removeFromCart(event) {
    if (!event.target.classList.contains('remove')) return;
    let xhr = new XMLHttpRequest();
    let product = new FormData();
    product.append('productId', event.target.dataset.id);
    try {
        xhr.addEventListener('load', (e) => {
            let data = JSON.parse(xhr.responseText);
            if(200 <= xhr.status && xhr.status < 300) {
                if (data.error) {
                    alert(data.message);
                } else {
                    updateCart();
                }
            } else {
                throw new Error(error)
            }
        });
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
        xhr.send(product)
    } catch (error) {
        alert(error.message);
    }
}

function rememberChecked(event,inputs) {
    for (let input of inputs) {
        input.removeAttribute('checked');
    }
    event.target.setAttribute('checked', 'checked');
    if(event.target.getAttribute('name') == 'color'){
        localStorage.colorChecked = event.target.getAttribute('value');
    } else if (event.target.getAttribute('name') == 'size') {
        localStorage.sizeChecked = event.target.getAttribute('value');
    }
}

function changeImage(event, thumbs) {
    let a = event.target.parentElement.parentElement;
    let url = a.href
    thumbs.querySelector('.active').classList.remove('active');
    a.classList.add('active');
    bigImage.setAttribute('style', `background-image:url('${url}')`);
}