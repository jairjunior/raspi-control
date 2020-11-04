"use strict";
const Gpio = require('onoff').Gpio; 

const devices = {
                    'greenLED': 23,
                    'redLED': 24
               };

const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
//const STATUS_UNAUTHORIZED = 401;
//const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;


module.exports = class DigitalWrite{

     static turnOnOff(name, value){
          const device = new Gpio(devices[name], 'out');

          if(value === 'ON'){ 
               device.write(1).catch(err => console.error(err));
               console.log(name + ' turned on!');
               return {
                    'status': STATUS_OK,
                    'state': 1,
                    'message': 'Device turned on!'
               }
          }
          else if(value === 'OFF'){
               device.write(0).catch(err => console.error(err));
               console.log(name + ' turned off!');
               return {
                    'status': STATUS_OK,
                    'state': 0,
                    'message': 'Device turned off!'
               }
          }
          else{
               //invalid value. It needs to be 'ON' or 'OFF'.
               return {
                    'status': STATUS_BAD_REQUEST,
                    'message': 'Invalid value. Check your HTML file.'
               };
          }
          device.unexport();
     }
}