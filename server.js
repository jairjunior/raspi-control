const express = require('express');
require('dotenv');
const path = require('path');
const app = express();
const ControlDevices = require('./src/ControlDevices');
var sensor = require("node-dht-sensor");
const MY_PORT = process.env.PORT || 8080;


/* 
 * Configurações do pacote body-parser para interpretar JSON 
 */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/* 
 * express.static(root, [options])
 * This is a built-in middleware function in Express. It serves static files and is based on serve-static.
 * 
 * The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
 */
app.use( express.static( path.join('public') ) );
app.use( express.static( path.join('public/views') ) );
app.use( express.static( path.join('public/css') ) );
app.use( express.static( path.join('public/js') ) );
app.use( express.static( path.join('public/img') ) );


/*
 * Instantiate object to control all devices connected.
 */
const controlDevices = new ControlDevices();
Object.freeze(controlDevices);


/*
 * res.sendFile(path [, options] [, fn])
 * Transfers the file at the given path. Sets the Content-Type response HTTP header field based on the filename’s extension.
 * Unless the root option is set in the options object, path must be an absolute path to the file.
 */
app.get('/', (req, res) => {
	console.log('Request GET.');
	res.sendFile( path.join(__dirname, 'public/views/index.html') );
	res.end();
});


app.get('/dashboard', (req, res) => {
	console.log('Request GET.');
	res.sendFile( path.join(__dirname, 'public/views/dashboard.html') );
	res.end();
});


app.post('/devices', (req, res) => {
	var device = req.body.device;
	console.log();
	console.log('Server: sending request for toggle ' + device);
	let result = controlDevices.toggle(device);

	// Temporary test with the 1-wire interface. Just testing....
	sensor.read(22, 4, function(err, temperature, humidity) {
		console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
	});
	   
	res.status(result).send({ 'status': 'success' });
});
	


app.listen(MY_PORT, () => {
	console.log(`Server listening on port ${MY_PORT}...`);
});
