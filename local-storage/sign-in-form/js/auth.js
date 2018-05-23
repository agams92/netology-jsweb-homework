'use strict';
const signInForm = document.getElementsByClassName('sign-in-htm')[0];
const signUpForm = document.getElementsByClassName('sign-up-htm')[0];
const signInButton = signInForm.querySelector('.group .button');
const signUpButton = signUpForm.querySelector('.group .button');

signInButton.addEventListener('click', event => authRequest('https://neto-api.herokuapp.com/signin', signInForm));
signUpButton.addEventListener('click', event => authRequest('https://neto-api.herokuapp.com/signup', signUpForm));

function authRequest(url, dataSource) {
    event.preventDefault();
    let formData = new FormData(dataSource);
    // let form = {};
    // for (const [key, value] of formData) {
    //     form[key] = value;
    // }
    let output = dataSource.getElementsByClassName('error-message')[0];
    let xhr = new XMLHttpRequest();
    try {
        xhr.addEventListener('load',(e) => {
            if(200 <= xhr.status && xhr.status < 300) {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                if (dataSource === signInForm) {
                    if (data.error) {
                        output.value = data.message;
                    } else {
                        output.value = `Пользователь ${data.name} успешно авторизован`;
                    }
                } else if (dataSource === signUpForm) {
                    if (data.error) {
                        output.value = data.message;
                    } else {
                        output.value = `Пользователь ${data.name} успешно зарегистрирован`;
                    }
                }
            }
        })
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(formData));
    } catch (error) {
        output.value = error.message;
    }
}