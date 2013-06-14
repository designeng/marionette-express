define(
[
		"marionette",
		"vent",
		"moment",
		'i18n!nls/general',
		"ui.components/calendar/day/dayModel",
		"ui.components/calendar/month/monthCollection",
		"ui.components/calendar/day/dayView",
		"ui.components/calendar/month/monthHeaderView",
		'hbars!templates/ui.components/calendar/month/monthViewTpl'
], function(Marionette, Vent, moment, localizedText, dayModel, MonthCollection, DayView, MonthHeaderView, MonthViewTpl) {

	'use strict';

	var MonthView = Backbone.Marionette.CollectionView.extend({

		firstDay: null,

		template: MonthViewTpl,

		itemView: DayView,

		id: "month",

		initialize: function(options) {
			//var templateHtml = this.template({});
			//console.log(templateHtml)


			//set moment lang to russian:
			moment.lang('ru', {
				weekdaysShort: localizedText.loc_moment_weekdaysShort
			});

			this.firstDay = new dayModel({
				moment: moment(this.model.year + " " + this.model.monthNumber)
			});

			this.collection = new MonthCollection();
		},

		/* overridden */
		render: function() {
			var templateHtml = this.template({});
			this.$el.html(templateHtml);

			var year, month, lastNumberOfPreviousMonthDay, start;

			//var previousMonthDayView = new DayView({model:{day: 123}});
			//this.$el.find(".calendar__days").prepend(previousMonthDayView.el);


			if (this.firstDay.get("month") <= 1) {
				year = this.firstDay.get("year") - 1;
				month = 12;
			} else {
				year = this.firstDay.get("year");
				month = this.firstDay.get("month") - 1;
			}
			lastNumberOfPreviousMonthDay = moment(year + " " + month, "YYYY MM").daysInMonth();

			//countdown: begin from previous day (it's the last day of previos month)
			start = parseInt(this.firstDay.get("moment").format("d")) - 1;
			for (var i = start; i > 0; i--) {
				this.$el.find(".calendar__days").prepend("<div class='calendar__day'></div>");
			};

			this.isClosed = false;
			this.triggerBeforeRender();
			this._renderChildren();
			this.triggerRendered();
			return this;
		},


		appendHtml: function(collectionView, itemView) {
			collectionView.$el.find(".calendar__days").append(itemView.el);
		},

		onBeforeRender: function() {
			console.log("onBeforeRender");

			var firstDayNum = this.firstDay.get("moment").format("D"), //or just 1 ?
				monthDaysDuration = moment(this.firstDay.get("year") + " " + this.firstDay.get("month"), "YYYY MM").daysInMonth();

			for (var i = firstDayNum; i <= monthDaysDuration; i++) {
				var day = new dayModel({
					moment: moment(this.firstDay.get("year") + " " + this.firstDay.get("month") + " " + i)
				});
				this.collection.add(day, {
					silent: true
				});
			};
		},

		onRender: function() {

		}


	});

	return MonthView;
});