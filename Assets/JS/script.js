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



// clear history of recent searches

var clearHistoryBtn = document.getElementById("clear-history");
const list = document.getElementById("search-list");

clearHistoryBtn.onclick = function () {
    localStorage.clear();
    list.innerHTML = "";
  }

// fetch request to get longitude, latitude & city name 



const urlOne = 'https://api.openweathermap.org/data/2.5/weather?q=Walsall&units=metric&appid=d19384ecb2806bdadfc99c30aaf05857'

async function getCityInfo () {

  const response = await fetch(urlOne);
  const data = await response.json();
  console.log (data);
  const latitude = data.coord.lat;
  const longitude = data.coord.lon;
  const cityName = data.name;
  const windSpeed = data.wind.speed + ' m/s';
  const temperature = data.main.temp + ' &deg;C';
  const humidity = data.main.humidity + ' %';
  
  constructurl(latitude, longitude);
  // console.log(cityName);
  // console.log(windSpeed);
  // console.log(temperature)
  // console.log(humidity)
  
  
  
  // taking the unixTime value & converting it 
  const unixTimestamp = data.dt;
  const milliseconds = (unixTimestamp * 1000);
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString ();
  // console.log (humanDateFormat)

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

  // appending the humidty onto HTML (current weather)
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
 getWeatherData(urlTwo);
};
// fetch request to use longitude & latitude to get current & future weather 

 async function getWeatherData (urlTwo) {
  const response = await fetch(urlTwo);
  const data = await response.json();
  console.log (data);
  const requiredData = data.daily.slice(0,6);
  console.log(requiredData);
  
 };














// .then((response) => response.json())
// .then((data) => console.log(data));


  





  
  // from the data output, fetch the longitude & latitiude



// construct the url using the parameters

// fetch the data for the current weather & append to HTML

// Changing the UVI index color 

// fetch the data for the future weather & append to HTML

// Call the UVI function

// clear recent searches history

