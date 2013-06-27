'use strict';

var fs = require("fs"),
    _ = require('underscore'),
    esprima = require("esprima"),
    esmorph = require('../../lib/esmorph'),
    beautify = require('js-beautify').js_beautify,
    grunt = require("grunt"),
    traverse = require('traverse'),
    colors = require('colors'),
    sys = require('sys'),
    exec = require('child_process').exec,
    child;

var relativePath = "",
    result = null,
    tree,
    functionList = [],
    requireJsModuleObject, //Class name, OR main object, defined in requireJs module
    expectations = "",
    requireJsModuleParams,
    parsedCodeStr;

var Handlebars = require('handlebars'),
    hreg = require("./utils/handlebarsRegister");

exports.createTests = function(code, options, winston) {
    expectations = "";
    requireJsModuleParams = [];
    tree = undefined;

    //if @DoNotCreateTests annotation in beginning of file exists
    if (code.indexOf("@DoNotCreateTests") > 0 || code.indexOf("@Don'tCreateTests") > 0) {
        var result = "Spec file for " + options.originPath + " was not created for the reason of @DoNotCreateTests in the file content";
        winston.log('error', result);
    } else {
        tree = esprima.parse(code, {
            range: true,
            loc: true,
            tolerant: true
        });

        //errors in code handling
        //but 3872 line in esprima.js commented for some reasons (falls in console)

        if (!tree) {
            //console.log(("Spec for " + options.originPath + " is not created!").red)           

            var result = "Spec file is not created! Check your " + options.originPath + " file for errors!";
            winston.log('error', result);
            return result;
        } else {
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

        var defineArea = getDefineArea(code);


        functionList = esmorph.collectFunction(code, tree);


        functionList.forEach(processFunction);


        var specPathToBeCreated = options.specBaseDir + options.relativePath;

        console.log(options.relativePath);
        hreg.register(options.relativePath);

        //insert new spec in f.specIndex file list
        insertLine(options.specIndex, options.specBaseDir.split("/")[1] + options.relativePath); //but it couldnot be hardcoded... (f.specBaseDir defined as "test/spec" as usial)

        var path = specPathToBeCreated.replace(".js", "").replace(options.specBaseDir + "/", ""),
            pathArr = path.split("/"),
            specDescription = "",
            suffix;

        for (var i = 0; i < pathArr.length; i++) {
            if (i < pathArr.length - 1) {
                suffix = "/";
            } else {
                suffix = "";
            }
            specDescription += pathArr[i] + suffix;
        }

        var subject = {
            defineArea: defineArea,
            path: path,
            specDescription: specDescription,
            name: requireJsModuleObject,
            expectations: expectations,
            requireJsModuleParams: requireJsModuleParams
        }

        //and create new spec
        createSpec(options.specTemplate, specPathToBeCreated, subject);

        if (options.openfile) {
            if (!options.editor) options.editor = "Sublime Text 2";
            var command = 'open -a "' + options.editor + '" ' + specPathToBeCreated;
            exec(command);
        }

        var result = "Spec file for " + options.originPath + " was created";
        winston.log('info', result);
    }

    return result;
};

function getDefineArea(code) {
    var matches = code.match("\\[[^\\]]*]");
    if (matches) {
        return matches[0];
    } else {
        return "";
    }
}

function processFunction(func) {
    //in common case, the first obtained function is Anonymous, and has "[Anonymous]" name in Abstract syntax tree
    //in requireJS environment it must return Class name, defined in requireJS module, as usial
    if (func.name === "[Anonymous]" && func.exit !== null && func.exit.argument.type === 'Identifier') {
        requireJsModuleObject = func.exit.argument.name;

        func.node.params.forEach(function(obj) {
            requireJsModuleParams.push(obj.name);
        });
    } else {
        expectations += "expect(t." + func.name + ")." + "\n";
    }
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

    var obj = _.clone(subject || {});
    fs.readFile("./" + specTemplate, function(err, content) {

        if (err) {
            console.log("ERROR! ", err);
            return;
        }

        content = content.toString();


        if (content != '') {
            var template = Handlebars.compile(content);
            content = template(obj);
        }

        grunt.file.write(specPath, beautify(content));
    });
}