//Setup web server and socket
var twitter = require('twitter'),
	express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

//Setup twitter stream api
var twit = new twitter({
	//consumer_key: '5VyHDN34uv2gPl0rVoljNflF6',
	//consumer_secret: 'aHhcPDC33DoER4Xfn4809p1pD9WPE9098iSMa7sd1blvmacv8R',
	//access_token_key: '35626713-p880mlq7KURMibu8qa4QIHaSMHLnqG1VybeUqiMto',
	//access_token_secret: '	RnM40yjHEvgHzr0tOpvADXeQLs9wRriazbhz4LkE28unG'
	consumer_key: 'yZiAdoZd0HqKQW4lHbTRUssx1',
    consumer_secret: 'POnmG7n8I64ZspxDg3aCYdVJY59aXqFke4jExniBmpQfaBo26y',
    access_token_key: '35626713-wL8DlhYE8W5k35j5Hvr0oypyh7ycF1wDJcvdpuJkX',
    access_token_secret: 'L6lFOVn1iEAW2FsZwcNRJS4f1QLdjzLIRj4aeXe9CHSEY'
}),
stream = null;

//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);

//Setup routing for app
app.use(express.static(__dirname + '/public'));

//Create web sockets connection.
io.sockets.on('connection', function(socket){

	socket.on("start tweets", function(){

		if(stream === null){
			
			//Connect to twitter stream passing in filter for entire world.
			twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(s) {
				stream = s;
				stream.on('data', function(data){
					//Does the JSON result have coordinates
					if (data.coordinates){
						if (data.coordinates !== null){
							//If so then build up some nice json and send out to web sockets
							var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

							socket.broadcast.emit("twitter-stream", outputPoint);

							//Send out to web sockets channel.
							socket.emit('twitter-stream', outputPoint);
							}
						}
					});
				});
		}
	});

	// Emits signal to the client telling them that
	// they are connected and can start receiving Tweets
	socket.emit("connected");

});
