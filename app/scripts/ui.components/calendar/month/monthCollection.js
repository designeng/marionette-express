define(
[
		"backbone",
		"moment",
		"interval",
		"ui.components/calendar/day/dayModel"
], function(Backbone, moment, interval, dayModel) {

	'use strict';

	var MonthCollection = Backbone.Collection.extend({

		initialize: function(options) {

		}

	});

	return MonthCollection;
});