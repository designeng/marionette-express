define([
		'backbone',
		'underscore',
		'marionette',
		'Handlebars',
		'vent',
		'hbars!templates/ui.components/calendar/searchOptionsPanel/transplantViewTpl'
], function(Backbone, _, Marionette, Handlebars, vent, TransplantViewTpl) {

	'use strict';

	var TransplantView = Marionette.ItemView.extend({

		template: TransplantViewTpl

		


	});

	return TransplantView;
});