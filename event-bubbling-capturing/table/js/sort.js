'use strict';

function handleTableClick(event) {
    if (!event.target.classList.contains('prop__name')) return;
    if(!event.target.dataset.dir) event.target.dataset.dir = -1;
    if(event.target.dataset.dir == -1) event.target.dataset.dir = 1;
    else event.target.dataset.dir = -1;
    let dir = event.target.dataset.dir;
    let name = event.target.dataset.propName;
    document.getElementsByTagName('table')[0].dataset.sortBy = name;
    sortTable(name,dir);
}