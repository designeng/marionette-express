var express = require('express'),
  _ = require('underscore'),
  fs = require('fs'),
  path = require('path'),
  colors = require('colors'),
  gaze = require('gaze'),
  atImport = require(__dirname + '/lib/tasks/utils/at-import'),
  extname = path.extname,
  join = path.join,
  app = express.createServer(),
  io = require('socket.io').listen(app, {
    log: false
  }),
  watchSocket,
  applicationPort = process.env.PORT || 8084;


io.sockets.on('connection', function(socket) {
  console.log("watchSocket connection started".cyan)
  watchSocket = socket;
});

var grunt = require("grunt");

var winston = require('winston'),
  logPath = 'log/common.log';
winston.add(winston.transports.File, {
  filename: logPath
});

/* -------------- Settings ------------------ */

//watchFolders - where ...Views.js located
//but for Models specs also con be created
//TODO: change array name for more apropriate

//make it more clear (TODO)
var scriptsBaseDir = "app/scripts";

var editorOptions = {
  editor: "Sublime Text 2",
  openfile: true //open file with editor?
}

var specOptions = {
  scriptsBaseDir: scriptsBaseDir,
  specBaseDir: "test/spec",
  specPrefix: "spec",
  specIndex: "test/SpecIndex.js",
  specTemplate: "templates/spec.js",
  fileExtention: "js",
  watchFolders: ["views", "ui.components"],
  editor: editorOptions.editor,
  openfile: editorOptions.openfile
};

var templateOptions = {
  scriptsBaseDir: scriptsBaseDir,
  tplBaseDir: "app/templates",
  appPrefix: "app/", //to delete from beginning for inserting path-line in define
  specIndex: "test/SpecIndex.js",
  tplTemplate: "templates/tpl.html",
  tplPathSuffix: "Tpl",
  fileExtention: "js",
  watchFolders: ["views", "ui.components"], //realy needed?
  editor: editorOptions.editor,
  openfile: editorOptions.openfile
};

var addFunctionsOptions = {
  scriptsBaseDir: scriptsBaseDir,
  snippetsPath: "templates/snippets",
  editor: editorOptions.editor,
  openfile: editorOptions.openfile
};

var cssOptions = {
  templateDir: "app/templates",
  stylesBaseDir: "app/styles/less", //here must be saved created .css with the same path structure as the source html-template file 
  destFileExtention: "less",
  editor: editorOptions.editor,
  openfile: editorOptions.openfile
}
/* -------------- /Settings ------------------ */

//watch files in listed in array places 
gaze(['app/scripts/*.js',
    'app/scripts/**/*.js',
    'app/scripts/ui.components/**/*.js',
    'test/spec/**/*.js',
    'app/templates/**/*.html',
    'app/templates/ui.components/**/*.html'
], function(err, watcher) {
  // Get all watched files
  //console.log(this.watched());

  // On file changed
  this.on('changed', function(filepath) {
    console.log(filepath + ' was changed');

    //watch for changes in main.js require config 
    if(filepath.indexOf("app/scripts/main.js") != -1){
        console.log(filepath + ' CHANGED!');
    }
  });

  // On file added
  this.on('added', function(filepath) {
    console.log(filepath + ' was added');

    watchSocket.emit('added', {
      file: filepath
    });
  });

  // On file deleted
  this.on('deleted', function(filepath) {
    console.log(filepath + ' was deleted!');

    winston.log('warn', filepath.replace(__dirname, "") + " was deleted");

    watchSocket.emit('deleted', {
      file: filepath
    });
  });

  // Get watched files with relative paths
  //console.log(this.relative());
});

//watch common log file
gaze('log/common.log', function(err, watcher) {
  this.on('changed', function(filepath) {
    watchSocket.emit('logchanged');
  });
});

//router - move all tasks in special directories! (TODO)
var appRouter = require(__dirname + '/lib/router');

//"grunt tasks" in different modules
var autospecs = require(__dirname + '/lib/tasks/autospecs'),
  makeCssFromHtml = require(__dirname + '/lib/tasks/cssfromhtml'),
  templateForJs = require(__dirname + '/lib/tasks/templateforjs'),
  addFunctions = require(__dirname + '/lib/tasks/addfunctions');

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
          .replace('{linked-path}', htmlPath(dir))
          .replace('{port}', applicationPort);
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
      re,
      found,
      disableClass = '',
      toolsTpl = '',
      toolsSpec = '',
      toolsCss = '',
      toolsFunctions = '';


    if (useIcons && '..' != file) {
      icon = icons[extname(file)] || icons.
      default;
      icon = '<img src="data:image/png;base64,' + load(icon) + '" />';
      classes.push('icon');
    }

    if (file.indexOf(".js") > 0) {

      //Entities without tools-tpl support (we can't create template for model, controller, router... what else?)
      if (file.match(/model/i) || file.match(/router/i) || file.match(/controller/i)) {
        disableClass = 'disable';
      }

      toolsTpl = '<div class="tools-tpl created ' + disableClass + '" data-file="' + join(dir, file) + '" data-tpl-file="' + file + '"></div>';
      toolsSpec = '<div class="tools-spec created" data-file="' + join(dir, file) + '"></div>';
      toolsFunctions = '<div class="tools-func" data-file="' + join(dir, file) + '" data-toggle="modal" href="#functions-list"></div>';
    }

    if (file.indexOf(".html") > 0) {
      toolsCss = '<div class="tools-css created" data-file="' + join(dir, file) + '"></div>';
    }

    return '<li><a href="' + join(dir, file) + '" class="' + classes.join(' ') + '"' + ' title="' + file + '">' + icon + file + toolsTpl + toolsSpec + toolsFunctions + toolsCss + '</a></li>';

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
  app.use(express.bodyParser());
  app.use('/', express.static(__dirname + '/app'));
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/app', express.directory(__dirname + '/app', {
    icons: true
  }));

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

  //autospecs: create specs suite for test-driven development

  app.get('/*/*.tdd', function(req, res) {
    var str = req.url;
    str = str.replace(".tdd", ".js")
    fs.readFile(__dirname + str, function(err, content) {

      if (err) {
        console.log("ERROR! ", err);
        return;
      }

      content = content.toString();

      _.extend(specOptions, {
        relativePath: (str.replace("/" + specOptions.scriptsBaseDir, "")).substr(0, str.lastIndexOf(".")),
        originPath: str,
      });

      var result = autospecs.createTests(content, specOptions, winston);

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

      _.extend(cssOptions, {
        changedFilePath: str,
        htmlCode: content
      });

      var result = makeCssFromHtml.make(content, cssOptions, winston);

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

      _.extend(templateOptions, {
        relativePath: (str.replace("/" + templateOptions.scriptsBaseDir, "")).substr(0, str.lastIndexOf(".")),
        originPath: str,
        tplPath: tplPath
      });

      var result = templateForJs.createTemplate(content, templateOptions, winston);

      res.send(result);
    });
  });

  //add functions to .js source

  app.post('/addfunctions', function(req, res) {

    var filepath = req.body.file,
      functionListToInsert = req.body.functions;

    fs.readFile(__dirname + filepath, function(err, content) {

      if (err) {
        console.log("ERROR! ", err);
        return;
      }

      content = content.toString();

      _.extend(addFunctionsOptions, {
        relativePath: (filepath.replace("/" + addFunctionsOptions.scriptsBaseDir, "")).substr(0, filepath.lastIndexOf(".")),
        originPath: filepath
      });

      var result = addFunctions.insert(content, functionListToInsert, addFunctionsOptions, winston);

      res.send(result);
    });
  });

  app.post('/createlayout', appRouter.createLayout);

  //app.post('/createbemstyles', appRouter.createBemStyles);

  //find already created specs
  app.get('/specs.json', function(req, res) {
    var str = req.url,
      content = "{";

    function findSpecForFile(abspath, rootdir, subdir, filename) {
      if (filename.indexOf(".js") != -1) {
        for (var i = 0, l = specOptions.watchFolders.length; i < l; i++) {
          if (abspath.indexOf(specOptions.scriptsBaseDir + "/" + specOptions.watchFolders[i]) != -1) {

            var specPath = abspath.replace(specOptions.scriptsBaseDir, "");
            specPath = specOptions.specBaseDir + specPath;

            if (grunt.file.exists(specPath)) {
              content += '"/' + abspath + '":"' + specPath + '",';
            } else {

            }
          }
        }
      }
    }

    grunt.file.recurse(specOptions.scriptsBaseDir, findSpecForFile);
    if (content.length > 1) {
      content = content.substring(0, content.length - 1);
    }
    content += "}";
    res.send(content);
  });

  //find already created templates

  app.get('/templates.json', function(req, res) {
    var str = req.url,
      content = "{";

    function findTemplateForFile(abspath, rootdir, subdir, filename) {
      if (filename.indexOf(".js") != -1) {

        var tplPath = abspath.replace(templateOptions.scriptsBaseDir, "");
        tplPath = tplPath.replace(".js", templateOptions.tplPathSuffix + ".html");

        var tplPath = templateOptions.tplBaseDir + tplPath;

        if (grunt.file.exists(tplPath)) {
          content += '"/' + abspath + '":"' + tplPath + '",';
        } else {

        }
      }
    }

    grunt.file.recurse(templateOptions.scriptsBaseDir, findTemplateForFile);
    if (content.length > 1) {
      content = content.substring(0, content.length - 1);
    }

    content += "}";

    res.send(content);
  });

  //find already created for html-template .css

  app.get('/css.json', function(req, res) {
    var str = req.url,
      content = "{";

    function findCssForFile(abspath, rootdir, subdir, filename) {
      if (abspath.indexOf(cssOptions.templateDir) != -1 && filename.indexOf(".html") != -1) {

        var cssPath = abspath.replace(cssOptions.templateDir, "");
        cssPath = cssPath.replace(".html", ".css");

        cssPath = cssOptions.stylesBaseDir + cssPath;

        if (grunt.file.exists(cssPath)) {
          content += '"/' + abspath + '":"' + cssPath + '",';
        } else {

        }
      }
    }

    grunt.file.recurse(cssOptions.templateDir, findCssForFile);
    if (content.length > 1) {
      content = content.substring(0, content.length - 1);
    }

    content += "}";

    res.send(content);
  });

  //logger enter point here

  app.get('/log.html', function(req, res) {
    fs.readFile(__dirname + '/public/log.html', 'utf8', function(err, str) {
      if (err) {
        console.log(err)
        res.send('ERROR: ' + err);
      } else {
        str = str
          .replace('{port}', applicationPort);
        res.send(str);
      }
    });
  });

  app.get('/log.txt', function(req, res) {
    var lines,
      delimiter = "|";

    fs.readFile(__dirname + '/log/common.log', 'utf8', function(err, content) {
      if (err) {
        console.log("ERROR!", err);
        res.send("ERROR: " + err);
        return;
      }
      lines = content.split('\n');
      content = "";
      for (var l in lines) {
        var line = lines[l];
        content += line + delimiter;
      }
      if (content.length > 1) {
        content = content.substring(0, content.length - 1);
      }

      res.send(content);
    });

  });

  app.post('/log/clear', function(req, res) {
    grunt.file.write(logPath, "");
    res.send("Log cleared");
  });


  app.use(express.errorHandler());

  console.log(("SERVER STARTED AT PORT " + applicationPort).green)
});

app.listen(applicationPort);