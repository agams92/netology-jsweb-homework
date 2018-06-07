'use strict';
const video = document.createElement('video');
const canvas = document.createElement('canvas');
const gallery = document.getElementsByClassName('list')[0];
const ctx = canvas.getContext('2d');
if(!navigator.mediaDevices) handleError(new Error);
if(!navigator.getUserMedia) handleError(new Error);

createScene();
navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => video.srcObject = stream)
    .catch(err => handleError(err));

function createScene() {
    const app = document.getElementsByClassName('app')[0];
    app.addEventListener('dblclick', returnVideo);
    app.appendChild(video);
    app.appendChild(canvas);
    video.setAttribute('autoplay',true);
    document.getElementsByClassName('controls')[0].style.display = 'block';
    const button = document.getElementById('take-photo');
    button.setAttribute('style',`position: absolute; left: calc(50% - 32px); bottom: 5%;`);
    button.addEventListener('click', takeSnapshot);
}

function takeSnapshot() {
    if(!video.srcObject) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.drawImage(video, 0, 0);
    video.style.display = 'none';
    canvas.style.display = 'block';

    const url = canvas.toDataURL();
    const newSnapshot = insertPicture(createPicture(url));
    const oldSnapshot = gallery.getElementsByTagName('figure')[0];
    newSnapshot.addEventListener('click', url => handleSnapshotClick(url));
    gallery.insertBefore(newSnapshot, oldSnapshot);
}

function handleSnapshotClick(url) {
    const figure = event.currentTarget;
    const downloadButton = figure.querySelectorAll('figcaption a')[0];
    const uploadButton = figure.querySelectorAll('figcaption a')[1];
    const deleteButton = figure.querySelectorAll('figcaption a')[2];
    if(event.target.innerText === 'delete' || event.target == deleteButton) {
        gallery.removeChild(event.currentTarget);
    } else if (event.target.innerText === 'file_download' || event.target == downloadButton) {
        downloadButton.style.display = 'none';
    } else if (event.target.innerText === 'file_upload' || event.target == uploadButton) {
        const image = figure.firstElementChild;
        const upCanvas = document.createElement('canvas');
        upCanvas.width = image.naturalWidth;
        upCanvas.height = image.naturalHeight;
        const upCtx = upCanvas.getContext('2d');
        upCtx.drawImage(image, 0, 0);
        const data = new FormData();
        upCanvas.toBlob((blob) => {
            data.append('image', blob);
            fetch('https://neto-api.herokuapp.com/photo-booth', {
                method: 'POST',
                body: data
            })
                .then(uploadButton.style.display = 'none')
                .catch(error => console.log(error));
        })
    }
}

function returnVideo() {
    video.style.display = 'block';
    canvas.style.display = 'none';
}

// Технические функции - создание элемента, обработка ошибки

function createPicture(src) {
    return {
      tag: 'figure',
      content: [
        {tag: 'img', attrs: {src: src}},
        {tag: 'figcaption',
          content: [
            {tag: 'a', 
                attrs: {href: src, download: 'snapshot.png'},
                content: {tag: 'i', cls: 'material-icons', txt: 'file_download'}},
            {tag: 'a',
                content: {tag: 'i', cls: 'material-icons', txt: 'file_upload'}},
            {tag: 'a',
                content:{tag: 'i', cls: 'material-icons', txt: 'delete'}},
          ]
        }
      ]
    }
}

function insertPicture(block) {
    if ((block === undefined) || (block === null) || (block === false)) return document.createTextNode('');
    if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) return document.createTextNode(block);

    if (Array.isArray(block)) {
        return block.reduce((f, elem) => {
            f.appendChild(insertPicture(elem));
            return f;
        }, document.createDocumentFragment());
    }

    let element = document.createElement(block.tag || 'div');
    [].concat(block.cls || []).forEach(className => element.classList.add(className));
    if (block.attrs) {
        Object.keys(block.attrs).forEach(key => element.setAttribute(key, block.attrs[key]))
    }
    if (block.txt) element.innerText = block.txt;
    element.appendChild(insertPicture(block.content));
    return element;
}

function handleError(error) {
    const errorContainer = document.getElementById('error-message');
    errorContainer.innerText = error;
    errorContainer.style.display = 'inline-block';
    video.style.display = 'none';
    document.getElementsByClassName('controls')[0].style.display = 'none';
}