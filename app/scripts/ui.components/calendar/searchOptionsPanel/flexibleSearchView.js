define([
		'backbone',
		'underscore',
		'marionette',
		'Handlebars',
		'vent',
		'hbars!templates/ui.components/calendar/searchOptionsPanel/flexibleSearchViewTpl'
], function(Backbone, _, Marionette, Handlebars, vent, FlexibleSearchViewTpl) {

	'use strict';

	var FlexibleSearchView = Marionette.ItemView.extend({

		template: FlexibleSearchViewTpl,

		events:{
			"click #flexible-search__input": "flexibleSearchChanged"
		},

		onRender: function(){
			console.log("onRender---123")
		},

		flexibleSearchChanged: function(){
			console.log("flexibleSearchChanged")

		}


	});

	return FlexibleSearchView;
});