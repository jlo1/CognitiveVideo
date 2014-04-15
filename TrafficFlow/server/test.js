var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {

      console.log('here');

          res.end('Hello, world!');

});

server.listen(8080);
