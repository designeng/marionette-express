define(
	[
	"marionette",
	"vent",
	'hbars!templates/ui.components/calendar/month/monthViewTpl'
	],
	function(Marionette, Vent, MonthViewTpl){
	
	var MonthView = Backbone.Marionette.CollectionView.extend({

		template: MonthViewTpl,

		initialize: function(options){
    		this.collection;
  		},

		render: function() {
	        var templateHtml = this.template(this.model);
	        this.$el.html(templateHtml);
	        return this;
	    },

	    events: {
	      "firstevent": "firstHandler",
	      "secondevent": "secondHandler"
	    },

	    firstHandler: function(event) {
	      //Vent.trigger("dropdownlist:first");
	      console.log("DropDownListView firstHandler");
	    }
	    


  	});

	return MonthView;
});