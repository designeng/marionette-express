var logentries = require('./logger');

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var log = logentries.logger({
  token:'YOUR_TOKEN'
})

log.on('error',function(err){
  console.log('LOG ERROR: ', err)
})

log.on('test',function(data){
  console.log("LOG:", data)
})

var http = require('http');
http.createServer(function (req, res) {

  log.info( req.connection.remoteAddress+', '+req.method+', '+req.url)

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');

// level specific methods like 'info', 'debug', etc.
emitter.emit("test", {data: "TEST123"})

emitter.on('test',function(data){
  console.log("LOG:", data)
})