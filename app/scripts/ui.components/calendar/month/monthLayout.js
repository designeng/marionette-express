define([
		'underscore',
		'marionette',
		'vent',
		'moment',
		'ui.components/calendar/month/monthHeaderView',
		'ui.components/calendar/month/monthBodyView',
		'hbars!templates/ui.components/calendar/month/monthLayoutTpl'
], function(_, Marionette, vent, moment, MonthHeaderView, MonthBodyView, MonthLayoutTpl) {

	'use strict';

	var MonthLayout = Marionette.Layout.extend({
		template: MonthLayoutTpl,

		className: "monthLayout",

		regions: {
			monthNameRegion: ".monthLayout__monthName",
			monthHeaderRegion: ".monthLayout__monthHeader",
			monthBodyRegion: ".monthLayout__monthBody"
		},

		//may be not strictly, and creating MonthLayoutModel is more true way...
		//options.monthMoment - the current day (or current day plus N)
		initialize: function(options) {
			//this._monthMoment = options.monthMoment;
			this._left = options.model.get("left");
		},

		onRender: function() {
			this.$el.css("left", this._left);
			this.$el.find("#monthName").html(this.model.get("monthNumber"));
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
			var monthBodyView = new MonthBodyView({
				model: {
					year: this.model.get("year"),
					monthNumber: this.model.get("monthNumber")
				}

			});
			this.monthBodyRegion.show(monthBodyView);

		}
	});

	return MonthLayout;
});