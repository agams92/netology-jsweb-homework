'use strict';
loadData('https://neto-api.herokuapp.com/twitter/jsonp')
    .then(insertData)

function loadData(url){
    const functionName = 'callback' + (Math.random() * (1000 - 1) + 1).toFixed(0);
    return new Promise((done,fail) => {
        window[functionName] = done;
        const script = document.createElement('script')
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
    })
}

function insertData(user){
    document.querySelector('[data-wallpaper]').setAttribute('src', user.wallpaper);
    document.querySelector('[data-username]').innerText = user.username;
    document.querySelector('[data-description]').innerText = user.description;
    document.querySelector('[data-pic]').setAttribute('src', user.pic);
    document.querySelector('[data-tweets]').value = user.tweets;
    document.querySelector('[data-followers]').value = user.followers;
    document.querySelector('[data-following]').value = user.following;
}