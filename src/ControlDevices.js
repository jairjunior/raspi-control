"use strict";
const Gpio = require('onoff').Gpio; 


const devicesNamesAndPins = [
                    ['greenLED', 23],
                    ['redLED', 24]
];


const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_INTERNAL_SERVER_ERROR = 500;
//const STATUS_UNAUTHORIZED = 401;
//const STATUS_NOT_FOUND = 404;


class Device extends Gpio{
     constructor(name, pin){
          super(pin, 'out');
          this.name = name;
          this.write(0, err => {        // Initialize Gpio always in LOW state (0)
               if(err) throw err;
               this.state = 0;
          });
          console.log('New device object created: ' + this.name);
     }
}

 class InitDevices{
     devices = [];
     constructor(){
          devicesNamesAndPins.forEach( (item) => {
               try{
                    this.newDevice = new Device(...item);
                    this.devices.push( this.newDevice );
               }
               catch(err){
                    console.error(err);
               }
          });
     }
}

class ControlDevices{
     constructor(){
          this.allDevices = new InitDevices();
     }

     toggle(name){
          let device = this.allDevices.devices.filter( (dvc) => { return dvc.name == name; });
          let newState = device[0].state ^ 1;
          console.log('Toggle '+device[0].name+' - before: '+device[0].state+' - after: '+newState);
          device[0].write(newState, err => {
               if(err) throw err;
               device[0].state = newState;
          });
          return STATUS_OK;
     }
}

module.exports =  ControlDevices;