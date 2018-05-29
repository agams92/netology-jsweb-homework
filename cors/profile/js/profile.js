'use strict';
loadData('https://neto-api.herokuapp.com/profile/me')
    .then(insertUser)

function loadData(url){
    const functionName = 'callback' + (Math.random() * (1000 - 1) + 1).toFixed(0);
    return new Promise((done,fail) => {
        window[functionName] = done;
        const script = document.createElement('script')
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
    })
}

function insertUser(user) {
    document.querySelector('[data-name]').innerText = user.name;
    document.querySelector('[data-description]').innerText = user.description;
    document.querySelector('[data-pic]').setAttribute('src', user.pic);
    document.querySelector('[data-position]').innerText = user.position;
    let techUrl = `https://neto-api.herokuapp.com/profile/${user.id}/technologies`;
    loadData(techUrl)
        .then(insertTechs);
}

function insertTechs(techs) {
    let spans = techs.reduce((fragment, tech) => {
        let span = document.createElement('span');
        span.classList.add('devicons',`devicons-${tech}`);
        fragment.appendChild(span);
        return fragment;
    }, document.createDocumentFragment());
    document.querySelector('[data-technologies]').appendChild(spans);
    document.querySelector('.content').setAttribute('style','display: initial');
}
