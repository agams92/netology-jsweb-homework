'use strict';
function createElement(node) {
    if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) return document.createTextNode(node);
    if (Array.isArray(node)) {
        return node.reduce((fragment, elem) => {
            fragment.appendChild(createElement(elem));
            return fragment;
        }, document.createDocumentFragment());
    }
    let element = document.createElement(node.name);
    if(node.props){
        Object.keys(node.props).forEach(key => element.setAttribute(key, node.props[key]));
    }
    element.appendChild(createElement(node.childs));
    console.log(element)
    return element;
}