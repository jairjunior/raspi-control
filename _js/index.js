"use strict";


var xhttp = new XMLHttpRequest();
var controlLedURL = 'http://192.168.0.13:3000/leds';


function turnOnOff(buttonObj, value){
     console.log('Button: turn '+ value + ' ' + buttonObj.value);
     xhttp.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
              document.getElementById("greeLedStatus").innerHTML = JSON.parse(this.responseText).message;
         } 
     }
     xhttp.open('POST', controlLedURL, true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send( JSON.stringify( { 'device': buttonObj.value, 'value': value } ));
}