var cityNameEl = document.getElementById("city-name")
var searchEl = document.getElementById("search-btn")
var weatherPicEl = document.getElementById("weather-pic")
var cityTitleEl = document.getElementById("city-title")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var uvIndexEl = document.getElementById("uv-index")
var cityColEl = document.getElementById("city-col")

var callWeather = function (cityName, check) {
    var apiKey = "3730bc87fdb6ced4e16339afdd4e357b"
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
      console.log(weatherApi)
    // make a get request to url
  fetch(weatherApi).then(function(response) { 
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        var currentDate = moment().format("L")
        var weatherPic = data.weather[0].icon
        weatherPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + ".png");
        cityTitleEl.innerHTML = data.name + " (" + currentDate + ")";
        tempEl.innerHTML = "Temp: " + kelvinToFahrenheit(data.main.temp) + "℉";
        windEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
        humidityEl.innerHTML = "Humidity: " + data.main.humidity + " %";

        if (check) {
        savedButton = document.createElement("button");
        savedButton.setAttribute("id", data.name)
        savedButton.classList = ("btn btn-secondary");
        savedButton.textContent = data.name;
        cityColEl.append(savedButton);
        } else { return; }

// for calling UV Index
var lat = data.coord.lat;
var lon = data.coord.lon;
var uvApi = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon=" + lon + "&exclude=hourly,daily,minutely&appid=" +apiKey;

fetch(uvApi).then(function(response) { 
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {

        var uvIndex = document.createElement("span");

        if (data.current.uvi < 3) {
        uvIndex.classList = ("badge badge-success");
        } else if (data.current.uvi > 5) {
        uvIndex.classList = ("badge badge-danger");
        }
        else {
            uvIndex.classList = ("badge badge-warning") ;
        }
        uvIndex.innerHTML = data.current.uvi;
        uvIndexEl.innerHTML = "UV Index: ";
        uvIndexEl.append(uvIndex);
    });

  } else {
      alert("Error: " + response.statusText);
    }
})

// call forecast data
var cityID = data.id;
var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
console.log(forecastApi)
fetch(uvApi).then(function(response) { 
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {


      })
    }else {
        alert("Error: " + response.statusText);
      }
    })

      })
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
    if (searchResult) {
    callWeather(searchResult, true);
    cityNameEl.value = "";
    } else {
        alert("Please enter a valid city name")
    }
})


var futureButton = function (selector, event, handler) {

    cityColEl.addEventListener(event, function (e) {
            var targetElement = e.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(e);
                    var secondaryResult = targetElement.id;
                    callWeather(secondaryResult, false);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}

//adding the Event Listeners to all secondary buttons
futureButton('.btn-secondary','click', function () {
});
