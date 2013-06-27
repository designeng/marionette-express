var Handlebars = require('handlebars');

exports.register = function(entityDir) {
	Handlebars.registerHelper("_toLowerFirstChar", function(str) {
		str = str.charAt(0).toLowerCase() + str.slice(1);
		return str;
	});

	Handlebars.registerHelper("_toUpperFirstChar", function(str) {
		return toUpperFirstChar(str);
	});

	Handlebars.registerHelper("_toViewClassName", function(str) {
		str = str.charAt(0).toUpperCase() + str.slice(1) + "View";
		return str;
	});

	Handlebars.registerHelper("_toLayoutClassName", function(str) {
		str = str.charAt(0).toUpperCase() + str.slice(1) + "Layout";
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

	Handlebars.registerHelper('_safeString', function(str) {
		return new Handlebars.SafeString(str);
	});

	Handlebars.registerHelper('_toParamsColumn', function(params) {
		var buffer = "";
		for (var i = 0; i < params.length; i++) {
			buffer += toUpperFirstChar(params[i]);
			if (i < params.length - 1) {
				buffer += ",\n";
			}
		};
		return buffer;
	});

	function toUpperFirstChar(str) {
		str = str.charAt(0).toUpperCase() + str.slice(1);
		return str;
	}

}