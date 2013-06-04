var express = require('express')
  , app = express.createServer();

app.configure(function() {
  var hourMs = 1000*60*60;
  app.use(express.static(__dirname + '/public', { maxAge: hourMs }));
  app.use('/scripts', express.directory(__dirname + '/app/scripts', {icons: true}));
  app.use(express.errorHandler());
});

app.listen(8087);