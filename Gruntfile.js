/*
 * Copyright (c) 2013 Denis Savenok
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

var showTestsInTerminal = false;


module.exports = function (grunt) {

    grunt.initConfig({
        
        connect: {
          livereload: {
            options: {
              port: 8877,
              base: '.',
              middleware: function(connect, options) {
                return [lrSnippet, folderMount(connect, options.base)]
              }
            }
          },

          //task "connect:builded" for browser checking builded application
          builded: {
            options: {
              port: 8989,
              base: 'app-build'
            }
          }
        },

        livereload: {
            port: 35737 // Default livereload listening port. (35729 ?)
        },

        less: {
          all: {
            src: 'app/styles/less/app.less',
            dest: 'app/styles/css/app.css',
            options: {
              compress: true
            }
          }
        },

        regarde: {    
          jsspec: {
            files: ['test/spec/**/*.js', 'test/SpecRunner.js', '!node_modules/**/*.js'],
            tasks: ['livereload']
          },
          js: {
            files: ['app/scripts/*.js'], //"first-level" js - tests in specs not needed
            tasks: ['livereload']
          },
          js_autocreationtests: {
            files: ['app/scripts/**/*.js', 'app/scripts/**/**/*.js', 'app/scripts/**/**/**/*.js', 'app/scripts/**/**/**/**/*.js'],
            //tasks: ['copy', 'clean', 'autocreationtests']
            tasks: ['autocreationtests', 'livereload']
          },
          html: {
            files: ['app/templates/**/*.html', 'app/templates/**/**/*.html'],
            //tasks: ['copy', 'clean', 'autocreationtests']
            tasks: ['livereload']
          },
          css: {
            files: ['app/styles/less/app.less', 'app/styles/less/**/**.less'],
            tasks: ['less', 'livereload']
          }
        },

        handlebars:{
          compile:{
            options:{
              wrapped:true,
              namespace:"agent.Templates.FORM.TEMPLATES",
              processName:function (filename) {
                var name = filename.split('/');
                name = name[name.length - 1];
                name = name.substr(0, name.length - 5);
                return name;
              }
            },
            //changes need
            files:{
              "app/js_compile/compilate_tpl_forms.js":["app/templates/tpl_forms/*.html"]
            }
          }
        },

        jasmine : {
          src : 'app/**/*.js',
          options : {
            specs : 'test/**/*.js',
            template : require('grunt-template-jasmine-istanbul'),
            templateOptions: {
              coverage: 'reports/coverage.json',
              report: 'reports/coverage'
            }
          }
        },

        exec: {
          jasmine: {
            command: 'phantomjs test/lib/run-jasmine.js http://localhost:8877/test',
            stdout: true
          },
          //testing creation templates on the fly
          module: {
            command: 'node node_modules/node-forge/forge.js create bar bar-cloned-12345',
            stdout: true
          },
          view: {
            command: 'node node_modules/node-forge/forge.js create bar bar-cloned-12345',
            stdout: true
          }
        }
/*
        autocreationtests: {
                multiple: {
                    src: "app/scripts/ui.components/calendar/routeChooser.js",
                    specIndex: "test/spec/index.js"
                }
        }
*/
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-template');

    //testing tools
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //tests coverage
    grunt.loadNpmTasks('grunt-plato');

    grunt.registerTask('r', ['connect', 'regarde']);

    grunt.registerTask('a', ['autocreationtests']);//parse with esmorph, create tests

    grunt.registerTask('t', ['jasmine']);

    grunt.registerTask('default', ['less', 'livereload-start', 'connect', 'regarde']);

    

    grunt.event.on('regarde:file', function (status, name, filepath, tasks, spawn) {
        var changedFilePath = filepath;

        console.log("Changed: " + changedFilePath)

        var srcScripts = [],
            filesToDelete = [],
            filesToCopy = [],
            relativePath,
            lastIndex;

        srcScripts.push(changedFilePath);//push to array, which is the value of parsejs.multiple.src

        var fileExtention = "js",
            destForCopyTask = 'copiedSpec/',
            editor = "Sublime Text 2";

        var scriptsBaseDir = "app/scripts",
            specBaseDir = "test/spec",
            specPrefix = "spec",
            specIndexJs = "test/SpecIndex.js",
            specTemplate = "templates/spec.js";

        relativePath = changedFilePath.replace(scriptsBaseDir, "");
        //relativePath = specBaseDir + relativePath;
        lastIndex = relativePath.lastIndexOf(".");
        relativePath = relativePath.substr(0, lastIndex);
        relativePath = relativePath + "." + fileExtention;

        console.log("relativePath: " + relativePath)

        filesToCopy.push(relativePath);
        filesToDelete.push(relativePath);

        grunt.initConfig({

            copy: {
              main: {
                files: [
                  {expand: true, src: filesToCopy, dest: destForCopyTask} // includes files in path
                ]
              }
            },
            // Before generating new file, remove previously-created css file.
            clean: {
                    tests: filesToDelete
            },

            autocreationtests: {
                multiple: {
                    src: srcScripts,
                    changedFilePath: changedFilePath,
                    specBaseDir: specBaseDir,
                    specIndex: specIndexJs, //here's must be listed all incoming tests (the same path structure as the source .js file)
                    specPrefix: specPrefix,
                    relativePath: relativePath, //computed relative path
                    specTemplate: specTemplate,
                    editor: editor,
                    openfile: true  //open file with editor?
                }
            }
        });
    });
};
