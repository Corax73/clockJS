const COORDS = 'coordinates';
const WEATHERCONTAINER = document.querySelector('.js-weather');

/**
 * request to api
 * @param {float} lat 
 * @param {float} lng
 * @return a string to output to html
 */
function getWeather(lat, lng){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`)
        .then(function(response){

            return response.json();

        })
        .then(function(json){

            let temperature = json.main.temp;
            let place = json.name;
            let pressure = Math.round(json.main.pressure * 0.75008);
            WEATHERCONTAINER.innerText = `Temperature ${temperature}°, Pressure ${pressure} mm Hg @ ${place}`;

        });

}

/**
 * save data at storage as JSON
 * @param {object} positionObj 
 */
function saveCoords(positionObj) {

    localStorage.setItem(COORDS, JSON.stringify(positionObj));

}

/**
 * handle the event
 * @param {*} position 
 */
function geoSuccessHandler(position) {

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let positionObj = {
        latitude,
        longitude
    }
    saveCoords(positionObj);
    getWeather(latitude, longitude);

}

/**
 * handle the event
 * @return a string to output to html
 */
function geoErrorHandler() {

    WEATHERCONTAINER.innerText = 'Ошибка определения геопозиции';

}

/**
 * request via object navigator
 */
function askForCoords() {

    navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);

}

/**
 * checking the presence of coordinates in the storage, processing by availability
 */
function getCoords() {

    let coords = localStorage.getItem(COORDS);
    if (coords === null) {

        askForCoords();

    } else {

        let loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);

    }

}

/**
 * script initialization
 */
function init() {

    getCoords();

}

init();