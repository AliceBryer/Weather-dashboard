// hamburger function

// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }

  // time & date in Navbar
var dt = new Date().format;
var formatedDt = moment(dt).format("DD-MM-YYYY HH:mm");
document.getElementById('date-time').innerHTML=formatedDt;


// adding search to local storage 

function store() {
  var cityInput = document.getElementById("cityInput");

  let searchedCitiesString = localStorage.getItem("cityInput");
  let searchedCities;

  if (searchedCitiesString === null) {
    searchedCities = [];
  } else {
    searchedCities = JSON.parse(searchedCitiesString);
  }

  searchedCities.push(cityInput.value);
  localStorage.setItem("cityInput", JSON.stringify(searchedCities));
  loadCities();
}

// appending to recent searches container 

function loadCities() {
  var storedCity = localStorage.getItem("cityInput");
  var storedCitiesParse = JSON.parse(storedCity);

  const list = document.getElementById("search-list");

  list.innerHTML = "";

  for (let i = 0; i < storedCitiesParse.length; i++) {
    const newData = storedCitiesParse[i];
    const entry = document.createElement("li");
    entry.appendChild(document.createTextNode(newData));
    list.appendChild(entry);
  }
}

loadCities ();

// clear history of recent searches

var clearHistoryBtn = document.getElementById("clear-history");
const list = document.getElementById("search-list");

clearHistoryBtn.onclick = function () {
    localStorage.clear();
    list.innerHTML = "";
  }

// fetch request to get longitude, latitude & city name 

var emptyArray = [];

const urlOne = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=d19384ecb2806bdadfc99c30aaf05857'

async function getCityInfo (userInput) {
  const response = await fetch(urlOne);
  const data = await response.json();
  console.log (data);
  const longitude = data.coord.lon;
  const latitude = data.coord.lat;
  emptyArray.push(longitude);
  emptyArray.push(latitude);
  const cityName = data.name;
  const windSpeed = data.wind.speed + ' m/s';
  const temperature = data.main.temp + ' degrees celcius';
  const humidity = data.main.humidity + ' %';
  console.log(cityName);
  console.log(windSpeed);
  console.log(temperature)
  console.log(humidity)
  
  
  // taking the unixTime value & converting it 
  const unixTimestamp = data.dt;
  const milliseconds = (unixTimestamp * 1000);
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString ();
  console.log (humanDateFormat)

  // appending cityName onto HTML (current weather)
  const title = document.getElementById ("current-weather-titles")
  const enterCityName = document.createElement("h2");
  enterCityName.appendChild(document.createTextNode(cityName));
  title.appendChild(enterCityName);

  // appending windSpeed onto HTML (current weather)
  const windSpeedRow = document.getElementById ("wind-speed-row")
  const enterwindSpeed = document.createElement("td");
  enterwindSpeed.appendChild(document.createTextNode(windSpeed));
  windSpeedRow.appendChild(enterwindSpeed);

  // appending the humidty onto HTML (current weather)
  const humidityRow = document.getElementById ("humidity-row")
  const enterHumidity = document.createElement("td");
  enterHumidity.appendChild(document.createTextNode(humidity));
  humidityRow.appendChild(enterHumidity);


// appending the temperature onto HTML (current weather)
const temperatureRow = document.getElementById("current-temp")
const enterTemperature = document.createElement("td");
enterTemperature.appendChild(document.createTextNode(temperature));
temperatureRow.appendChild(enterTemperature);
};
 
 getCityInfo();
 console.log(emptyArray);




// fetch request to use longitude & latitude to get current & future weather 

// const urlTwo = 'https://api.openweathermap.org/data/2.5/onecall?lat= + 'emptyArray[0]' &lon=-0.1257&exclude=current,minutely,hourly&units=metric&appid=bc6115c6531021896970ddc9c0028e1c'

// async function getWeatherData () {
//   const response = await fetch(urlTwo);
//   const data = await response.json();
//   console.log (data);
//   const requiredData = data.daily.slice(0,6);
//   console.log(requiredData);
  
//  };

//  getWeatherData ();
















// .then((response) => response.json())
// .then((data) => console.log(data));


  





  
  // from the data output, fetch the longitude & latitiude



// construct the url using the parameters

// fetch the data for the current weather & append to HTML

// Changing the UVI index color 

// fetch the data for the future weather & append to HTML

// Call the UVI function

// clear recent searches history

