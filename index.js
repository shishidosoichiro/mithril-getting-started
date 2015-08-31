var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1000 * 60 * 60 * 24 * 365 }));
var options = {
	root: path.join(__dirname, '/public/')
}
app.get(/\/.*/, function (req, res) {
  res.sendFile('index.html', options);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
