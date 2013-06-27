define([
		'underscore',
		'marionette',
		'vent',
		{{ _pathToViewArgs regions }}
], function(_, Marionette, vent {{ _args regions }}) {

	'use strict';

	var {{ _toLayoutClassName layoutName }} = Marionette.Layout.extend({

		regions: {
			{{ _regionsHash regions }}
		},

		bindUIElements: function() {
			{{_bindUIElementsHash regions}}
		},

		{{_bindRegionViewsHash regions}}
	});

	return {{ _toLayoutClassName layoutName }};
});