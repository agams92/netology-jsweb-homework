'use strict'
const buttons = document.querySelectorAll('nav a');
const gallery = document.querySelector('.slides');
const slides = gallery.querySelectorAll('.slide');
let prevButton, nextButton, firstButton, lastButton;

Array.from(buttons).forEach(button => {
    let data = button.getAttribute('data-action');
    switch (data) {
        case 'prev':
            prevButton = button;
            prevButton.addEventListener('click', event => moveSlide(event, false));
        break;
        case 'next':
            nextButton = button;
            nextButton.addEventListener('click', event => moveSlide(event, true));
        break;
        case 'first':
            firstButton = button;
            firstButton.addEventListener('click', event => moveAllSlides(event, false));
        break;
        case 'last':
            lastButton = button;
            lastButton.addEventListener('click', event => moveAllSlides(event, true));
        break;
    }
})

formatClasses(slides[1], slides[0]);

function moveSlide(event, isForward) {
    if(event.target.classList.contains('disabled')) return;
    const currentSlide = gallery.querySelector('.slide-current');
    const toSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
    formatClasses(currentSlide, toSlide);
}

function moveAllSlides(event, isForward) {
    if(event.target.classList.contains('disabled')) return;
    const currentSlide = gallery.querySelector('.slide-current');
    const toSlide = isForward ? slides[slides.length - 1] : slides[0];
    formatClasses(currentSlide, toSlide);
}

function formatClasses(currentSlide, toSlide) {
    currentSlide.classList.remove('slide-current');
    toSlide.classList.add('slide-current');
    if (!toSlide.previousElementSibling) {
        prevButton.classList.add('disabled');
        firstButton.classList.add('disabled');
    }
    else {
        prevButton.classList.remove('disabled');
        firstButton.classList.remove('disabled');
    }
    if (!toSlide.nextElementSibling) {
        nextButton.classList.add('disabled');
        lastButton.classList.add('disabled');
    }
    else {
        nextButton.classList.remove('disabled');
        lastButton.classList.remove('disabled');
    }
}