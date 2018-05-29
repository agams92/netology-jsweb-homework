'use strict';
let foodId = 42;
Promise.all([loadData(`https://neto-api.herokuapp.com/food/${foodId}`), 
            loadData(`https://neto-api.herokuapp.com/food/${foodId}/rating`), 
            loadData(`https://neto-api.herokuapp.com/food/${foodId}/consumers`)
        ])
        .then(results => {
            insertRecipe(results[0]);
            insertRating(results[1]);
            insertUser(results[2]);
        })
        .catch(error => {
            console.log(error);
        })

function loadData(url){
    const functionName = 'callback' + (Math.random() * (1000 - 1) + 1).toFixed(0);
    return new Promise((done,fail) => {
        window[functionName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
    });
}

function insertRecipe(recipe){
    document.querySelector('[data-pic]').setAttribute('style', `background-image: url(${recipe.pic})`);
    document.querySelector('[data-title]').innerText = recipe.title;
    document.querySelector('[data-ingredients]').innerText = recipe.ingredients.join(', ') + '.';
}

function insertRating(rating) {
    document.querySelector('[data-rating]').innerText = rating.rating.toFixed(2);
    document.querySelector('[data-votes]').innerText = `(${rating.votes} оценок)`;
    document.querySelector('[data-star]').setAttribute('style',`width: ${rating.rating.toFixed(1) * 10}%`);
}

function insertUser(users) {
    let consumers = users.consumers;
    let avatars = consumers.reduce((f, consumer, index) => {
        let avatar = document.createElement('img');
        avatar.setAttribute('src', consumer.pic);
        avatar.setAttribute('title', consumer.name);
        f.appendChild(avatar);
        if (index == consumers.length - 1) {
            let totalConsumers = document.createElement('span');
            totalConsumers.innerText = `(${users.total})`;
            f.appendChild(totalConsumers);
        }
        return f;
    }, document.createDocumentFragment());
    document.querySelector('[data-consumers]').appendChild(avatars);
}