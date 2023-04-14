const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');

function getTime() {

    let date = new Date();
    let minutes = date.getUTCMinutes();
    let hours = date.getHours();
    let seconds = date.getSeconds();
    clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function init() {

    getTime();
}

init();