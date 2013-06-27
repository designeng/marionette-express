define([
		'marionette',
		'vent',
		'scripts/app.js',
		'ui.components/calendar/calendarLayout'
], function(Marionette, vent, App, CalendarLayout) {

	'use strict';

	//here lowcase, because we pass it to app.js as instanse and write "calendarModule.start();" in app.addInitializer callback!
 	var calendarModule = App.module("CalendarModule", function(CalendarModule, App) {

 		var calendarController;

		this.startWithParent = false;

		var CalendarController = Marionette.Controller.extend({
			initialize: function(options) {
				options = options || {};
			},

			show: function(){
				var calendarLayout = new CalendarLayout();
				App.calendarModuleWrapper.show(calendarLayout);
				this.triggerMethod("render");
			},

			onRender: function(){
				console.log("calendar rendered!");
			},

			move: function(dir){
				if(dir === "back"){
					console.log("back controller");
				} else if (dir === "forward"){
					console.log("forward controller");
				}
			}
		});


		// Public Data And Functions - just to mark place
		// -------------------------

		CalendarModule.someData = "public data";

		CalendarModule.someFunction = function() {
			console.log(CalendarModule.someData);
		}


		// Initializers
		// ------------

		CalendarModule.addInitializer(function(args) {
			calendarController = new CalendarController({});
			calendarController.show();

			vent.trigger("module:started", "calendar");
		});

		CalendarModule.addInitializer(function() {
			vent.on("calendar:back", function(){
				calendarController.move("back");
			});
			vent.on("calendar:forward", function(){
				calendarController.move("forward");
			});
		});

		CalendarModule.addFinalizer(function() {
			if (calendarController) {
				calendarController.close();
				calendarController = null;
			}
		});


		
	});

	return calendarModule;
});