let timer = 0;
let timerInterval;
const milliseconds = document.getElementById('milliseconds');
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');

/**
 * start or continue timing
 * button access control
 */
function start() {
    
    pause();
    startCountdown.disabled = true;
    pauseCountdown.disabled = false;
    stopCountdown.disabled = false;

    timerInterval = setInterval(function() {

        timer += 1/60;
        millisecondsValue = Math.floor((timer - Math.floor(timer))*100);
        secondsValue = Math.floor(timer) - Math.floor(timer/60) * 60;
        minutesValue = Math.floor(timer/60);

        milliseconds.innerHTML = millisecondsValue < 10 ? '0' + millisecondsValue.toString() : millisecondsValue;
        seconds.innerHTML = secondsValue < 10 ? '0' + secondsValue.toString() : secondsValue;
        minutes.innerHTML = minutesValue < 10 ? '0' + minutesValue.toString() : minutesValue;

    }, 
    
    1000/60);

}

/**
 * stop timing
 * button access control
 */
function pause() {

    startCountdown.disabled = false;
    pauseCountdown.disabled = true;
    clearInterval(timerInterval);

}

/**
 * stop and reset timing
 * button access control
 */
function stop() {
    
    clearInterval(timerInterval);
    startCountdown.disabled = false;
    pauseCountdown.disabled = true;
    stopCountdown.disabled = true;
    timer = 0;
    milliseconds.innerHTML = seconds.innerHTML = minutes.innerHTML = '00';

}

/**
 * handle the event
 */
function stopwatchHandler() {

    startCountdown.addEventListener('click', start);

    pauseCountdown.addEventListener('click', pause);

    stopCountdown.addEventListener('click', stop);

}

/**
 * script initialization
 */
function init() {

    pauseCountdown.disabled = true;
    stopCountdown.disabled = true;
    stopwatchHandler();

}

init();