define([
	"marionette",
	"vent"
	], function ( Marionette, Vent) {

	'use strict';

	var months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];

	var MonthModel = Backbone.Model.extend({

		defaults: {
			  year: null
			, month: ''
			, monthId: null
			, days: null
			, start: null
		},

		lastOfPrevMonth: null,

		lastDay: null,

		fetch: function ( yearId, monthId ) {

			var d = new Date( yearId, monthId ),
				startDay = d.getDay();
			this.lastOfPrevMonth = new Date( yearId, monthId, 0 ).getDate();


			var endOfMonth = new Date( yearId, ( monthId + 1 ), 0 ),
				lastDate = endOfMonth.getDate();
			this.lastDay = endOfMonth.getDay();


			this.attributes = {
				year: d.getFullYear(),
				month: months[d.getMonth()],
				monthId: d.getMonth(),
				days: lastDate,
				start: startDay
			};

			this.trigger( 'fetch:month:completed' );
		}

	});

	return MonthModel;
});