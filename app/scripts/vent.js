define(['backbone.wreqr'], function(Wreqr) {
	"use strict";

	var VentSingleton = (function() {
		var instance;

		return {
			getInstance: function() {

				if (!instance) {
					instance = new Wreqr.EventAggregator();
				}

				return instance;
			}
		};

	})();

	var vent = VentSingleton.getInstance();

	return vent;
});