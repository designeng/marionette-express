/* Creates Backbone.Marionette entities (layout, etc...) from templates
 
 */

'use strict';

var fs = require("fs"),
	_ = require('underscore'),
	async = require("async"),
	beautify = require('js-beautify').js_beautify,
	colors = require('colors'),
	sys = require('sys'),
	exec = require('child_process').exec,
	child,
	winston = require('winston'),
	entityDir,
	filesToWrite;

var Handlebars = require('handlebars'),
	hreg = require("../utils/handlebarsRegister");

//TODO: merge this with root app script (my be)

var editorOptions = {
	editor: "Sublime Text 2",
	openfile: true //open file with editor?
}

var entityOptions = {
	scriptsBaseDir: "/app/scripts/",
	templatePath: "templates/entities",
	editor: editorOptions.editor,
	openfile: editorOptions.openfile
};

exports.createLayout = function(dir, name, regions) {

	var subject, templateName, pathToTemplate, pathToNewFile,
		regionsObj = {};

	filesToWrite = [];

	if (typeof regions) {
		var result = dir + " " + name + " " + regions.length;
	} else {

	}

	if (dir.charAt(0) == "/") {
		dir = dir.slice(1);
	}

	if (regions.length > 0) {

		for (var i = 0; i < regions.length; i++) {
			regionsObj[i] = {};
			regionsObj[i].name = regions[i];
			regionsObj[i].selector = regions[i];

			// by default, create new entities in regions as itemView

			templateName = "itemView.js";
			pathToTemplate = entityOptions.templatePath + "/" + templateName;
			pathToNewFile = dir + "/" + regions[i];

			if (name.indexOf("View") == -1) {
				pathToNewFile += "View";
			}

			pathToNewFile += ".js";

			subject = {
				viewDir: dir.replace(entityOptions.scriptsBaseDir, ""),
				parentLayoutName: name,
				viewName: regions[i]
			}

			filesToWrite.push({
				path: pathToNewFile,
				template: pathToTemplate,
				subject: subject
			});
		};
	} else {

	}

	templateName = "layout.js";

	subject = {
		layoutDir: dir.replace(entityOptions.scriptsBaseDir, ""),
		layoutName: name,
		regions: regionsObj
	}

	entityDir = subject.layoutDir;

	//and register Handlebars helpers!
	hreg.register(entityDir);

	pathToTemplate = entityOptions.templatePath + "/" + templateName;
	pathToNewFile = dir + "/" + name;

	if (name.indexOf("Layout") == -1) {
		pathToNewFile += "Layout";
	}

	pathToNewFile += ".js";

	filesToWrite.push({
		path: pathToNewFile,
		template: pathToTemplate,
		subject: subject
	});

	async.map(filesToWrite, writeEntity, function(err, results) {
		if (err) {
			console.log("ERR", err);
			return;
		}
	});

	return result;
};

function writeEntity(obj) {
	console.log("writeEntity", obj.path, obj.template, obj.subject);

	createEntity(obj.template, obj.path, obj.subject);
}

/* This function can be called also from "createLayout" - just to cover all our boilerplating needs.
 TODO: rewrite it!
 */

exports.createView = function(dir, name) {
	var templateName = "itemView.js";

	var subject = {
		layoutDir: dir.replace(entityOptions.scriptsBaseDir, ""),
		viewName: name + "View"
	}

	var pathToTemplate = entityOptions.templatePath + "/" + templateName;
	var pathToNewFile = dir + "/" + name + ".js";

	if (pathToNewFile.charAt(0) == "/") {
		pathToNewFile = pathToNewFile.slice(1);
	}

	createEntity(pathToTemplate, pathToNewFile, subject);

	if (entityOptions.openfile) {
		if (!entityOptions.editor) entityOptions.editor = "Sublime Text 2";
		var command = 'open -a "' + entityOptions.editor + '" ' + "." + entityPath;
		exec(command);
	}

	winston.log('info', result);

	return result;
};


/* private methods */

function createEntity(tplPath, entityPath, subject) {
	console.log("createEntity: " + tplPath);

	var obj = _.clone(subject || {});
	fs.readFile("./" + tplPath, function(err, content) {

		if (err) {
			console.log("ERROR! ", err);
			return;
		}

		content = content.toString();

		if (content != '') {
			var template = Handlebars.compile(content);
			content = template(obj);
		}

		content = beautify(content);

		fs.writeFile(entityPath, content, function() {
			winston.log('info', "Created entity: " + entityPath);
		});
	});
}