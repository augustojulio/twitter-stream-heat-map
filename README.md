twitter-stream-heat-map
========================

Shows how to stream real time twitter data to Google Maps using NodeJS.

The original project can be found here <a href="https://github.com/safesoftware/twitter-streaming-nodejs" target="_blank">here</a>

A detailed explanation of the original project can be found <a href="http://blog.safe.com/2014/03/twitter-stream-api-map/" target="_blank">here</a>. 

Steps to run the project:

1) Install Node.js
2) Download this GitHub project
3) Create application on Twitter to get these values:
	API key > consumer_key
	API secret > consumer_secret
	Access token > access_token_key
	Access token secret > access_token_secret
4) Install the dependencies (defined in package.json). From the terminal, cd to the project directory you downloaded so you are in the same folder as server.js. Then do:
	npm install
5) Run the server:
	node server.js

You should then be able to open a browser and access http://localhost:8081.
