"use strict";
var xhttp = new XMLHttpRequest();
const controlLedURL = 'http://192.168.0.13:3000/devices';
var xhttpOpenWeather = new XMLHttpRequest();



function toggleDevice(deviceName){
     console.log('Turn on/off ' + deviceName);

     xhttp.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
              document.getElementById(deviceName + 'Msg').innerHTML = JSON.parse(this.responseText).status;
         } 
     }
     xhttp.open('POST', controlLedURL, true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send( JSON.stringify( { 'device': deviceName } ));
}


function fetchOpenWeatherData(city){
     if(city) var inputCity = city;
     else var inputCity = document.getElementById('inputTempCity').value;
     
     var response;
     xhttpOpenWeather.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
               response = JSON.parse(this.responseText)
               console.log( response );
               updateViewTemperature(response);
          }
     }

     let openWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q='+ inputCity +'&units=metric&appid=3fac209af6ec25171758d68e10d5c9a8';
     console.log(openWeatherURL);
     xhttpOpenWeather.open('GET', openWeatherURL, true);
     xhttpOpenWeather.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
     xhttpOpenWeather.send();
}



function updateViewTemperature(weatherData){
     let iconCode = weatherData.weather[0].icon;
     let iconURL = 'http://openweathermap.org/img/wn/'+ iconCode +'@2x.png';
     document.getElementById('weatherCity').innerHTML = weatherData.name;
     document.getElementById('weatherCountry').innerHTML = weatherData.sys.country;
     document.getElementById('weatherTemp').innerHTML = weatherData.main.temp + '°C';
     document.getElementById('weatherIcon').setAttribute("src", iconURL);
     document.getElementById('weatherMain').innerHTML = weatherData.weather[0].main;
     document.getElementById('weatherDescription').innerHTML = weatherData.weather[0].description;
}

fetchOpenWeatherData('Brasilia');