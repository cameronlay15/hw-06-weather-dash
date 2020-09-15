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
        
    }