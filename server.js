const http = require('http');
const fs = require('fs');


const server = http.createServer( (req, res) => {
	if( req.url === '/' && req.method == 'GET' ){
		fs.readFile('./_views/index.html', 'utf8', (err, data) => {
			if(err) throw err;
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			response.writeHead(200, {"Content-Type":"text/css"}); 
			
			res.end();
		});
	}
	else if(req.url === '/leds'){
		res.write('LEDs page!');
		res.end();
	}
	else if (req.url === '/buttons'){
		res.write('Buttons page!');
		res.end();
	}
	else if (req.url === '/reqbody'){
		console.log('Method: ', req.method);
		console.log('URL: ', req.url);
		console.log('HTTP headers: ', req.headers);
		console.log('Request body: ', req.body);
		console.log('--------------------------------');
		res.end();
	}
});
	
server.listen(3000, () => {
	console.log('Server listening on port 3000...');
});
