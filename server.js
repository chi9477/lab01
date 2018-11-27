var http = require('http');
var url = require('url');
var mongoose = require('mongoose');

//const mongourl = 'mongodb://localhost/test';
const mongourl = 'mongodb://developer:developer123@ds031873.mlab.com:31873/comps381f';

var kittySchema = require('./models/kitty');

var server = http.createServer(function (req,res) {
	var parsedURL = url.parse(req.url,true); //true to get query as object
	var queryAsObject = parsedURL.query;

	switch(parsedURL.pathname) {
		case '/create':
			mongoose.connect(mongourl);
			var db = mongoose.connection;
			//db.on('error', console.error.bind(console, 'connection error:'));
			db.on('error',function(callback) {
				console.error.bind(console, 'connection error:');
				res.writeHead(500,{"Content-Type":"text/plain"});
				res.end('MongoDB connection error!');				
			});
			db.once('open', function (callback) {
				var Kitten = mongoose.model('Kitten', kittySchema);
				var new_k = {};
				new_k['name'] = queryAsObject.name;
				new_k['age'] = queryAsObject.age;
				var fluffy = new Kitten(new_k);
				// consider calling fluffy.validate() before save()
				fluffy.save(function(err) {
					//if (err) throw err
					if (err) {
						console.log('save() error ' + err.name);
						res.writeHead(500,{"Content-Type":"text/plain"});
						res.end(JSON.stringify(err.name));
					} else {
						console.log('Kitten created!')
						res.writeHead(200,{"Content-Type":"text/plain"});
						res.end("Created: " + JSON.stringify(new_k));
					}
					db.close();
				});
			});
			break;
		case '/delete':
			mongoose.connect(mongourl);
			var db = mongoose.connection;
			//db.on('error', console.error.bind(console, 'connection error:'));
			db.on('error',function(callback) {
				console.error.bind(console, 'connection error:');
				res.writeHead(500,{"Content-Type":"text/plain"});
				res.end('MongoDB connection error!');				
			});
			db.once('open', function (callback) {
				var Kitten = mongoose.model('Kitten', kittySchema);
				Kitten.remove(queryAsObject,function(err) {
					if (err) throw err
					console.log('documents deleted!')
					db.close();
					res.writeHead(200,{"Content-Type":"text/plain"});
					res.end("documents deleted!");
				});
			});
			break;
		default:
			res.writeHead(404,{"Content-Type":"text/plain"});
			res.end("Error: " + parsedURL.pathname + " not implemented!");
	}
});

server.listen(process.env.PORT || 8099);