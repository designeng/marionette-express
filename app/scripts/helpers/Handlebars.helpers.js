/**
 * Helper for i18n support for Handlebars 
 */
Handlebars.registerHelper('_', function(text){
	if(arguments.length > 2){
		var str = arguments[0],
			params = _.toArray(arguments).slice(1,-1),
			param;
		while(str.indexOf("%s") != -1){
			param = params.length==1 ? params[0] : params.shift();
			str = str.replace(/%s/, param);
		}
		text = str;
	}else{
		//@TODO
		//Get string from lang config (scripts/lang/)
	}
	return text;
});

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