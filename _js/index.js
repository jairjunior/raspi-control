"use strict";

var xhttp = new XMLHttpRequest();
var controlLedURL = 'http://192.168.0.13:3000/leds';


function turnOnLED(){
     console.log("LED ligado!");
     xhttp.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
              document.getElementById("ledStatus").innerHTML = this.responseText;
         } 
     }
     xhttp.open('POST', controlLedURL, true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send( JSON.stringify( {'ledState': 'ON'} ) );
}


function turnOffLED(){
     console.log("LED desligado!");
     xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
               document.getElementById("ledStatus").innerHTML = this.responseText;
          } 
      }
      xhttp.open('POST', controlLedURL, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send( JSON.stringify( {'ledState': 'OFF'} ) );
}