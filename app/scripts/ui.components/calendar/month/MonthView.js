define(
[
		"marionette",
		"vent",
		"ui.components/calendar/day/dayModel",
		"ui.components/calendar/month/monthCollection",
		"ui.components/calendar/day/dayView",
		'hbars!templates/ui.components/calendar/month/monthViewTpl'
], function(Marionette, Vent, dayModel, MonthCollection, DayView, MonthViewTpl) {

	'use strict';

	var MonthView = Backbone.Marionette.CollectionView.extend({

		firstDay: null,

		template: MonthViewTpl,

		itemView: DayView,

		id: "month",

		initialize: function(options) {
		
			this.firstDay = new dayModel({
				moment: moment(this.model.year + " " + this.model.monthNumber)
			});

			this.collection = new MonthCollection();

		},

		appendHtml: function(collectionView, itemView) {
			console.log("itemView.el", itemView.el)
			collectionView.$el.append(itemView.el);
		},

		onBeforeRender: function() {
			console.log("onBeforeRender");

			var firstDayNum = this.firstDay.get("moment").format("D"), //or just 1 ?
				monthDaysDuration = moment(this.firstDay.get("day") + " " + this.firstDay.get("month"), "YYYY MM").daysInMonth();

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
			//console.log("onRender", this.collection)
		}


	});

	return MonthView;
});