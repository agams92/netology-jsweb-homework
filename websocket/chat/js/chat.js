'use strict';
const chat = document.getElementsByClassName('chat')[0];
const messageText = chat.getElementsByClassName('message-input')[0];
const sendButton = chat.getElementsByClassName('message-submit')[0];
const loadingTemplate = chat.getElementsByClassName('loading')[0];
const messagesField = chat.getElementsByClassName('messages-content')[0];
const chatStatus = chat.getElementsByClassName('chat-status')[0];
const connection = new WebSocket('ws://neto-api.herokuapp.com/chat');

sendButton.addEventListener('click', sendMessage);
connection.addEventListener('open', onLoad);
connection.addEventListener('message', handleMessage);
connection.addEventListener('close', onClose);

function onLoad() {
    chatStatus.innerText = chatStatus.dataset.online;
    sendButton.removeAttribute('disabled');
    let notification = createBasicMessage('Пользователь появился в сети');
    messagesField.appendChild(notification);
}

function onClose(){
    chatStatus.innerText = chatStatus.dataset.offline;
    sendButton.setAttribute('disabled','disabled');
    let notification = createBasicMessage('Пользователь не в сети');
    messagesField.appendChild(notification);
}

function createBasicMessage(text) {
    let node = document.createElement('div');
    let span = document.createElement('span');
    node.classList.add('message');
    span.classList.add('message-text');
    span.innerText = text;
    node.appendChild(span);
    return node;
}

function personalizeMessage(text, personal = false) {
    let rawTime = new Date();
    let time = `${rawTime.getHours()}:${rawTime.getMinutes()}`;
    let message = createBasicMessage(text);
    let timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.innerText = time;
    message.appendChild(timestamp);
    if (personal) {
        message.classList.add('message-personal');
    } else {
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        figure.classList.add('avatar');
        img.setAttribute('src','./i/profile-80.jpg');
        figure.appendChild(img);
        message.insertBefore(figure, message.querySelector('span'));
    }
    messagesField.appendChild(message);
}

function handleMessage(){
    if (event.data === '...') {
        let loading = loadingTemplate.cloneNode(true);
        loading.querySelector('span').innerText = 'Георгий печатает...';
        messagesField.appendChild(loading);
    } else if (event.data != 'Удачи'){
        if (messagesField.querySelector('.loading')) messagesField.removeChild(messagesField.querySelector('.loading'));
        let message = personalizeMessage(event.data);
    } else {
        let message = personalizeMessage(event.data);
        connection.close(1000, 'Вот и поговорили');
    }
    messagesField.scrollTop = messagesField.scrollHeight;
}

function sendMessage(){
    event.preventDefault();
    connection.send(messageText.value);
    personalizeMessage(messageText.value,true);
    messageText.value = '';
}