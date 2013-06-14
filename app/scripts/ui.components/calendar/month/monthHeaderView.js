define([
		'backbone',
		'underscore',
		'marionette',
		'Handlebars',
		'vent',
		'i18n!nls/general',
		'hbars!templates/ui.components/calendar/month/monthHeaderTpl'
], function(Backbone, _, Marionette, Handlebars, vent, localizedText, monthHeaderTpl) {

	'use strict';

	var monthHeaderView = Marionette.View.extend({
		template: monthHeaderTpl,
		templateParams: null,

		//console.log(localizedText.loc_moment_weekdaysShort)

		initialize: function() {
			var daysOfWeekShorhEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
			var weekHeader = {};
			var prop;
			for (var i = 0; i < daysOfWeekShorhEn.length; i++) {
				prop = daysOfWeekShorhEn[i];
				if (!weekHeader.hasOwnProperty(prop)) {
					weekHeader[prop] = localizedText.loc_moment_weekdaysShort[i];
				}
			};

			this.templateParams = _.extend({}, weekHeader);
		},

		render: function() {
			var renderedTemplate = this.template(this.templateParams);
			this.$el.html(renderedTemplate);
			return this;
		},


	});

	return monthHeaderView;
});