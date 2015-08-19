var connect = require('connect')
var http = require('http')
var fs = require('fs');
var app = connect()

// respond to all requests
app.use(function(req, res){
	res.end(fs.readFileSync('index.html'));
})

//create node.js http server and listen on port
http.createServer(app).listen(3000)