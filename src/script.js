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

// change date selector
let currentDate = document.querySelector("p.date");
currentDate.innerHTML = formattedDate();

function updateTemp(result) {
  console.log(result);
  let tempCurrent = Math.round(result.data.main.temp);
  let tempMainHeader = document.querySelector("#todays-weather-temp");
  tempMainHeader.innerHTML = `${tempCurrent}°`;

  let tempHigh = Math.round(result.data.main.temp_max);
  let tempSidebarHigh = document.querySelector("#temp-high");
  tempSidebarHigh.innerHTML = tempHigh;
  let tempLow = Math.round(result.data.main.temp_min);
  let tempSidebarLow = document.querySelector("#temp-low");
  tempSidebarLow.innerHTML = tempLow;
}

// search engine
function submitFormButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = cityInput.value;

  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateTemp);
}
let submitForm = document.querySelector("#city-search");
submitForm.addEventListener("submit", submitFormButton);

// convert temperature
// function switchTempF(event) {
//   let currentTempF = document.querySelector("#todays-weather-temp");
//   currentTempF.innerHTML = "23°";
// }

// let useFarenheit = document.querySelector("#farenheit");
// useFarenheit.addEventListener("click", switchTempF);

// function switchTempC(event) {
//   let currentTempC = document.querySelector("#todays-weather-temp");
//   currentTempC.innerHTML = "50°";
// }
// let useCelcius = document.querySelector("#celcius");
// useCelcius.addEventListener("click", switchTempC);
