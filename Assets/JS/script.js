// hamburger function

// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }

//   // time & date in Navbar
// var dt = new Date().format;
// var formatedDt = moment(dt).format("DD-MM-YYYY HH:mm");
// document.getElementById('date-time').innerHTML=formatedDt;


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

const urlOne = 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=d19384ecb2806bdadfc99c30aaf05857'

async function getCityInfo () {
  const response = await fetch(urlOne);
  const data = await response.json();
  console.log (data);
  const longitude = data.coord.lon;
  const latitude = data.coord.lat;
  const cityName = data.name;
  console.log(longitude);
  console.log(latitude);
  console.log(cityName);
}

getCityInfo();

// fetch request to use longitude & latitude to get current & future weather 

const urlTwo = 'https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=current,minutely,hourly&units=metric&appid=bc6115c6531021896970ddc9c0028e1c'

async function getWeatherData () {
  const response = await fetch(urlTwo);
  const data = await response.json();
  console.log (data);
  const requiredData = data.daily.slice(0,6);
  console.log(requiredData);
  ;
 };

 getWeatherData ();
















// .then((response) => response.json())
// .then((data) => console.log(data));


  





  
  // from the data output, fetch the longitude & latitiude



// construct the url using the parameters

// fetch the data for the current weather & append to HTML

// Changing the UVI index color 

// fetch the data for the future weather & append to HTML

// Call the UVI function

// clear recent searches history

