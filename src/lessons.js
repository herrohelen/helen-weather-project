//challenge 1

let now = new Date();
console.log(now);

//challenge 2
let milliseconds = now.getMilliseconds();
console.log(milliseconds);

//challenge 3
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
console.log(day);

//challenge 4
let year = now.getFullYear();
console.log(year);

//challenge 5
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
console.log(month);

//challenge 6
console.log(`Today is ${day}, ${month} ${now.getDate()}, ${year}`);

//challenge 7
function formatDate() {
  let now = new Date();
  return (now = `${day}, ${month} ${now.getDate()}, ${year}`);
}
console.log(formatDate(new Date()));

let weather = {
  paris: {
    name: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    name: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    name: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    name: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    name: "Oslo",
    temp: -5,
    humidity: 20,
  },
};

function convertToFarenheit(temp) {
  return (temp * 9) / 5 + 32;
}

function promptAndDisplayCity() {
  let city = prompt("Enter a city");
  if (city === null) {
    return;
  }
  let currentCity = weather[city.toLowerCase()];

  if (currentCity != null) {
    let temp = Math.round(currentCity.temp);
    alert(
      `It is currently ${temp}°C (${convertToFarenheit(temp)}°F) in ${
        currentCity.name
      } with a humidity of ${currentCity.humidity}%.`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city.replace(
        " ",
        ""
      )}`
    );
  }
}

promptAndDisplayCity();
