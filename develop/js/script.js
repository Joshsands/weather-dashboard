var cityNameEl = document.getElementById("city-name")
var searchEl = document.getElementById("search-btn")
var cityTitleEl = document.getElementById("city-title")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var uvIndexEl = document.getElementById("uv-index")

console.log(searchEl)

var callWeather = function (cityName) {
    var apiKey = "3730bc87fdb6ced4e16339afdd4e357b"
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
      // make a get request to url
  fetch(weatherApi).then(function(response) { 
    // request was successful
    if (response.ok) {
        console.log(response)
      response.json().then(function(data) {
        // displayRepos(data.items, language);
        console.log(data.main.temp)

        cityTitleEl.innerHTML = "City Name: " + cityName;
        tempEl.innerHTML = "Temp: " + kelvinToFahrenheit(data.main.temp) + "℉";

      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

var kelvinToFahrenheit = function (K) {
    return Math.floor((K - 273.15) *1.8 +32);
}

searchEl.addEventListener("click", () => {
    var searchResult = cityNameEl.value;
    callWeather(searchResult);
})

