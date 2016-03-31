// NPM Express module
var express = require('express');
// construct Express app
var app = express();

// handle a dynamic route and return dynamic text
app.get('/hello/:name', function(req, resp) {
  resp.send('Hello '+req.params.name+'!');
});

// handle a simple route and return JSON
app.get('/time', function(req, resp) {
  var currentTime = new Date();

  var data = {};
  data.year = currentTime.getFullYear();
  data.month = currentTime.getMonth() + 1;
  data.date = currentTime.getDate();
  data.hour = currentTime.getHours();
  data.min = currentTime.getMinutes();
  data.second = currentTime.getSeconds();
  data.millis = currentTime.getMilliseconds();

  resp.json(data);
});

// start the server
var server = app.listen(4040, function() {
  console.log('Server started at %s:%s', 
                server.address().address, 
                server.address().port);
});
