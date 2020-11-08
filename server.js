const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
require('dotenv');

const ControlDevices = require('./src/ControlDevices');
const sensor = require("node-dht-sensor");
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




app.get('/openweatherdata', async (req, res) => {
	console.log('------------------------');
	console.log('Request to get data from Open Weather API.');
	var json = await getOpenWeatherData(req.query.city);
	res.json(json);
	res.end();
});
async function getOpenWeatherData(city){
	const tokenAPI = process.env.WEATHER_API_TOKEN;
	const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${tokenAPI}`;
	try{
		const response = await axios.get(URL, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
		return response.data;
	}catch(error){
		console.error(error);
		return null;
	}
 }



app.get('/dht22data', (req, res) => {
	console.log('------------------------');
	console.log('Request to get data from DHT22 sensor.');

	sensor.read(22, 4, function(err, temperature, humidity){
		console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
		if(err) throw err;
		else{
			temp = temperature.toFixed(2);
			humid = Math.round(humidity);
			res.status(200).json({ 'temperature': temp, 'humidity': humid });
		}
	});
});



app.post('/devices', (req, res) => {
	console.log('------------------------');
	console.log('Toggle device: ' + req.body.device);

	var device = req.body.device;
	let result = controlDevices.toggle(device);   
	res.status(result).send({ 'status': 'success' });
});
	


app.listen(MY_PORT, () => {
	console.log(`Server listening on port ${MY_PORT}...`);
});
