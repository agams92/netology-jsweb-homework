'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  commentsContainer.appendChild(insertBlock(list.map(comment => createComment(comment))));
}

function createComment(comment) {
  return {
    tag: 'div', cls: 'comment-wrap',
    content: [
      {tag: 'div', cls: 'photo',
        attrs: {title: comment.author.name},
        content: {tag: 'div', cls: 'avatar',
                  attrs: {style: `background-image: url('${comment.author.pic}`}
        }
      },
      {
        tag: 'div', cls: 'comment-block',
        content: [
          {tag: 'p', cls: 'comment-text', txt: comment.text},
          {tag: 'div', cls: 'bottom-comment',
            content: [
              {tag: 'div', cls: 'comment-date', txt: new Date(comment.date).toLocaleString('ru-Ru')},
              {tag: 'ul', cls: 'comment-actions',
                content: [
                  {tag: 'li', cls: 'complain', txt: 'Пожаловаться'},
                  {tag: 'li', cls: 'reply', txt: 'Ответить'}
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function insertBlock(block) {
    if ((block === undefined) || (block === null) || (block === false)) {
        return document.createTextNode('');
    }

    if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
        return document.createTextNode(block);
    }

    if (Array.isArray(block)) {
        return block.reduce((f, elem) => {
            f.appendChild(insertBlock(elem));
            return f;
        }, document.createDocumentFragment());
    }

    let element = document.createElement(block.tag || 'div');
    [].concat(block.cls || [])
        .forEach(className => element.classList.add(className));
    if (block.attrs) {
        Object.keys(block.attrs)
            .forEach(key => element.setAttribute(key, block.attrs[key]))
    }
    if (block.txt) {
      element.innerText = block.txt;
    }
    element.appendChild(insertBlock(block.content));
    return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
