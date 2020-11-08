"use strict";
//import { WEATHER_API_TOKEN } from './../../keys-dev';

var xhttp = new XMLHttpRequest();
const controlLedURL = '/devices';
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
               updateViewTemperature(response);
          }
     }
     let openWeatherURL = 'openweatherdata?city='+ inputCity;
     xhttpOpenWeather.open('GET', openWeatherURL, true);
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

     document.querySelector('#feelslikeTemp > h5').innerText = weatherData.main.feels_like + '°C';
     document.querySelector('#maxTemp > h5').innerHTML = weatherData.main.temp_max + '°C';
     document.querySelector('#minTemp > h5').innerHTML = weatherData.main.temp_min + '°C';
     document.querySelector('#humidity > h5').innerHTML = weatherData.main.humidity + '%';
     document.querySelector('#pressure > h5').innerHTML = weatherData.main.pressure + ' hPa';
     fetchDHT22Data();
}
fetchOpenWeatherData('Brasilia');



function fetchDHT22Data(){
     const dht22URL = '/dht22data';
     var response;
     xhttpOpenWeather.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
               response = JSON.parse(this.responseText);
               updateViewLocalTemp(response);
          }
     }
     xhttpOpenWeather.open('GET', dht22URL, true);
     xhttpOpenWeather.send();
}

function updateViewLocalTemp(data){
     document.querySelector('#localTemp > h5').innerHTML = data.temperature + '°C';
     document.querySelector('#localHumidity > h5').innerHTML = data.humidity + '%';
} 


/*
 * Add event listener to subimit form when RETURN button is pressed 
 * in order to search weather data for a specific city
 */
var inputForm = document.getElementById("inputTempCity");
inputForm.addEventListener("keyup", function(event) {
     if ( (event.keyCode === 13) || (event.which === 13) ){
          event.preventDefault();
          document.getElementById("buttonSearchTemp").click();
     }
});