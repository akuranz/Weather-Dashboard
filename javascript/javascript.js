var APIKey = "9696426ac9e59be5266033c2ff24bf66";
var searchHistory = JSON.parse(localStorage.getItem("search-name"));
if (!searchHistory) {
  searchHistory = [];
  $("#search-history-results").css("display", "none");
  $("#weather-results").css("display", "none");
}
console.log(searchHistory);

function displayWeather() {
  var myCity = $(this).attr("data-name") || $("#city-input").val();
  displayCurrentWeatherInfo(myCity);
  displayFiveDayWeatherForecast(myCity);
}
function displayCurrentWeatherInfo(myCity) {
  var queryURLcurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    (myCity || "Denver") +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURLcurrent,
    method: "GET",
  }).then(function (response) {
    console.log(queryURLcurrent);
    console.log(response);
    $(".main_card_city").text(response.name);
    $(".date").html(
      "&nbsp;(" + moment.unix(response.dt).format("MM/DD/YYYY") + `)`
    );
    $(".weather-icon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    var kelvin = response.main.temp;
    var fahrenheit = ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
    $(".current-temp").html("Temperature: " + fahrenheit + "&deg;F");
    $(".current-humid").text("Humidity: " + response.main.humidity + "%");
    $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");

    var queryURLuvi =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      response.coord.lat +
      "&lon=" +
      response.coord.lon;

    $.ajax({
      url: queryURLuvi,
      method: "GET",
    })
      .then(function (response) {
        console.log(queryURLuvi);
        console.log(response);
        var newIndex = [
          $("<span>").text("UV Index: "),
          $("<button>").text(response.value).attr("id", "uv-button"),
        ];
        $(".current-uv").empty();
        $(".current-uv").append(newIndex);
        if (response.value <= 3) {
          $("#uv-button").addClass("btn btn-success");
        } else if (response.value >= 7) {
          $("#uv-button").addClass("btn btn-danger");
        } else $("#uv-button").addClass("btn btn-warning");
      })
      .catch(function (error) {});
  });
}

function ForecastCard(data) {
  console.log("data", data);
  var currentDate = data.dt_txt;
  var currentDateFormatted = moment(currentDate).format("MM/DD/YYYY");

  var kelvinForecast = data.main.temp;
  var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(0);
  var avgHumidity = data.main.humidity;
  var icon = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  );
  console.log(icon[0]);
  var iconImage = icon[0].outerHTML;
  var obj = {
    date: currentDateFormatted,
    img: iconImage,
    temp: "Temperature: " + fahrenheitForecast + "&deg;F",
    humidity: "Humidity: " + avgHumidity + "%",
  };

  console.log("Current Date:", currentDate);
  console.log("Date of Index:", moment(currentDate).format("MM/DD/YYYY"));

  return `<div class="card forecast">
    <div class="card-body">
      <h5>${obj.date}</h5>
      <div>${obj.img}</div>
      <div> ${obj.temp} </div>
      <div>${obj.humidity}</div>
    </div>
  </div>`;
}

function displayFiveDayWeatherForecast(myCity) {
  var queryURLforecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    (myCity || "Denver") +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURLforecast,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    //Not Working

    var days = response.list;
    var fiveDayList = 0;

    $("#forecast-row").empty();
    for (var i = 0; i < fiveDayList < 5; i++) {
      //console.log(fiveDayList);

      //console.log("days", days[i].dt_txt);
      var timeString = response.list[i].dt_txt.split(" ")[1].split(":")[0];
      //console.log("Timestring", timeString);

      if (timeString === "18") {
        fiveDayList++;
        //console.log(fiveDayList);

        var div = $("<div class='col-md-2'>").html(ForecastCard(days[i]));

        $("#forecast-row").append(div);
      }
    }
  });
}

function recordSearchHistory() {
  $(".list-group").empty();
  for (var i = 0; i < searchHistory.length; i++) {
    console.log(searchHistory[i]);
    var search = $("<li>");
    search.addClass("city list-group-item");
    search.attr("data-name", searchHistory[i]);
    search.text(searchHistory[i]);
    $(".list-group").append(search);
  }
  displayWeather();
}

$("#add-city").on("click", function (event) {
  event.preventDefault();
  $("#weather-results").attr("style", "display: block");
  $("#search-history-results").attr("style", "display: block");
  var city = $("#city-input").val().trim();
  var queryURLcurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURLcurrent,
    method: "GET",
  })
    .then(function (response) {
      if (response.name) {
        searchHistory.push(response.name);
        localStorage.setItem("search-name", JSON.stringify(searchHistory));
        recordSearchHistory();
      } else {
        $("#city-input").val("");
      }
    })
    .catch(function (error) {
      $("#city-input").val("");
    });
});

$(document).on("click", ".city", displayWeather);

recordSearchHistory();
