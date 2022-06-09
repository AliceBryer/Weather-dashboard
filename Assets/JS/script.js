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

async function getCityInfo (urlOne) {

  const response = await fetch(urlOne);
  const data = await response.json();
  console.log (data);
  const latitude = data.coord.lat;
  const longitude = data.coord.lon;
  const cityName = data.name;
  const windSpeed = data.wind.speed + ' m/s';
  const temperature = data.main.temp + ' &deg; C';
  const humidity = data.main.humidity + ' %';
  
  constructurl(latitude, longitude);

  
// //  // taking the unixTime value & converting it 
//   const unixTimestamp = data.dt;
//   const milliseconds = (unixTimestamp * 1000);
//   const dateObject = new Date(milliseconds);
//   const humanDateFormat = dateObject.toLocaleString ();
//   // console.log (humanDateFormat)

// appending cityName onto HTML (current weather)
  const title = document.getElementById ("current-weather-titles")
  const enterCityName = document.createElement("h2");
  enterCityName.appendChild(document.createTextNode(cityName));
  title.appendChild(enterCityName);

// appending windSpeed onto HTML (current weather)
  const windSpeedRow = document.getElementById ("wind-speed-row")
  const enterwindSpeed = document.createElement("td");
  enterwindSpeed.append(document.createTextNode(windSpeed));
  windSpeedRow.append(enterwindSpeed);

// appending the humidity onto HTML (current weather)
  const humidityRow = document.getElementById ("humidity-row")
  const enterHumidity = document.createElement("td");
  enterHumidity.append(document.createTextNode(humidity));
  humidityRow.append(enterHumidity);


// appending the temperature onto HTML (current weather)
const temperatureRow = document.getElementById("current-temp")
const enterTemperature = document.createElement("td");
enterTemperature.append(document.createTextNode(temperature));
temperatureRow.append(enterTemperature);

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

  requiredData.forEach(function (day){

    // const temp = day.temp.day;
    // const windspeed = day.wind_speed;
    // const humidity = day.humidity;
    // const uvi = day.uvi;

const futureWeatherCard = 
`<div class="future-weather-card">
    <div class = "info-titles" id="card-one">
    <img src="./Assets/Images/favicon.png" alt="icon of future weather for the chosen city">
    <h4>Tuesday 14th April</h4>
    </div>
  
    <table class="info-table">
  
      <tr>
      <td>Temperature</td>
      <td></td>
      
    </tr>
    <tr>
      <td>Wind Speed</td>
      <td></td>
     
    </tr>
    <tr>
      <td>Humidity</td>
      <td></td>
    
    </tr>
    <tr>
      <td class="UV-index">UV Index</td>
      <td></td>
  </tr>
    </table>
  
  </div>`

  futureContainer.append(futureWeatherCard);
  });

};

getFutureWeatherData()













// Changing the UVI index color 



// Call the UVI function



