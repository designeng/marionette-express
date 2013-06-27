define([
		"backbone"
], function(Backbone) {

	'use strict';

	var MonthLayoutModel = Backbone.Model.extend({
		initialize: function(options) {
			if (typeof options != undefined) {
				this.set({
					year: options.moment.format("YYYY")
				});
				this.set({
					monthNumber: options.moment.format("MM")
				});
				this.set({
					left: options.left
				});
			}
		}

	});

	return MonthLayoutModel;
});