'use strict';

var fs = require("fs"),
    _ = require('underscore'),
    esprima = require("esprima"),
    esmorph = require('../lib/esmorph'),
    traverse = require('traverse');

var relativePath = "",
    result = null,
    tree,
    functionList = [],
    requireJsModuleObject,//Class name, OR main object, defined in requireJs module
    expectations = "",
    parsedCodeStr;

var sys = require('sys');
var exec = require('child_process').exec,
    child;

var prompt = require('prompt');
var colors = require('colors');

module.exports = function (grunt) {

    grunt.registerMultiTask('autocreationtests', 'Parse js file with esmorph', function () {


        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {

                // Concat specified files.

                var code = f.src.filter(function (filepath) {

                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }

                }).map(function (filepath) {
                    // Read file source.
                    return grunt.file.read(filepath);
                }
                ).join('');

                //if @DoNotCreateTests annotation in beginning of file exists
                if(code.indexOf("@DoNotCreateTests") > 0 || code.indexOf("@Don'tCreateTests") > 0){
                    return;
                }


                function processFunction(func){
                    //in common case, the first obtained function is Anonymous, and has "[Anonymous]" name in Abstract syntax tree
                    //in requireJS environment it must return Class name, defined in requireJS module, as usial
                    if(func.name === "[Anonymous]" && func.exit !== null && func.exit.argument.type === 'Identifier'){
                        requireJsModuleObject = func.exit.argument.name;
                    } else{
                        expectations += "\t\texpect(t." + func.name + ")." + "\n";
                    }

                    /*
                    if(typeof func.exit === "object" && func.exit !== null) {
                        console.log("RETURN: ", func.exit.argument)
                    } else {
                        console.log("EXIT is not Object: ")
                    }
                    */
                }

                function inArray(array, value) {
                    for(var i=0, l = array.length; i < l; i++) {
                        if(array[i] === value) {
                            return true;
                        }
                    }
                    return false;
                }

                function insertLine(filepath, codeLine){
                    var lines = fs.readFileSync(filepath, 'utf8').split('\n'),
                    rawData = '',
                    specUrls = [],
                    re = /\]/i;
                    for (var l in lines){
                        var line = lines[l];
                        specUrls.push(line.replace( /^[^"]*"|".*/g, '' ));    
                        var found = line.match(re);
                        if(found) {
                            if(inArray(specUrls, codeLine)){
                                return;
                            } else{                                
                                rawData += "\t\t,\"" + codeLine + "\"" + "\n";
                                rawData += line + "\n";
                            }
                        } else{
                            rawData += line + "\n";
                        }
                    }
                    //return rawData;
                    //write rawData to index file
                    grunt.file.write(filepath, rawData);
                }

                function createSpec(specTemplate, specPath, subject){
                    //var generator = new Generator();
                    //generator.template(specTemplate, specPath, subject);
                    //generator.run();
                    var obj = _.clone(subject || {});
                    fs.readFile("./" + specTemplate, function (err, content) {

                        if (err) {
                            console.log("ERROR! ", err);
                            return;
                        }

                        content = content.toString();

                        
                        if (content != '') {
                            content = _.template(content, obj);
                        }  
                
                        grunt.file.write(specPath, content);
                    });
                }

                //init all variables 
                grunt.event.on('regarde:file', function () {
                    relativePath = "";
                });

                
                //Below is prompt for autocreation tests. Prompt is needed because tests could be written yet and we don't want rewrite them!
                var done = grunt.task.current.async();

                prompt.start();

                var property = {
                  name: 'yesno',
                  message: 'Create tests for ' + f.src + '?',
                  validator: /y[es]*|n[o]?/,
                  warning: 'Must respond yes or no',
                  default: 'no'
                };

                //
                // Get the simple yes or no property
                //
                prompt.get(property, function (err, result) {
                    if(result.yesno === 'no'){
                        console.log('Task is rejected by user.');
                        //if the task will be runing under regarde, the next line shoud be commented
                        process.exit(0);
                    } else{
                        //may be it "if" must be deleted
                        if(code.indexOf("@CreateTests") < 0){
                            console.log('Task exit, @CreateTests is not found'.red);
                            process.exit(0);
                        }
                        

                        tree = esprima.parse(code, { range: true, loc: true, tolerant: true });

                        //errors in code handling
                        if (tree.errors.length === 0) {
                            grunt.log.ok();
                        } else {
                            grunt.log.write('\n');
                            tree.errors.forEach(function (e) {
                                grunt.log.error(e.message);
                            });
                            return;
                        }

                        functionList = esmorph.collectFunction(code, tree);



                        functionList.forEach(processFunction);


                        var specPathToBeCreated = f.specBaseDir + f.relativePath;

                        //insert new spec in f.specIndex file list
                        insertLine(f.specIndex, f.specBaseDir.split("/")[1] + f.relativePath);//but it couldnot be hardcoded... (f.specBaseDir defined as "test/spec" as usial)

                        var path = specPathToBeCreated.replace(".js", "").replace(f.specBaseDir + "/", ""),
                            pathArr = path.split("/"),
                            specDescription = "", 
                            suffix;

                        for(var i = 0; i < pathArr.length; i++){
                            if(i < pathArr.length - 1){
                                suffix = "::";
                            } else{
                                suffix = "";
                            }
                            specDescription += pathArr[i] + suffix;
                        }

                        var subject = {
                            path: path,
                            specDescription: specDescription,
                            name: requireJsModuleObject,
                            expectations: expectations
                        }

                        //and create new spec
                        createSpec(f.specTemplate, specPathToBeCreated, subject);
                    }
                  done();
                });

            
        });
    });

};
