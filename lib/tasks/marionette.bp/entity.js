/* Creates Backbone.Marionette entities (layout, etc...) from templates
 
 */

'use strict';

var fs = require("fs"),
	_ = require('underscore'),
	Handlebars = require('handlebars'),
	grunt = require("grunt"),
	beautify = require('js-beautify').js_beautify,
	colors = require('colors');

var sys = require('sys');
var exec = require('child_process').exec,
	child;

var winston = require('winston');

//TODO: merge this with root app script

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

var entityDir;

exports.createLayout = function(dir, name, regions) {
	if (typeof regions) {
		var result = dir + " " + name + " " + regions.length;
		console.log(result.red)
	} else{

	}


	var regionsObj = {};

	if (regions.length > 0) {

		for (var i = 0; i < regions.length; i++) {
			regionsObj[i] = {};
			regionsObj[i].name = regions[i];
			regionsObj[i].selector = regions[i];
		};
	} else {
		
	}

	var templateName = "layout.js";

	var subject = {
		layoutDir: dir.replace(entityOptions.scriptsBaseDir, ""),
		layoutName: name,
		regions: regionsObj
	}

	entityDir = subject.layoutDir;

	var pathToTemplate = entityOptions.templatePath + "/" + templateName;
	var pathToNewFile = dir + "/" + name + ".js";

	if (pathToNewFile.indexOf("/") == 0) {
		pathToNewFile = pathToNewFile.substring(1);
	}

	console.log(pathToTemplate, pathToNewFile)

	createEntity(pathToTemplate, pathToNewFile, subject, editorOptions);

	winston.log('info', "Created for data: " + result);

	return result;
};


/* private methods */

Handlebars.registerHelper("_toLowerFirstChar", function(str) {
	str = str.charAt(0).toLowerCase() + str.slice(1);
	return str;
});

Handlebars.registerHelper("_toUpperFirstChar", function(str) {
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
});


Handlebars.registerHelper('_pathToViewArgs', function(regions) {
	var buffer = "",
		template = "",
		content = "",
		count = 0,
		i = 0,
		key;

	var strTpl = '{{#with this}}"' + entityDir + '/{{_toLowerFirstChar name}}View"{{/with}}';
	template = Handlebars.compile(strTpl);

	for (key in regions) {
		count++;
	}

	for (key in regions) {
		content = template(regions[key]);
		buffer += content;
		if (i < count - 1) {
			buffer += ",\n";
		}
		i++;
	}

	return new Handlebars.SafeString(buffer);
});

Handlebars.registerHelper('_args', function(regions) {
	var buffer = "",
		template = "",
		content = "",
		count = 0,
		i = 0,
		key;

	var strTpl = ', {{#with this}}{{_toUpperFirstChar name}}View{{/with}}';
	template = Handlebars.compile(strTpl);


	for (key in regions) {
		content = template(regions[key]);
		buffer += content;
	}

	return new Handlebars.SafeString(buffer);
});


Handlebars.registerHelper('_bindUIElementsHash', function(regions) {
	var buffer = "",
		template = "",
		content = "",
		count = 0,
		i = 0,
		key;

	var strTpl = '{{#with this}}this.bind{{_toUpperFirstChar name}}(){{/with}}';
	template = Handlebars.compile(strTpl);

	for (key in regions) {
		count++;
	}

	for (key in regions) {
		content = template(regions[key]);
		buffer += content;
		if (i < count - 1) {
			buffer += ";\n";
		}
		i++;
	}

	return new Handlebars.SafeString(buffer);
});

Handlebars.registerHelper('_bindRegionViewsHash', function(regions) {
	var buffer = "",
		template = "",
		content = "",
		count = 0,
		i = 0,
		key;
		/*
		var monthHeaderView = new MonthHeaderView({});

			this.monthHeaderRegion.show(monthHeaderView);
			*/
	var bindRegionViewsHashStrTpl = '{{#with this}}bind{{_toUpperFirstChar name}}: function(){\n\
		var {{_toLowerFirstChar name}}View = new {{_toUpperFirstChar name}}View({});\
		this.{{_toLowerFirstChar name}}Region.show({{_toLowerFirstChar name}}View);\
	}{{/with}}';
	template = Handlebars.compile(bindRegionViewsHashStrTpl);

	for (key in regions) {
		count++;
	}

	for (key in regions) {
		content = template(regions[key]);
		buffer += content;
		if (i < count - 1) {
			buffer += ",\n";
		}
		i++;
	}

	return new Handlebars.SafeString(buffer);
});


Handlebars.registerHelper('_regionsHash', function(regions) {
	var buffer = "",
		template = "",
		content = "",
		count = 0,
		i = 0,
		key;

	var regionHashStrTpl = '{{#with this}}{{_toLowerFirstChar name}}Region: "#{{_toLowerFirstChar selector}}"{{/with}}';
	template = Handlebars.compile(regionHashStrTpl);

	for (key in regions) {
		count++;
	}

	for (key in regions) {
		content = template(regions[key]);
		buffer += content;
		if (i < count - 1) {
			buffer += ",\n";
		}
		i++;
	}

	return new Handlebars.SafeString(buffer);
});


function createEntity(tplPath, entityPath, subject, options) {
	console.log(tplPath);

	var obj = _.clone(subject || {});
	fs.readFile("./" + tplPath, function(err, content) {

		if (err) {
			console.log("ERROR! ", err);
			return;
		}

		content = content.toString();

		//console.log(content.green)

		if (content != '') {
			var template = Handlebars.compile(content);
			content = template(obj);
		}

		content = beautify(content);

		grunt.file.write(entityPath, content);

		if (options.openfile) {
			if (!options.editor) options.editor = "Sublime Text 2";
			var command = 'open -a "' + options.editor + '" ' + "." + entityPath;
			exec(command);
		}
	});
}