// time & date in Navbar
var dt = new Date().format;
var formatedDt = moment(dt).format("DD-MM-YYYY HH:mm");
document.getElementById('date-time').innerHTML=formatedDt;


// adding search to local storage 

function store() {
  var cityInput = document.getElementById("cityInput");
  let searchedCitiesString = localStorage.getItem("cityInput");
  
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
  console.log(storedCitiesParse)

  const ChosenCity = storedCitiesParse[storedCitiesParse.length -1];
  console.log(ChosenCity)

  createurl(ChosenCity)

  const list = document.getElementById("search-list");

  list.innerHTML = "";

  for (let i = 0; i < storedCitiesParse.length; i++) {
    const newData = storedCitiesParse[i];
    const entry = document.createElement("li");
    entry.appendChild(document.createTextNode(newData));
    list.appendChild(entry);
  }
}

loadCities();



// clear history of recent searches

var clearHistoryBtn = document.getElementById("clear-history");
const list = document.getElementById("search-list");

clearHistoryBtn.onclick = function () {
    localStorage.clear();
    list.innerHTML = "";
  }

// creating url for fetch request based on the users search

function createurl (ChosenCity) {
  const urlOne = `https://api.openweathermap.org/data/2.5/weather?q=${ChosenCity}&units=metric&appid=d19384ecb2806bdadfc99c30aaf05857`
 getCityInfo(urlOne)
  };

// fetch request to get longitude, latitude & correct city name etc
const currentContainer = $("#current-weather-container")

async function getCityInfo (urlOne) {

  const response = await fetch(urlOne);
  const data = await response.json();
  console.log (data);
  const latitude = data.coord.lat;
  const longitude = data.coord.lon;
  
  constructurl(latitude, longitude);

  
// taking the unixTime value & converting it 
  const unixTimestamp = data.dt;
  const milliseconds = (unixTimestamp * 1000);
  const dateObject = new Date(milliseconds);
  const formatedDt = moment(dateObject).format("dddd, MMMM Do YYYY");
  


// appending cityName onto HTML (current weather)


const currentWeatherCard = `<div class="current-weather-card">
  <div class = "info-titles" id="current-weather-titles">
  <h2>${formatedDt}</h2>
  <img src="./Assets/Images/favicon.png" alt="icon of current weather for the chosen city">
  <h4>${data.name}</h4>
  </div>

  <table class="info-table">

    <tr id="current-temp">
    <td>Temperature</td>
    <td>${data.main.temp}°C</td>
    
  </tr>
  <tr id="wind-speed-row">
    <td>Wind Speed</td>
    <td>${data.wind.speed} m/s</td>

  </tr>
  <tr id="humidity-row">
    <td>Humidity</td>
    <td>${data.main.humidity}%</td>

  </tr>
  <tr>
    <td>UV Index</td>
   <td class="UV-index"></td> 

  </tr>

  </table>

 </div>`

 currentContainer.append(currentWeatherCard);

return data
};
getCityInfo();





function constructurl (latitude, longitude) {
 const urlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=bc6115c6531021896970ddc9c0028e1c`;
getFutureWeatherData(urlTwo);
};


 // fetch request to use longitude & latitude to get future weather & the UV Index

 const futureContainer = $("#future-weather-container")

 async function getFutureWeatherData (urlTwo) {
  const response = await fetch(urlTwo);
  const data = await response.json();
  console.log (data);
  const requiredData = data.daily.slice(1,6);
  console.log(requiredData);

  const unixTimestamp = requiredData.dt;
  console.log(unixTimestamp)
  const milliseconds = (unixTimestamp * 1000);
  const dateObject = new Date(milliseconds);
  const formatedDt = moment(dateObject).format("dddd, MMMM Do YYYY");

  requiredData.forEach(function (day){


const futureWeatherCard = 
`<div class="future-weather-card">
    <div class = "info-titles" id="card-one">
    <img src="./Assets/Images/favicon.png" alt="icon of future weather for the chosen city">
    <h4>${data.dt}</h4>
    </div>
  
    <table class="info-table">
  
      <tr>
      <td>Temperature</td>
      <td>${day.temp.day} °C</td>
      
    </tr>
    <tr>
      <td>Wind Speed</td>
      <td>${day.wind_speed} m/s </td>
     
    </tr>
    <tr>
      <td>Humidity</td>
      <td>${day.humidity} %</td>
    
    </tr>
    <tr>
      <td class="UV-index">UV Index</td>
      <td>${day.uvi}</td>
  </tr>
    </table>
  
  </div>`

  futureContainer.append(futureWeatherCard);
  });

};

getFutureWeatherData()













// Changing the UVI index color 



// Call the UVI function



