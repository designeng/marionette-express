var express = require('express'),
  _ = require('underscore'),
  fs = require('fs'),
  path = require('path'),
  colors = require('colors'),
  extname = path.extname,
  join = path.join,
  app = express.createServer(),
  port = 8084;

var grunt = require("grunt");

//previosly written grunt tasks in different modules
var autocreation = require(__dirname + '/lib/tasks/autocreation');
var makeCssFromHtml = require(__dirname + '/lib/tasks/cssfromhtml');
var templateForJs = require(__dirname + '/lib/tasks/templateforjs');

_.extend(express.directory, {
  //From connect/lib/midleware/directory.js - fixed path to /public directory     
  html: function(req, res, files, next, dir, showUp, icons) {
    fs.readFile(__dirname + '/public/directory.html', 'utf8', function(err, str) {
      if (err) return next(err);
      fs.readFile(__dirname + '/public/css/style.css', 'utf8', function(err, style) {
        if (err) return next(err);
        if (showUp) files.unshift('..');
        str = str.replace('{style}', style)
          .replace('{files}', html(files, dir, icons))
          .replace('{directory}', dir)
          .replace('{linked-path}', htmlPath(dir));
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', str.length);
        res.end(str);
      });
    });
  }

});

//--------------  From connect/lib/midleware/directory.js ---------------------//
/**
 * Icon cache.
 */

var cache = {};

/**
 * Map html `files`, returning an html unordered list.
 * From connect/lib/midleware/directory.js
 */

function html(files, dir, useIcons) {
  return '<ul id="files">' + files.map(function(file) {
    var icon = '',
      classes = [],
      toolsTpl = '',
      toolsTest = '',
      toolsCss = '';

    if (useIcons && '..' != file) {
      icon = icons[extname(file)] || icons.
      default;
      icon = '<img src="data:image/png;base64,' + load(icon) + '" />';
      classes.push('icon');
    }

    if (file.indexOf(".js") > 0) {
      toolsTpl = '<div class="tools-tpl" data-file="' + join(dir, file) + '"></div>';
      toolsTest = '<div class="tools-test" data-file="' + join(dir, file) + '"></div>';
    }

    if (file.indexOf(".html") > 0) {
      toolsCss = '<div class="tools-css" data-file="' + join(dir, file) + '"></div>';
    }

    return '<li><a href="' + join(dir, file) + '" class="' + classes.join(' ') + '"' + ' title="' + file + '">' + icon + file + toolsTpl + toolsTest + toolsCss + '</a></li>';

  }).join('\n') + '</ul>';
}

/**
 * Map html `dir`, returning a linked path.
 */

function htmlPath(dir) {
  var curr = [];
  return dir.split('/').map(function(part) {
    curr.push(part);
    return '<a href="' + curr.join('/') + '">' + part + '</a>';
  }).join(' / ');
}

/**
 * Load and cache the given `icon`.
 *
 * @param {String} icon
 * @return {String}
 * @api private
 */

function load(icon) {
  if (cache[icon]) return cache[icon];
  return cache[icon] = fs.readFileSync(__dirname + '/public/icons/' + icon, 'base64');
}

/**
 * Icon map.
 */

var icons = {
  '.js': 'page_white_code_red.png',
  '.c': 'page_white_c.png',
  '.h': 'page_white_h.png',
  '.cc': 'page_white_cplusplus.png',
  '.php': 'page_white_php.png',
  '.rb': 'page_white_ruby.png',
  '.cpp': 'page_white_cplusplus.png',
  '.swf': 'page_white_flash.png',
  '.pdf': 'page_white_acrobat.png',
  'default': 'page_white.png'
};

//--------------  end ---------------//

app.configure(function() {
  var hourMs = 1000 * 60 * 60;
  app.use('/', express.static(__dirname + '/app'));
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/app', express.directory(__dirname + '/app', {
    icons: true
  }));

  /*
  app.use('/create/:file', function(req, res, next){
      var file = req.params.file;
      console.log(file);
      res.end(file);
  });
*/

  //source highliter
  //js
  app.get('/*/*.js', viewSource);

  //html
  app.get('/*/*.html', viewSource);

  //css
  app.get('/*/*.css', viewSource);

  //css
  app.get('/*/*.less', viewSource);


  function viewSource(req, res, next) {
    var codeclass;
    if ((req.url).indexOf(".js") >= 0) {
      codeclass = "js";
    }
    if ((req.url).indexOf(".html") >= 0) {
      codeclass = "html";
    }
    if ((req.url).indexOf(".css") >= 0 || (req.url).indexOf(".less") >= 0) {
      codeclass = "css";
    }

    if (!codeclass) {
      res.send("File source can not be viewing");
      return;
    }
    fs.readFile(__dirname + '/public/sourceview/index.html', 'utf8', function(err, str) {
      if (err) {
        console.log(err)
        return next(err);
      }
      fs.readFile(__dirname + '/public/css/solarized_dark.css', 'utf8', function(err, style) {
        fs.readFile(__dirname + req.url, 'utf8', function(err, source) {
          if (err) {
            console.log(err)
            res.send('ERROR: ' + err);
          } else {
            str = str
              .replace('{scriptpath}', req.url)
              .replace('{style}', style)
              .replace('{source}', source)
              .replace('{codeclass}', codeclass);
            res.send(str);
          }
        });
      });
    });
  }

  //create template & template path

  app.get('/*/*.ct', function(req, res) {
    var filepath = "new/sometest.js";
    var str = req.url;
    fs.readFile(__dirname + str.replace(".ct", ".js"), function(err, content) {

      if (err) {
        console.log("ERROR! ", err);
        return;
      }

      content = content.toString();

      grunt.file.write(filepath, content);
      res.send("CONTENT changed:\n" + content);
    });

  });

  //Autocreation tests suite for test-driven development

  app.get('/*/*.tdd', function(req, res) {
    var str = req.url;
    str = str.replace(".tdd", ".js")
    fs.readFile(__dirname + str, function(err, content) {

      if (err) {
        console.log("ERROR! ", err);
        return;
      }

      content = content.toString();

      var options = {
        scriptsBaseDir: "app/scripts",
        specBaseDir: "test/spec",
        specPrefix: "spec",
        specIndex: "test/SpecIndex.js",
        specTemplate: "templates/spec.js",
        originPath: str,
        fileExtention: "js",
        editor: "Sublime Text 2",
        openfile: true //open file with editor?
      }

      _.extend(options, {
        relativePath: (str.replace("/" + options.scriptsBaseDir, "")).substr(0, str.lastIndexOf("."))
      });

      var result = autocreation.createTests(content, options);

      res.send(result);
    });
  });

  //Make css file from html template with class names

  app.get('/*/*.makecss', function(req, res) {
    var str = req.url;
    str = str.replace(".makecss", ".html")
    fs.readFile(__dirname + str, function(err, content) {

      if (err) {
        console.log("ERROR! ", err);
        return;
      }

      content = content.toString();

      var stylesFileExtention = "css";

      var options = {
        htmlCode: content,
        changedFilePath: str,
        templateDir: "app/templates",
        stylesBaseDir: "app/styles/less", //here must be saved created .css with the same path structure as the source html-template file 
        editor: "Sublime Text 2",
        openfile: true //open file with editor?
      }

      var result = makeCssFromHtml.make(content, options);

      res.send(result);
    });
  });

  //templateForJs

  app.get('/*/*.maketpl', function(req, res) {

    var str = (req.url).replace(".maketpl", ".js"),
      tplPath = (req.url).replace(".maketpl", ".html");

    fs.readFile(__dirname + str, function(err, content) {

      if (err) {
        console.log("ERROR! ", err);
        return;
      }

      content = content.toString();



      var options = {
        scriptsBaseDir: "app/scripts",
        tplBaseDir: "app/templates",
        appPrefix: "app/",//to delete from beginning for inserting path-line in define
        specIndex: "test/SpecIndex.js",
        tplTemplate: "templates/tpl.html",
        originPath: str,
        tplPath: tplPath,
        tplPathSuffix: "Tpl",
        fileExtention: "js",
        editor: "Sublime Text 2",
        openfile: true //open file with editor?
      }

      _.extend(options, {
        relativePath: (str.replace("/" + options.scriptsBaseDir, "")).substr(0, str.lastIndexOf("."))
      });

      var result = templateForJs.createTemplate(content, options);

      res.send(result);
    });
  });


  app.use(express.errorHandler());

  console.log(("SERVER STARTED AT PORT " + port).green)
});

app.listen(port);