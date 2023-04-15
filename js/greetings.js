const form = document.querySelector('.js-form');
const input = document.querySelector('input');
const greetings = document.querySelector('.js-greetings');
const USERNAME = 'username';
const SHOWING_CN = 'showing';

/**
 * add text
 * change visibility
 * @param {string} text 
 */
function showGreetings(text) {

    greetings.innerText = `Привет, ${text}!`;
    greetings.classList.add(SHOWING_CN);
    form.classList.remove(SHOWING_CN);

}

/**
 * save the entered string in storage
 * @param {string} text 
 */
function saveUsername(text) {

    localStorage.setItem(USERNAME, text);

}

/**
 * handle the event
 * @param {object} event 
 */
function submitHandler(event) {

    event.preventDefault();

    let inputValue = input.value;
    showGreetings(inputValue);
    saveUsername(inputValue);

}

/**
 * change visibility
 * call handler
 */
function askUsername() {

    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', submitHandler);
}

/**
 * checking storage
 * work on availability
 */
function getUsername() {

    let username = localStorage.getItem(USERNAME);

    if (username == null) {

        askUsername();

    } else {

        showGreetings(username);

    }
}

/**
 * script initialization
 */
function init() {

    getUsername();

}

init();