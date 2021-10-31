// show current day
function formatDate() {
  let date = new Date();
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let todayDate = date.getDate();

  return `${day}, ${month} ${todayDate}, ${hours}:${minutes}`;
}

// show forecast days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// show forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

    <div class="col-2">
      <div class="weather-forecast-day"></div>
      ${formatDay(forecastDay.dt)}
      <div><img class="forecast-image" src="media/icons/${
        forecastDay.weather[0].icon
      }.png" />
      </div><div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "8349c141fbb6f5894a4cba912fc31bd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// show current conditions
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `media/icons/${response.data.weather[0].icon}.png`
  );

  getForecast(response.data.coord);
}

// search form
function search(city) {
  let apiKey = "8349c141fbb6f5894a4cba912fc31bd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// get current location
function showCurrentLocation() {
  function getApiUrl(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8349c141fbb6f5894a4cba912fc31bd0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
  }
  navigator.geolocation.getCurrentPosition(getApiUrl);
}

// greeting
function checkTimeOfDay() {
  let date = new Date();
  let hours = date.getHours();

  if (hours < 6) {
    let greetingElement = document.querySelector("#greeting");
    greetingElement.innerHTML = "Good night";
  } else if (hours >= 6 && hours < 12) {
    let greetingElement = document.querySelector("#greeting");
    greetingElement.innerHTML = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    let greetingElement = document.querySelector("#greeting");
    greetingElement.innerHTML = "Good afternoon";
  } else {
    let greetingElement = document.querySelector("#greeting");
    greetingElement.innerHTML = "Good evening";
  }
}

showCurrentLocation();
checkTimeOfDay();
