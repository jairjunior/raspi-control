"use strict";


var xhttp = new XMLHttpRequest();
var controlLedURL = 'http://192.168.0.13:3000/devices';


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




function fetchOpenWeatherData(){

     
}