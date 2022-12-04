let iconMapping = {
  "clear-sky": "bi-brightness-high",
  "clear-sky-night": "bi-moon-stars",
  "few-clouds": "bi-cloud-sun",
  "few-clouds-night": "bi-cloud-moon",
  "scattered-clouds": "bi-cloudy",
  "broken-clouds": "bi-clouds",
  "shower-rain": "bi-cloud-rain",
  rain: "bi-cloud-drizzle",
  thunderstom: "bi-cloud-lightning",
  snow: "bi-snow2",
  mist: "bi-cloud-haze",
};

function getIconClassName(iconName) {
  let iconNameTimeOfDay = iconName;
  let iconNameGeneral = iconName.split("-").slice(0, -1).join("-");
  return iconMapping[iconNameTimeOfDay] ?? iconMapping[iconNameGeneral];
}

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

let apiKey = "8fa43f1bb3c08595170oa2tf64203b0b";
let currentUnits = "metric";
let currentCity = "San Diego";
let windSpeedUnits = {imperial: " mph", metric: " km/h"};

function getForecast({longitude, latitude}, units) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  https: axios.get(apiUrl).then(displayForecast);
}

function updateValues(newCity, temps, wind, condition, units, coord) {
  let celciusLink = document.querySelector("#celcius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  if (units === "metric") {
    fahrenheitLink.classList.remove("active-degrees");
    celciusLink.classList.add("active-degrees");
  } else {
    fahrenheitLink.classList.add("active-degrees");
    celciusLink.classList.remove("active-degrees");
  }

  let tempCurrent = Math.round(temps.current);
  let tempMainHeader = document.querySelector("#todays-weather-temp");
  tempMainHeader.innerHTML = `${tempCurrent}°`;

  //daily wind speed
  let windSpeedElement = document.querySelector("#wind-speed-value");
  windSpeedElement.innerHTML = Math.round(wind.speed);
  let windSpeedUnitsElement = document.querySelector("#wind-speed-units");
  windSpeedUnitsElement.innerHTML = windSpeedUnits[units];

  //capitalize city search
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = capitalizeFirstLetter(condition.description);

  // today's weather icon
  let weatherIconElement = document.querySelector("#weather-icon");
  // weatherIconElement.setAttribute("src", condition.icon_url);
  weatherIconElement.setAttribute("alt", condition.description);
  weatherIconElement.classList = `bi ${getIconClassName(condition.icon)}`;

  let currentCityHeader = document.querySelector("h2");
  currentCityHeader.innerHTML = capitalizeFirstLetter(newCity);
  getForecast(coord, units);
}

function updateTempForCity(city, units) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios
    .get(apiUrl)
    .then(({data: {city, temperature, wind, coordinates, condition}}) => {
      currentUnits = units;
      currentCity = city;
      updateValues(city, temperature, wind, condition, units, coordinates);
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
});
fahrenheitLink.addEventListener("click", () =>
  updateTempForCity(currentCity, "imperial")
);
updateTempForCity("San Diego", "metric");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// //forecast for 7 days
function displayForecast(response) {
  console.log({RESPONSEL: response});

  // daily high and low
  let tempHigh = Math.round(response.data.daily[0].temperature.maximum);
  let tempSidebarHigh = document.querySelector("#temp-high");
  tempSidebarHigh.innerHTML = tempHigh;
  let tempLow = Math.round(response.data.daily[0].temperature.minimum);
  let tempSidebarLow = document.querySelector("#temp-low");
  tempSidebarLow.innerHTML = tempLow;

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-list">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
          <div class=" col">
            <p class="day">
            <span class="day-of-the-week">${formatDay(forecastDay.time)}</span>
            <br />
              <span class="day-icon">
                <i class="bi ${getIconClassName(
                  forecastDay.condition.icon
                )}"></i>
             </span>
             <br />
             <b>${Math.round(
               forecastDay.temperature.maximum
             )}°</b>| ${Math.round(forecastDay.temperature.minimum)}°
            </p>
         </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
