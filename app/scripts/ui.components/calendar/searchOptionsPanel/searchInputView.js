define([
		'backbone',
		'underscore',
		'marionette',
		'Handlebars',
		'vent',
		'i18n!nls/general',
		'hbars!templates/ui.components/calendar/searchOptionsPanel/searchInputViewTpl'
], function(Backbone, _, Marionette, Handlebars, vent, localized, searchInputViewTpl) {

	'use strict';

	var SearchInputView = Marionette.View.extend({
		template: searchInputViewTpl,

		templateParams: null,

		events:{
			"click .search-options__search-btn": "searchBtnClick"
		},

		initialize: function() {
			this.templateParams = _.extend({}, this.model, localized);
		},

		render: function() {
			var renderedTemplate = this.template(this.templateParams);
			this.$el.html(renderedTemplate);

			return this;
		},

		searchBtnClick: function(){
			console.log("searchBtnClick");

			vent.trigger("searchbtn:clicked");
		}


	});

	return SearchInputView;
});