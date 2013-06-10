define(
[
		"backbone",
		"moment",
		"interval",
		"ui.components/calendar/day/dayModel"
], function(Backbone, moment, interval, dayModel) {

	'use strict';

	var MonthCollection = Backbone.Collection.extend({

		//model: dayModel, //- we don't need concriete model for the simple reason - we wont to sync collection with server by it

		firstDay: null,

		initialize: function(options) {

			/*
			this.firstDay = options.firstDay;

			console.log("first day of month :", this.firstDay.get("day"))
			console.log("first weekday of month :", this.firstDay.get("dayOfWeek"))
*/
			//this.populateCollection(options);

			/*
			var mondays = this.where({dayOfWeek: "Monday"});
			console.log(mondays)
			*/
		},

		//this func is not needed... logic moved to onBeforeRender of MonthView
		populateCollection: function(opts) {
			var firstDayNum = opts.firstDay.get("moment").format("D"),
				monthDaysDuration = moment(opts.firstDay.get("day") + " " + opts.firstDay.get("month"), "YYYY MM").daysInMonth()

				for (var i = firstDayNum; i <= monthDaysDuration; i++) {
					var day = new dayModel({moment: moment(opts.firstDay.get("year") + " " + opts.firstDay.get("month") + " " + i)});
					this.add(day, {
						silent: true
					});
				};
		}

	});

	return MonthCollection;
});