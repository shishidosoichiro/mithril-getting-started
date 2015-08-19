var express = require('express');
var app = express();

var options = {
	root: __dirname + '/public/'
}
app.get('/js/app.js', function (req, res) {
  res.sendFile('js/app.js', options);
});
app.get(/\/.*/, function (req, res) {
  res.sendFile('index.html', options);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
