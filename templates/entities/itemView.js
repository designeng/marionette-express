define([
		'underscore',
		'marionette',
		'vent'
], function(_, Marionette, vent) {

	'use strict';

	var {{ _toViewClassName viewName }} = Marionette.ItemView.extend({

		className: "{{ parentLayoutName }}__{{ _toLowerFirstChar viewName }} {{ parentLayoutName }}__item {{ _toLowerFirstChar viewName }}"

	});

	return {{ _toViewClassName viewName }};
});