'use strict';

var fs = require("fs"),
    jsdom = require("jsdom"),
    path = require("path"),
    grunt = require("grunt"),
    colors = require('colors'),
    window = jsdom.jsdom().createWindow();

var resultClasses,
    resultCss,
    relativePath = "";

var sys = require('sys');
var exec = require('child_process').exec;

//module.exports = function (grunt) {
exports.make = function(htmlCode, options, winston) {
    resultClasses = [];
    resultCss = "";

    //set jsdom environment
    jsdom.env({
        html: "<html><body></body></html>",
        scripts: [
            __dirname + "/jquery/jquery-extended.js"
        ]
    }, function(err, window) {
        var $ = window.jQuery;

        $('body').append(htmlCode);

        var arr = $('body').find('*');

        $.each(arr, function(i, item) {
            var list = $(item).classes();
            $.each(list, function(index, value) {
                if (!inArray(resultClasses, value)) {
                    resultClasses.push(value);
                }
            });
        });

        $.each(resultClasses, function(i, item) {
            resultCss += "." + item + "{\n\n" + "}\n"
        });

        relativePath = options.changedFilePath.replace(options.templateDir, "");
        relativePath = options.stylesBaseDir + relativePath;
        var lastIndex = relativePath.lastIndexOf(".");

        relativePath = relativePath.substr(0, lastIndex);
        relativePath = relativePath + ".css";

        console.log(relativePath);

        // Write the destination file. (File, if exist, must be cleaned in Gruntfile.js "clean" task)
        grunt.file.write(relativePath, resultCss);

        // Print a success message.
        grunt.log.writeln('File "' + relativePath + '" created. / changed ' + options.changedFilePath);

        if (options.openfile) {
            if (!options.editor) options.editor = "Sublime Text 2";
            var command = 'open -a "' + options.editor + '" ' + relativePath;
            exec(command);
        }

        var result = "Template file for <span class='info'>" + options.originPath + "</span> was created and path inserted into define area";
        winston.log('info', result);

    });

}

function inArray(array, value) {
    for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}