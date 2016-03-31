// Standard NodeJS APIs
var http = require('http');
var fs = require('fs');
var path = require('path');

// NPM packages
var director = require('director');
var mustache = require('mustache');

// setup some basic mime types
var mimeTypes = {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg':  'image/jpeg',
  'png':  'image/png',
  'js':   'text/javascript',
  'css':  'text/css'
}

// handler function for rendering views
function view(name, context) {
  var tmpl = fs.readFileSync(
                path.join(__dirname, 
                          'tmpl', 
                          name + '.html'));
    
  return mustache.render(tmpl.toString(), context);
}

// file not found handler
function handle404(req, resp) {
  resp.writeHead(404, {'Content-Type': 'text/plain'});
  resp.write('404 Not Found\n');
  resp.end();
}

// setup and configure the router/controller
var router = new director.http.Router();

// a sample dynamic route
router.get('/hello/:name', function(name) {
  this.res.writeHead(200, {'Content-Type': 'text/html'});
  this.res.end(view('index', {name: name}));
});

// another route
router.get('/time', function(name) {
  this.res.writeHead(200, {'Content-Type': 'text/json'});
  var currentTime = new Date();
  var data = {};
  data.year = currentTime.getFullYear();
  data.month = currentTime.getMonth() + 1;
  data.date = currentTime.getDate();
  data.hour = currentTime.getHours();
  data.min = currentTime.getMinutes();
  data.second = currentTime.getSeconds();
  data.millis = currentTime.getMilliseconds();
  this.res.end(JSON.stringify(data));
});

//static file handling route
router.get('/static/?((\w|.)*)', function(filePath) {
  var self = this;
  var fullFilePath = path.join(__dirname, 'static', filePath);
  fs.exists(fullFilePath, function(exists) {
    if(!exists) {
      //console.log("Static resource doesn't exist: " + filePath);
      handle404(self.req, self.res);
      return;
    }
    var mime = mimeTypes[path.extname(filePath).split('.')[1]];
    self.res.writeHead(200, {'Content-Type': mime});
    var fileStream = fs.createReadStream(fullFilePath);
    fileStream.pipe(self.res);
  });
})

// create and start the server
http.createServer(function(req, resp) {
  router.dispatch(req, resp, function(err) {
    if(err) {
      handle404(req, resp);
    }
  });
}).listen(3000, function() {
  console.log('Server listening on localhost:3000');
});
