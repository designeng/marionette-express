Handlebars.registerHelper('widget', function(type, options){
	var innerHtml = "";
	if(!!options.fn) innerHtml = options.fn();

	var settings = _.extend(options.hash, {
		uid: Math.ceil(Math.random()*100000), 
		type: type.toLowerCase(),
		componentClass: type,
		innerHtml: innerHtml
	});

	var widgetHtml = wobot.Widgets[type].template(settings);
		// widgetHtml += "<input type='hidden' value=" + JSON.stringify(settings) + " />"

	return new Handlebars.SafeString( widgetHtml );
});