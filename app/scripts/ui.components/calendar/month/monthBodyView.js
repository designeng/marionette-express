define(
[
		"marionette",
		"app",
		"vent",
		"moment",
		"ui.components/calendar/day/dayModel",
		"ui.components/calendar/month/monthCollection",
		"ui.components/calendar/day/dayView",
		"ui.components/calendar/month/monthHeaderView",
		'hbars!templates/ui.components/calendar/month/monthBodyViewTpl'
], function(Marionette, App, vent, moment, dayModel, MonthCollection, DayView, MonthHeaderView, MonthBodyViewTpl) {

	'use strict';

	var MonthBodyView = Backbone.Marionette.CollectionView.extend({
		template: MonthBodyViewTpl,

		itemView: DayView,

		className: "v-monthBody",

		initialize: function(options) {
			this._firstDay = new dayModel({
				moment: moment(this.model.year + " " + this.model.monthNumber)
			});

			this.collection = new Backbone.Collection();
		},

		/* overridden */
		render: function() {
			var templateHtml = this.template({});
			this.$el.html(templateHtml);

			//countdown: begin from previous day (it's the last day of previos month)
			var start = parseInt(this._firstDay.get("moment").format("d")) - 1;
			if(start === -1){
				start = 6;
			}

			for (var i = start; i > 0; i--) {
				this.$el.find(".calendar__days").prepend("<a class='calendar__day'></a>");
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
			var firstDayNum = this._firstDay.get("moment").format("D"), //or just 1 ?
				monthDaysDuration = moment(this._firstDay.get("year") + " " + this._firstDay.get("month"), "YYYY MM").daysInMonth();

			//collection populating
			for (var i = firstDayNum; i <= monthDaysDuration; i++) {
				var day = new dayModel({
					moment: moment(this._firstDay.get("year") + " " + this._firstDay.get("month") + " " + i)
				});
				this.collection.add(day, {
					silent: true
				});
			};

			//return i;
		}


	});

	return MonthBodyView;
});