 //  creates links/buttons https://getbootstrap.com/docs/4.0/components/list-group/
 cityListButton = $("<a>").attr({
    class: "list-group-item list-group-item-action",
    href: "#",
  });
  // appends history as a button below the search field
  cityListButton.text(searchHistory[i]);
  $(".list-group").append(cityListButton);
}
}
var city;
var mainCard = $(".card-body");
// invokes getItems
getItems();
// main card

function getData() {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=642f9e3429c58101eb516d1634bdaa4b";
    mainCard.empty();
    $("#weeklyForecast").empty();
    // requests
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response){
        // using moment to craft the date
        var date = moment().format(" MM/DD/YYYY");
        // takes the icon code from the response and assigns it to iconCode
        var iconCode = response.weather[0].icon;
        // builds the main card icon url
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // takes the name added from the search and the date/format from moment and creates a single var
        var name = $("<h3>").html(city + date);
        // displays name in main card
        mainCard.prepend(name);
        // displays icon on main card
        mainCard.append($("<img>").attr("src", iconURL));
        // converts K and removes decimals using Math.round
        var temp = Math.round((response.main.temp - 273.15) * 1.8 + 32);
        mainCard.append($("<p>").html("Temperature: " + temp + " &#8457"));
        var humidity = response.main.humidity;
        mainCard.append($("<p>").html("Humidity: " + humidity));
        var windSpeed = response.wind.speed;
        mainCard.append($("<p>").html("Wind Speed: " + windSpeed));
        // takes from the response and creates a var used in the next request for UV index
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        // separate request for UV index, requires lat/long
        $.ajax({
            url:
              "https://api.openweathermap.org/data/2.5/uvi?appid=642f9e3429c58101eb516d1634bdaa4b&lat=" +
              lat +
              "&lon=" +
              lon,
            method: "GET",
            // displays UV in main card
          }).then(function (response) {
            mainCard.append(
              $("<p>").html("UV Index: <span>" + response.value + "</span>")
            );
            //
            if (response.value <= 2) {
              $("span").attr("class", "btn btn-outline-success");
            }
            if (response.value > 2 && response.value <= 5) {
              $("span").attr("class", "btn btn-outline-warning");
            }
            if (response.value > 5) {
              $("span").attr("class", "btn btn-outline-danger");
            }
          });