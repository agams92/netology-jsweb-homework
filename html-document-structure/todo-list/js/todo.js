'use strict'
const tasks = document.querySelectorAll('main section label input');
const doneSection = document.querySelector('.done');
const undoneSection = document.querySelector('.undone');

Array.from(tasks).forEach(task => task.addEventListener('click', moveTask));

function moveTask() {
    let parentSection = this.parentNode.parentNode;
    let parentLabel = this.parentNode;
    switch (parentSection) {
        case doneSection:
            this.removeAttribute('checked');
            undoneSection.appendChild(parentLabel);
        break;
        case undoneSection:
            this.setAttribute('checked','');
            doneSection.appendChild(parentLabel);
    }
}