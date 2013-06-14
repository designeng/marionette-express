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

exports.createTemplate = function(code, options, winston) {

    //if @DoNotCreateTests annotation in beginning of file exists
    if (code.indexOf("@DoNotCreateTemplate") > 0 || code.indexOf("@Don'tCreateTemplate") > 0) {
        return "";
        var result = "Template file for <span class='error'>" + options.originPath + "</span> was not created for the reason of @DoNotCreateTemplate in the file content";
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
            console.log(("Template for " + options.originPath + " is not created! Check file for errors!").red)
            return "Template is not created! Check your <span style='color:red'>" + options.originPath + "</span> file for errors!";
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

        var tplPathToBeCreated = options.tplBaseDir + (options.relativePath).replace(".js", options.tplPathSuffix + ".html");
        var tplPath = (options.tplBaseDir).replace(options.appPrefix, "") + options.relativePath;
        tplPath = tplPath.replace(".js", "") + options.tplPathSuffix;

        //  "." - fix me!

        //console.log(functionList[0].node.params.length)
        //console.log(functionList[0].node.params)

        var pathArr = tplPath.split("/");
        var templateArgumentName = pathArr[pathArr.length - 1];

        /*
        path to template is the part of "hbars" path, after "!" is going argument of hbars plugin - the path to template itself.
        functionList[0].node.range - positions, where first function from file located.
        It must be anonymous function with the name = '[Anonymous]'.
        We are going to insert a new argument to it named as {fileName}{options.tplPathSuffix} (for ex. 'myViewTpl'),
        it will be inserted just after last argument.

        lastArgumentObj = {
            type: 'Identifier',
            name: '........',
            range: [ ...., ..... ],
            loc: { start: [Object], end: [Object]}
        }
        */

        insertPathToTemplateAndTemplateArgument(
            "." + options.originPath,
            "hbars!" + tplPath,
            templateArgumentName,
            functionList,
            winston);

        var subject = {
            filename: options.originPath
        }

        //and create new template
        //  "./" - fix me!

        createTemplate("./" + options.tplTemplate, tplPathToBeCreated, subject);

        if (options.openfile) {
            if (!options.editor) options.editor = "Sublime Text 2";
            var command = 'open -a "' + options.editor + '" ' + tplPathToBeCreated;
            exec(command);
        }

        var result = "Template file for " + options.originPath + " was created and path inserted into define area";
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

function insertPathToTemplateAndTemplateArgument(filepath, templatePathStr, templateArgName, functionList, winston) {
    var resultContent = "",
        result,
        funcRange = functionList[0].node.range,
        lastArgumentObj = functionList[0].node.params[functionList[0].node.params.length - 1];

    fs.readFile(filepath, function(err, content) {
        if (err) {
            console.log("ERROR! ", err);
            return;
        }

        content = content.toString();

        if (content != '') {
            if (content.indexOf(templatePathStr) >= 0) {
                result = "Path to template already exists in define array in  " + filepath + " view";
                winston.log('warn', result);
                return;
            }
            //defineRangeStr contains "define" function name & it first argument (define array)
            var defineRangeStr = content.substring(0, funcRange[0]);

            //split functionRangeStr to before- and after- strings
            var beforeInsertingStr = content.substring(0, lastArgumentObj.range[1]);
            var afterInsertingStr = content.substring(lastArgumentObj.range[1], funcRange[1]);

            console.log(beforeInsertingStr.red)

            resultContent += beforeInsertingStr + ", " + templateArgName + afterInsertingStr + ");"; //");" - closing the "define" function

            //insert template attribute to view
            var insertPosition,
                entities = ["View", "Layout"];

            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i],
                    str = entity + ".extend({";
                if (resultContent.indexOf(str) > 0) {
                    insertPosition = resultContent.indexOf(str) + (str).length;
                    break;
                }
            };

            if (resultContent.indexOf("template:") == -1) {
                //split resultContent to before- and after- strings
                beforeInsertingStr = resultContent.substring(0, insertPosition);
                afterInsertingStr = resultContent.substring(insertPosition);

                //if position bug occurs (why? - if "render" function typed without space line after ".extend({", range[0] = position before parentheses)
                /*
                var funcPos = afterInsertingStr.indexOf("render");
                if (funcPos > 0) {
                    beforeInsertingStr += afterInsertingStr.substring(0, funcPos);
                    afterInsertingStr = afterInsertingStr.substring(funcPos);
                }
                */

                resultContent = beforeInsertingStr + "\t\ttemplate: " + templateArgName + ",\n\n" + afterInsertingStr;
            } else {
                console.log(("Attribute 'template' already exists in '" + filepath + "' view!").red)

                result = "Attribute 'template' already exists in  " + filepath + " view";
                winston.log('warn', result);
            }

            console.log(resultContent)
            //insert templatePathStr and write result file
            insertLine(filepath, resultContent, templatePathStr);
        } else {
            console.log((filepath + " is empty!").red);

            result = filepath + " is empty!";
            winston.log('warn', result);
        }
    });
}

function insertLine(filepath, content, codeLine) {
    //here must be testing for existing template-path-line in define 
    //and another...

    var lines = content.split('\n'),
        rawData = '',
        re = /\]/i;
    for (var l in lines) {
        var line = lines[l];

        var found = line.match(re);
        if (found) {
            rawData += ",\n\t\t'" + codeLine + "'\n";
            rawData += line + "\n";
        } else {
            rawData += line + "\n";
        }
    }
    rawData = beautify(rawData);
    grunt.file.write(filepath, rawData);
}

function createTemplate(tplTemplate, tplPath, subject) {
    var obj = _.clone(subject || {});
    fs.readFile("./" + tplTemplate, function(err, content) {

        if (err) {
            console.log("ERROR! ", err);
            return;
        }

        content = content.toString();

        if (content != '') {
            content = _.template(content, obj);
        }

        grunt.file.write(tplPath, content);
    });
}