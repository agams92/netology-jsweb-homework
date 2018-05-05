'use strict'
const list = document.querySelector('#content');
let books = new XMLHttpRequest;
books.addEventListener('load', onLoad);
books.open('GET', 'https://neto-api.herokuapp.com/book/');
books.send();

function onLoad () {
    books = JSON.parse(this.responseText);
    console.log(books);
    let elements = '';
    books.forEach(book => {
        elements += `<li><img src=${book.cover.small}></li>`;
    });
    list.innerHTML = elements;
    elements = document.querySelectorAll('ul li');
    for (let i = 0; i < elements.length; i++) {
        elements[i].dataset.author = books[i].author.name;
        elements[i].dataset.title = books[i].title;
        elements[i].dataset.info = books[i].info;
        elements[i].dataset.price = books[i].price;
    }
}