'use strict'
const tabs = document.querySelectorAll('nav a');
const content = document.querySelector('#content');
const preloader = document.querySelector('#preloader');
let activeTab = document.getElementsByClassName('active')[0];

tabs.forEach(tab => {
    tab.addEventListener('click', changeActive);
})

function changeActive(event) {
    event.preventDefault();
    tabs.forEach(tab => {
        tab.classList.remove('active');
    })
    this.classList.add('active');
    activeRequest(this);
}

function activeRequest(source) {
    let href = source.getAttribute('href');
    let xhr = new XMLHttpRequest;
    xhr.addEventListener('loadstart', toggleLoader);
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('loadend', toggleLoader);
    xhr.open('GET', href);
    xhr.send();
}

function onLoad(event) {
    content.innerHTML = this.responseText;
}

function toggleLoader() {
    preloader.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', activeRequest(activeTab));