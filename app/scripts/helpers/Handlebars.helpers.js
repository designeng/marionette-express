/**
* Helper for declation support for Handlebars
* sample {{_decl 123 '["day","day","days"]'}}
*/
Handlebars.registerHelper('_decl', function(num, formsJSON) {
	formsJSON = Handlebars.helpers._(formsJSON);
	var forms = JSON.parse(formsJSON);
	if(num % 10 == 1 && num % 100 != 11) {
		return forms[0];
	} else if ((num % 10 >= 2) && (num % 10 <= 4) && (num % 100 < 10 || num % 100 >= 20)) {
		return forms[1];
	} else {
		return forms[2];
	}
});


/**
* Helper for data-subview support (vendors/backbone.subviews.js)
*/
Handlebars.registerHelper('subview', function( subviewName ) {
        return "<div data-subview='" + subviewName + "'></div>";
});
