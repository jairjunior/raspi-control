const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


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
app.use( express.static( path.join(__dirname, '_views') ) );
app.use( express.static( path.join(__dirname, '_js') ) );
app.use( express.static( path.join(__dirname, '_css') ) );


/*
 * res.sendFile(path [, options] [, fn])
 * Transfers the file at the given path. Sets the Content-Type response HTTP header field based on the filename’s extension.
 * Unless the root option is set in the options object, path must be an absolute path to the file.
 */
app.get('/', (req, res) => {
	res.sendFile( path.join(__dirname, '_views', 'index.html') );
	res.end();
});

app.post('/leds', (req, res) => {
	console.log(req.body);
	if(req.body.ledState == 'ON')
		res.status(200).send('LED Turned on!');
	if(req.body.ledState == 'OFF')
		res.status(200).send('LED Turned off!');
});
	

app.listen(3000, () => {
	console.log('Server listening on port 3000...');
});
