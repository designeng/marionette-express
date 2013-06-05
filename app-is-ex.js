var grunt = require("grunt"),
  dirty = require("dirty");

var watchFolders = ["views", "ui.components"];

var options = {
  scriptsBaseDir: "app/scripts",
  specBaseDir: "test/spec",
  specPrefix: "spec",
  specIndex: "test/SpecIndex.js",
  specTemplate: "templates/spec.js",
  fileExtention: "js"
}

  function findSpecForFile(abspath, rootdir, subdir, filename) {
    if (subdir) {
      var pathArr = subdir.split("/"),
        folder = inArray(watchFolders, pathArr[1]);
      if (pathArr[0] == "scripts" && pathArr[1] != undefined && folder && filename.indexOf(".js") != -1) {
        if(grunt.file.exists(options.specBaseDir + "/" + folder + "/" + filename)){
          console.log("SPEC EXISTS FOR:", abspath, rootdir, subdir, filename.green)
          specsDb.set(abspath, {spec: true});
        } else{
          console.log(abspath, rootdir, subdir, filename.red)
        }        
      }
    }
  }

  //var ex = grunt.file.exists("app/scripts/views/anotherView.js")

var specsDb = dirty('specs.db');
grunt.file.recurse("app", findSpecForFile);

specsDb.forEach(function(key, val) {
    console.log('Found key: %s, val: %j', key, val);
});

//console.log(ex);

function inArray(array, value) {
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] === value) {
      return value;
    }
  }
  return false;
}