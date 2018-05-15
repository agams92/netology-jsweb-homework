'use strict'
const tabsList = document.querySelector('.tabs-nav');
const articlesList = document.querySelector('.tabs-content');
completeTabs();

function completeTabs() {
    for (let i = 0; i < 2; i++) {
        let tab = tabsList.querySelector('li').cloneNode(true);
        tabsList.appendChild(tab);
    }
    let tabs = tabsList.querySelectorAll('li');
    let articles = articlesList.children;
    for (let i = 0; i < 3; i++) {
        tabs[i].innerHTML = '<a class="fa ' + articles[i].dataset.tabIcon + '">' + articles[i].dataset.tabTitle + '</a>';
        articles[i].classList.add('hidden');
        tabs[i].addEventListener('click', event => changeClasses(tabs, articles, i));
    }
    changeClasses(tabs, articles, 0);
}

function changeClasses(tabs, articles, index) {
    if(!tabs[index].classList.contains('ui-tabs-active') && articles[index].classList.contains('hidden')){
        Array.from(tabs).forEach(tab => tab.classList.remove('ui-tabs-active'));
        tabs[index].classList.add('ui-tabs-active');
        Array.from(articles).forEach(article => article.classList.add('hidden'));
        articles[index].classList.remove('hidden');
    } else {
        return;
    }
}