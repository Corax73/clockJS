const body = document.querySelector('body');
const IMAGE_NUMBER = 3;

/**
 * @returns int number
 */
function getRandom() {

    let number = Math.floor(Math.random() * IMAGE_NUMBER);

    return number;

}

/**
 * attaches a background image
 * @param {integer} number 
 */
function showImage(number){

    let img = new Image();

    img.src = `images/${number + 1}.jpg`;
    img.classList.add('bgImage');
    body.prepend(img);

}

/**
 * script initialization
 */
function init() {

    let randomNumber = getRandom();
    showImage(randomNumber);

}

init();