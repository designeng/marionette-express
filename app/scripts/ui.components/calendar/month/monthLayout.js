define([
		'underscore',
		'marionette',
		'vent',
		'moment',
		'hbars!templates/ui.components/calendar/month/monthLayoutTpl',
		'ui.components/calendar/month/monthHeaderView',
		'ui.components/calendar/month/monthView'
], function(_, Marionette, vent, moment, MonthLayoutTpl, MonthHeaderView, MonthView) {

	'use strict';

	var monthLayout = Marionette.Layout.extend({
		template: MonthLayoutTpl,

		regions: {
			monthHeaderRegion: "#monthHeader",
			monthBodyRegion: "#monthBody"
		},

		initialize: function() {
			console.log("init")
		},

		bindUIElements: function() {
			this.bindMonthHeader();
			this.bindMonthBody();
		},

		bindMonthHeader: function() {
			var monthHeaderView = new MonthHeaderView({});

			this.monthHeaderRegion.show(monthHeaderView);
		},

		bindMonthBody: function() {
			var a = moment();
			var monthModel = {
				year: a.format("YYYY"),
				monthNumber: a.format("MM"),
				monthName: a.format("MMMM")
			}
			var monthView = new MonthView({
				model: monthModel
			});

			this.monthBodyRegion.show(monthView);
		}
	});

	return monthLayout;
});