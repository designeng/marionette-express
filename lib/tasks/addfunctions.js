'use strict';

var fs = require("fs"),
    _ = require('underscore'),
    esprima = require("esprima"),
    esmorph = require('../../lib/esmorph'),
    grunt = require("grunt"),
    traverse = require('traverse'),
    colors = require('colors'),
    beautify = require('js-beautify').js_beautify;

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

exports.insert = function(code, functionListToInsert, options, winston) {

    //if @DoNotCreateTests annotation in beginning of file exists
    if (code.indexOf("@DoNotInsertFunc") > 0 || code.indexOf("@Don'tInsertFunc") > 0) {

        var result = "Function(s) were not inserted into <span class='error'>" + options.originPath + "</span> for the reason of @DoNotInsertFunc in the file content";
        winston.log('error', result);
        return result;

    } else {

        tree = esprima.parse(code, {
            range: true,
            loc: true,
            tolerant: true
        });

        //errors in code handling
        //but 3872 line in esprima.js commented for some reasons (falls in console)

        if (!tree) {
            var result = "Function(s) were not inserted! Check your <span style='color:red'>" + options.originPath + "</span> file for errors!";
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

        functionList = esmorph.collectFunction(code, tree);

        //fix me: ".", "./"

        insertFunctions(
            "." + options.originPath,
            functionListToInsert,
            "./" + options.snippetsPath,
            functionList,
            winston);

        if (options.openfile) {
            if (!options.editor) options.editor = "Sublime Text 2";
            var command = 'open -a "' + options.editor + '" ' + "." + options.originPath;
            exec(command);
        }


        result = "Functions [" + functionListToInsert + "] for " + options.originPath + " were inserted into extend scope.";
        winston.log('info', result);
    }

    return result;
};


function inArray(array, value) {
    for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

/*
snippetsPath - snippets base path ("templates/snippets", e.g. This dir includes js-files with functions templates)
*/

function insertFunctions(filepath, functionListToInsert, snippetsPath, functionList, winston) {
    var resultContent = "",
        insertStr = "",
        funcRange = functionList[0].node.range,
        insertPosition,
        beforeInsertingStr,
        afterInsertingStr;

    var existingFunctions = [];
    for (var i = 0; i < functionList.length; i++) {
        if (functionList[i].name !== "[Anonymous]") {
            existingFunctions.push(functionList[i].name);
        }
    }

    fs.readFile(filepath, function(err, content) {
        if (err) {
            console.log("ERROR! ", err);
            return -1;
        }

        content = content.toString();
        resultContent = content;

        if (content != '') {

            var entities = ["View", "Layout", "Controller"];

            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i],
                    str = entity + ".extend({";
                if (resultContent.indexOf(str) > 0) {
                    insertPosition = resultContent.indexOf(str) + (str).length;
                    break;
                }
            };

            //split resultContent to before- and after- strings
            beforeInsertingStr = resultContent.substring(0, insertPosition);
            afterInsertingStr = resultContent.substring(insertPosition);

            for (var i = 0; i < functionListToInsert.length; i++) {
                var funcName = functionListToInsert[i];
                if (!inArray(existingFunctions, funcName)) {
                    var path = snippetsPath + "/" + funcName + ".js";

                    var funcBody = fs.readFileSync(path, 'utf8');
                    insertStr += funcBody + ",\n\n";
                }
            };
            if (insertStr.length) {
                resultContent = beforeInsertingStr + insertStr + afterInsertingStr;
                grunt.file.write(filepath, beautify(resultContent));
                return 1;
            } else {
                console.log(("nothing to write...").red);
                return 0;
            }

        } else {
            console.log((filepath + " is empty!").red);
            return -1;
        }
    });
}