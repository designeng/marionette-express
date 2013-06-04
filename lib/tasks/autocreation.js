'use strict';

var fs = require("fs"),
    _ = require('underscore'),
    esprima = require("esprima"),
    esmorph = require('../../lib/esmorph'),
    grunt = require("grunt"),
    traverse = require('traverse'),
    colors = require('colors');

var relativePath = "",
    result = null,
    tree,
    functionList = [],
    requireJsModuleObject, //Class name, OR main object, defined in requireJs module
    expectations = "",
    parsedCodeStr;

var sys = require('sys');
var exec = require('child_process').exec,
    child;

exports.createTests = function(code, options) {
    expectations = "";
    tree = undefined;

    //if @DoNotCreateTests annotation in beginning of file exists
    if (code.indexOf("@DoNotCreateTests") > 0 || code.indexOf("@Don'tCreateTests") > 0) {
        return "Spec file was not created, for the reason of @DoNotCreateTests in the file content";
    } else {
        tree = esprima.parse(code, {
            range: true,
            loc: true,
            tolerant: true
        });

        //errors in code handling
        //but 3872 line in esprima.js commented for some reasons (falls in console)

        if(!tree){
            console.log(("Spec for " + options.originPath + " is not created!").red)
            return "Spec file is not created! Check your <span style='color:red'>" + options.originPath + "</span> file for errors!";
        } else{
            if (tree.errors.length === 0) {
                grunt.log.ok();
            } else {
                grunt.log.write('\n');
                tree.errors.forEach(function(e) {
                    grunt.log.error(e.message);
                });
                return;
            }
        }

        functionList = esmorph.collectFunction(code, tree);


        functionList.forEach(processFunction);


        var specPathToBeCreated = options.specBaseDir + options.relativePath;

        //insert new spec in f.specIndex file list
        insertLine(options.specIndex, options.specBaseDir.split("/")[1] + options.relativePath); //but it couldnot be hardcoded... (f.specBaseDir defined as "test/spec" as usial)

        var path = specPathToBeCreated.replace(".js", "").replace(options.specBaseDir + "/", ""),
            pathArr = path.split("/"),
            specDescription = "",
            suffix;

        for (var i = 0; i < pathArr.length; i++) {
            if (i < pathArr.length - 1) {
                suffix = "::";
            } else {
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
        createSpec(options.specTemplate, specPathToBeCreated, subject);

        if (options.openfile) {
            if (!options.editor) options.editor = "Sublime Text 2";
            var command = 'open -a "' + options.editor + '" ' + specPathToBeCreated;
            exec(command);
        }
    }

    return "Spec file for <span style='color:green'>" + options.originPath + "</span> is created!";
    //grunt.file.write(filepath, content);

};

function processFunction(func) {
    //in common case, the first obtained function is Anonymous, and has "[Anonymous]" name in Abstract syntax tree
    //in requireJS environment it must return Class name, defined in requireJS module, as usial
    if (func.name === "[Anonymous]" && func.exit !== null && func.exit.argument.type === 'Identifier') {
        requireJsModuleObject = func.exit.argument.name;
    } else {
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
    for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

function insertLine(filepath, codeLine) {
    console.log("insertLine: ", filepath, codeLine)
    var lines = fs.readFileSync(filepath, 'utf8').split('\n'),
        rawData = '',
        specUrls = [],
        re = /\]/i;
    for (var l in lines) {
        var line = lines[l];
        specUrls.push(line.replace(/^[^"]*"|".*/g, ''));
        var found = line.match(re);
        if (found) {
            if (inArray(specUrls, codeLine)) {
                return;
            } else {
                rawData += "\t\t,\"" + codeLine + "\"" + "\n";
                rawData += line + "\n";
            }
        } else {
            rawData += line + "\n";
        }
    }
    //return rawData;
    //write rawData to index file
    console.log("GRUNT WRITE: ", filepath)
    grunt.file.write(filepath, rawData);
}

function createSpec(specTemplate, specPath, subject) {
    console.log("specTemplate: ", specTemplate)
    //var generator = new Generator();
    //generator.template(specTemplate, specPath, subject);
    //generator.run();
    var obj = _.clone(subject || {});
    fs.readFile("./" + specTemplate, function(err, content) {

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