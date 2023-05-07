const body = document.querySelector('body');
const IMAGE_NUMBER = 3;
const bgImage = document.getElementById('bgImageSelector');
const imgBody = document.getElementById('imgBody');

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

    imgBody.src = `images/${number + 1}.jpg`;

}

/**
 * transferring the background selection menu to the corresponding random generation item
 */
function bgImageSelectorController() {

    let img;
    img = parseInt(imgBody.src.match(/\d+/));
    bgImage.options.selectedIndex = img - 1;

}

/**
 * background selection event handling
 */
function bgImageHandler() {

    bgImage.addEventListener('change', function() {

        let imgName;
        imgName = + bgImage.value;
        showImage(imgName);
    
    });

}

/**
 * script initialization
 */
function init() {

    let randomNumber = getRandom();
    bgImageHandler();
    showImage(randomNumber);
    bgImageSelectorController();

}

init();