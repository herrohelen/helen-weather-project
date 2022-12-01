// formatted date
function formattedDate() {
  let now = new Date();

  // day of week
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  // month
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
  let month = months[now.getMonth()];

  // year
  let year = now.getFullYear();

  // time
  let hour = now.getHours();
  let min = now.getMinutes();

  return (now = `${day}, ${month} ${now.getDate()}, ${year} | ${hour}:${min}`);
}

//capitalize city name
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// change date selector
let currentDate = document.querySelector("p.date");
currentDate.innerHTML = formattedDate();

let currentUnits = "metric";
let currentCity = "San Diego";
let windSpeedUnits = {imperial: " mph", metric: " km/h"};

function updateValues(newCity, temps, wind, weather, units) {
  let celciusLink = document.querySelector("#celcius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  if (units === "metric") {
    fahrenheitLink.classList.add("inactive-degrees");
    celciusLink.classList.remove("inactive-degrees");
  } else {
    fahrenheitLink.classList.remove("inactive-degrees");
    celciusLink.classList.add("inactive-degrees");
  }

  let tempCurrent = Math.round(temps.temp);
  let tempMainHeader = document.querySelector("#todays-weather-temp");
  tempMainHeader.innerHTML = `${tempCurrent}°`;

  let tempHigh = Math.round(temps.temp_max);
  let tempSidebarHigh = document.querySelector("#temp-high");
  tempSidebarHigh.innerHTML = tempHigh;
  let tempLow = Math.round(temps.temp_min);
  let tempSidebarLow = document.querySelector("#temp-low");
  tempSidebarLow.innerHTML = tempLow;

  let windSpeedElement = document.querySelector("#wind-speed-value");
  windSpeedElement.innerHTML = Math.round(wind.speed);
  let windSpeedUnitsElement = document.querySelector("#wind-speed-units");
  windSpeedUnitsElement.innerHTML = windSpeedUnits[units];

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = capitalizeFirstLetter(weather[0].description);

  let iconUrl = "http://openweathermap.org/img/w/" + weather[0].icon + ".png";
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute("src", iconUrl);
  weatherIconElement.setAttribute("alt", weather[0].description);

  let currentCityHeader = document.querySelector("h2");
  currentCityHeader.innerHTML = capitalizeFirstLetter(newCity);
  displayForecast();
}

function updateTempForCity(city, units) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  // let apiKey = "8fa43f1bb3c08595170oa2tf64203b0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(({data: {main: temps, wind, weather}}) => {
    currentUnits = units;
    currentCity = city;
    updateValues(city, temps, wind, weather, units);
  });
}

// search engine
function submitFormButton(event) {
  event.preventDefault();
  updateTempForCity(document.querySelector("#city-input").value, currentUnits);
}
let submitForm = document.querySelector("#city-search");
submitForm.addEventListener("submit", submitFormButton);

let celciusLink = document.querySelector("#celcius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
celciusLink.addEventListener("click", () => {
  updateTempForCity(currentCity, "metric");
  displayForecast();
});
fahrenheitLink.addEventListener("click", () =>
  updateTempForCity(currentCity, "imperial")
);
updateTempForCity("San Diego", "metric");

// //forecast for 7 days
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-list">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class=" col">
          <p class="day">
          <span class="day-of-the-week">${day}</span>
          <br />
            <span class="day-icon">
              <i class="bi bi-cloud-sun"></i>
           </span>
           <br />
           <b>74°</b>| 66°
          </p>
       </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
