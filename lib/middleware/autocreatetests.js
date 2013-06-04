/*!
 * Connect - query
 * Copyright(c) 2013 Denis Savenok
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var grunt = require("grunt");

/**
 
 *
 * @return {Function}
 * @api public
 */

module.exports = function autoCreateTests(){
  return function autoCreateTests(req, res, next){
    console.log(req.url)
    res.end("Grunt task autoCreateTests called for " + req.url)

    return;

	}	
}
    //var command = 'grunt createtemplate" ' + req.url;
    /*
    var command = 'grunt';
    exec(command, function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});

    res.end("Grunt task called for " + req.url)
    */
    //res.end(__dirname + "/../../");
    //return;
    /*
    var filepath = "new/sometest.js";
    var str = req.url;
    fs.readFile(__dirname + "/../../" + str.replace(".ct", ".js"), function (err, content) {

                        if (err) {
                            console.log("ERROR! ", err);
                            return;
                        }

                        content = content.toString();                 
                
                        grunt.file.write(filepath, content);
                    });
    //grunt.file.write(filepath, str);
  };
};
*/
