$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  }

  function getWeather(position) {
    $.get("https://fcc-weather-api.glitch.me/api/current?", {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }, function(weather) {
      $(".degrees").html("<p>" + weather.main.temp + "</p>");
      $("#weather-icon").attr("alt", weather.weather[0].description);
      $("#weather-icon").attr("src", weather.weather[0].icon);
      $(".symbol").show()
    });
  };

  $(".symbol").click(function() {
    if ($(this).text().trim().indexOf("C") !== -1) {
      var farenheit = ctof(float($(".degrees p").text().trim()));
      setText(farenheit, "&deg;F");
    }
    else {
      var celsius = ftoc(float($(".degrees p").text().trim()));
      setText(celsius, "&degC");
    }
  });

  function setText(degrees, symbol) {
    $(".degrees").html("<p>" + degrees +"</p>");
    $(".symbol").text(symbol);
  }

  function ctof(cel) {
    return ((cel * 9) / 5) + 32;
  }

  function ftoc(far) {
    return ((far - 32) * 5) / 9;
  }
});

