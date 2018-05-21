'use strict'
const tabsList = document.querySelector('.tabs-nav');
const articlesList = document.querySelector('.tabs-content');
completeTabs();

function completeTabs() {
    let articles = articlesList.children;
    for (let i = 0; i < articles.length; i++) {
        let tab = tabsList.querySelector('li');
        tab.innerHTML = `<a class="fa ${articles[i].dataset.tabIcon}">${articles[i].dataset.tabTitle}</a>`;
        tabsList.appendChild(tab.cloneNode(true));
        articles[i].classList.add('hidden');
        if(i == articles.length - 1) tab.parentNode.removeChild(tab);
    }
    Array.from(tabsList.children).forEach((tab, index) => tab.addEventListener('click', event => changeClasses(index)));
    changeClasses(0);
}

function changeClasses(index) {
    console.log(index);
    if(tabsList.children[index].classList.contains('ui-tabs-active')) return;
    Array.from(tabsList.children).forEach(tab => tab.classList.remove('ui-tabs-active'));
    tabsList.children[index].classList.add('ui-tabs-active');
    Array.from(articlesList.children).forEach(article => article.classList.add('hidden'));
    articlesList.children[index].classList.remove('hidden');
}