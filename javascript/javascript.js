var APIKey = "9696426ac9e59be5266033c2ff24bf66";
var searchHistory = JSON.parse(localStorage.getItem("search-name"));
if (!searchHistory) {
  searchHistory = [];
}
console.log(searchHistory);

function displayCurrentWeatherInfo() {
  var myCity = $("#city-input").val() || $(this).attr("data-name");
  var queryURLcurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    (myCity || "Denver") +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURLcurrent,
    method: "GET"
  }).then(function(response) {
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
    $(".current-temp").html("Temperature: " + fahrenheit + " &deg;F");
    $(".current-humid").text("Humidity: " + response.main.humidity + " %");
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
      method: "GET"
    })
      .then(function(response) {
        console.log(queryURLuvi);
        console.log(response);
        var newIndex = [
          $("<span>").text("UV Index: "),
          $("<button>")
            .text(response.value)
            .attr("id", "uv-button")
        ];
        $(".current-uv").empty();
        $(".current-uv").append(newIndex);
        if (response.value <= 3) {
          $("#uv-button").addClass("btn btn-success");
        } else if (response.value >= 7) {
          $("#uv-button").addClass("btn btn-danger");
        } else $("#uv-button").addClass("btn btn-warning");
      })
      .catch(function(error) {});
  });
}

function displayFiveDayWeatherForecast() {
  var myCity = $("#city-input").val() || $(this).attr("data-name");
  var queryURLforecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    (myCity || "Denver") +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURLforecast,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    //Not Working
    // var days = response.list;
    // var fiveDayList = 0;

    // for (var i = 0; i < days.length && fiveDayList < 5; i++) {
    //   console.log(fiveDayList);

    //   var timeString = days[i].dt_txt.split(" ")[1].split(":")[0];
    //   console.log(timeString);

    //   if (timeString === "18") {
    //     fiveDayList++;
    //     console.log(fiveDayList);

    //     var currentDate = days[i].dt_txt;
    //     var currentDateFormatted = moment(currentDate).format("MM/DD/YYYY");
    //     console.log("Current Date:", currentDate);
    //     console.log("Date of Index:", moment(currentDate).format("MM/DD/YYYY"));

    //     var kelvinForecast = days[i].main.temp;
    //     var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(
    //       0
    //     );

    //     var avgHumidity = days[i].main.humidity;

    //     var div = $("<div class='col-md-2'>").html(ForecastCard(days[i]));
    //     $("#forecast-row").append(div);

    //     var icon = $("<img>").attr(
    //       "src",
    //       "http://openweathermap.org/img/wn/" +
    //         days[i].weather[0].icon +
    //         "@2x.png"
    //     );
    //     console.log(icon[0]);

    //     var iconImage = icon[0];

    //     function ForecastCard() {
    //       var obj = {
    //         date: currentDateFormatted,
    //         img: iconImage,
    //         temp: "Temperature: " + fahrenheitForecast + " &deg;F",
    //         humidity: "Humidity: " + avgHumidity + "%"
    //       };

    //       return `<div class="card forecast">
    //         <div class="card-body">
    //           <h5>${obj.date}</h5>
    //           <div>${obj.img}</div>
    //           <div> ${obj.temp} </div>
    //           <div>${obj.humidity}</div>
    //         </div>
    //       </div>`;
    //     }
    //   }

    //Forecast Dates

    var currentDate = response.list[0].dt_txt;
    $("#date-day-1").text(moment(currentDate).format("MM/DD/YYYY"));
    $("#date-day-2").text(
      moment(currentDate)
        .add(1, "days")
        .format("MM/DD/YYYY")
    );
    $("#date-day-3").text(
      moment(currentDate)
        .add(2, "days")
        .format("MM/DD/YYYY")
    );
    $("#date-day-4").text(
      moment(currentDate)
        .add(3, "days")
        .format("MM/DD/YYYY")
    );
    $("#date-day-5").text(
      moment(currentDate)
        .add(4, "days")
        .format("MM/DD/YYYY")
    );

    console.log(
      "Date of Index + 1:",
      moment(currentDate)
        .add(1, "days")
        .format("MM/DD/YYYY")
    );

    //Forecast Icons
    $("#icon-day-1").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[6].weather[0].icon +
        "@2x.png"
    );
    $("#icon-day-2").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[14].weather[0].icon +
        "@2x.png"
    );
    $("#icon-day-3").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[22].weather[0].icon +
        "@2x.png"
    );
    $("#icon-day-4").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[30].weather[0].icon +
        "@2x.png"
    );
    $("#icon-day-5").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[38].weather[0].icon +
        "@2x.png"
    );

    // for (var i = 0; i < response.list.length; i++) {
    //   console.log("noon", response.list[i].dt_txt.includes("12:00:00"));
    //   var noonIndex = response.list[i].dt_text
    //     .includes("12:00:00")
    //     .parent()
    //     .index();
    //   console.log(noonIndex);
    // }

    // for (let key of response.list) {
    //   console.log("date", $(this).dt_txt);
    // }

    // Forecast temp
    var kelvinForecast =
      (response.list[5].main.temp +
        response.list[6].main.temp +
        response.list[7].main.temp) /
      3;
    var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(0);
    $("#temp-day-1").text("Temperature: " + fahrenheitForecast + " F");
    var kelvinForecast =
      (response.list[13].main.temp +
        response.list[14].main.temp +
        response.list[15].main.temp) /
      3;
    var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(0);
    $("#temp-day-2").text("Temperature: " + fahrenheitForecast + " F");
    var kelvinForecast =
      (response.list[21].main.temp +
        response.list[22].main.temp +
        response.list[23].main.temp) /
      3;
    var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(0);
    $("#temp-day-3").text("Temperature: " + fahrenheitForecast + " F");
    var kelvinForecast =
      (response.list[29].main.temp +
        response.list[30].main.temp +
        response.list[31].main.temp) /
      3;

    var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(0);
    $("#temp-day-4").text("Temperature: " + fahrenheitForecast + " F");
    var kelvinForecast =
      (response.list[37].main.temp +
        response.list[38].main.temp +
        response.list[39].main.temp) /
      3;

    var fahrenheitForecast = ((kelvinForecast - 273.15) * 1.8 + 32).toFixed(0);
    $("#temp-day-5").text("Temperature: " + fahrenheitForecast + " F");

    //Forcast Humidity
    var avgHumidity =
      (response.list[5].main.humidity +
        response.list[6].main.humidity +
        response.list[7].main.humidity) /
      3;
    $("#humid-day-1").text("Humidity: " + avgHumidity.toFixed(0) + " %");
    var avgHumidity =
      (response.list[13].main.humidity +
        response.list[14].main.humidity +
        response.list[15].main.humidity) /
      3;
    $("#humid-day-2").text("Humidity: " + avgHumidity.toFixed(0) + " %");
    var avgHumidity =
      (response.list[21].main.humidity +
        response.list[22].main.humidity +
        response.list[23].main.humidity) /
      3;
    $("#humid-day-3").text("Humidity: " + avgHumidity.toFixed(0) + " %");
    var avgHumidity =
      (response.list[29].main.humidity +
        response.list[30].main.humidity +
        response.list[31].main.humidity) /
      3;
    $("#humid-day-4").text("Humidity: " + avgHumidity.toFixed(0) + " %");
    var avgHumidity =
      (response.list[37].main.humidity +
        response.list[38].main.humidity +
        response.list[39].main.humidity) /
      3;
    $("#humid-day-5").text("Humidity: " + avgHumidity.toFixed(0) + " %");
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
  displayCurrentWeatherInfo();
  displayFiveDayWeatherForecast();
}

$("#add-city").on("click", function(event) {
  event.preventDefault();
  $("#weather-results").attr("style", "display: block");
  $("#search-history-results").attr("style", "display: block");
  var city = $("#city-input")
    .val()
    .trim();
  var queryURLcurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURLcurrent,
    method: "GET"
  })
    .then(function(response) {
      if (response.name) {
        searchHistory.push(response.name);
        localStorage.setItem("search-name", JSON.stringify(searchHistory));
        recordSearchHistory();
      } else {
        $("#city-input").val("");
      }
    })
    .catch(function(error) {
      $("#city-input").val("");
    });
});

$(document).on("click", ".city", displayCurrentWeatherInfo);
$(document).on("click", ".city", displayFiveDayWeatherForecast);

recordSearchHistory();
