var express = require('express')
  , _ = require('underscore')
  , fs = require('fs')
  , app = express.createServer();



// A middleware that simply interrupts every request
function worseThanUselessMiddleware(req, res, next) {
  next("Hey are you busy?")
}


app.configure(function() {
  var hourMs = 1000*60*60;
  app.use('/', express.static(__dirname + '/app', { maxAge: hourMs }));
  app.use('/scripts', express.directory(__dirname + '/app/scripts', {icons: true}));

  //app.use('/less', worseThanUselessMiddleware);

  //app.use('/scripts', hello());

  app.use(express.errorHandler());
});

app.listen(8080);