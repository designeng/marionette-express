var express = require('express')
  , _ = require('underscore')
  , fs = require('fs')
  , app = express.createServer();


var exp = {};
_.extend(exp, express);

//_.extend(exp, {newDirectory:{}});
exp.newDirectory = express.directory;

_.extend(express.directory, {
  sayWord: function(word){
       console.log(word)
  }
});

//exp.newDirectory.sayWord("test");

//var res = exp.newDirectory(__dirname + '/app/scripts', {icons: true});

var processingFunc = function directory(req, res, next) {
    return function directory(req, res, next) {
        res.end("fine 123");
    }
}


var superDirFunc = _.compose(processingFunc, exp.newDirectory);


exp.newDirectory = superDirFunc;

//return;



for(var i in exp.newDirectory){
  console.log(i, exp.newDirectory[i])
}
/*
prop = "insertScript";
var isprop = _.has(exp.newDirectory, prop);
console.log("PROP:", isprop);
console.log("PROP:", exp.newDirectory[prop]);
*/

app.configure(function() {
  var hourMs = 1000*60*60;
  app.use('/', exp.static(__dirname + '/app', { maxAge: hourMs }));
  app.use('/scripts', exp.newDirectory(__dirname + '/app/scripts', {icons: true}));

  //app.use('/scripts', hello());

  app.use(exp.errorHandler());
});

app.listen(8086);


return;

var expD = express.newDirectory;

prop = "html";
var isprop = _.has(expD, prop);
console.log("PROP:", isprop);
console.log("PROP:", expD[prop]);


/*
var hello = function(name) { return "hello: " + name; };
hello = _.wrap(hello, express.directory(__dirname + '/app/scripts', {icons: true}));
*/