define(
	[
	"marionette",
	"vent",
	'hbars!/templates/ui.components/calendar/day/dayViewTpl'
	],
	function(Marionette, Vent, DayViewTemplate){
	
	var DayView = Backbone.Marionette.ItemView.extend({

		template: DayViewTemplate,

		initialize: function(options){
    		this.model = {
    			dayNumber: 1
    		}
  		},

		render: function() {
	        var templateHtml = this.template(this.model);
	        this.$el.html(templateHtml);
	        return this;
	    },

	    events: {
	      "firstevent": "firstHandler",
	      "secondevent": "secondHandler"
	      // . . . . . . . . . 
	    },

	    firstHandler: function(event) {
	      //Vent.trigger("dropdownlist:first");
	      console.log("DropDownListView firstHandler");
	    },

	    secondHandler: function(event) {
	      Vent.trigger("pager:last");
	    },

	    onShow: function() {
	        console.log("DropDownListView onShow");
	        Vent.trigger("firstevent");
	    }


  	});
  	

	return DayView;
});