define(
	[
	"marionette",
	"vent",
	'hbars!/templates/ui.components/combobox/dropdownlist',	
	"ui.components/combobox/settings"
	],
	function(Marionette, Vent, DropDownListTemplate, Settings){
	
	var DropDownListView = Backbone.Marionette.CollectionView.extend({

		template: DropDownListTemplate,

		render: function() {
 			var data = _.extend({}, this.model, Settings);
	        var templateHtml = this.template(data);
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
	    },

	    secondHandler: function(event) {
	      Vent.trigger("pager:last");
	    },

	    onShow: function() {
	        console.log("DropDownListView onShow");
	        Vent.trigger("firstevent");
	    }

  	});

	return DropDownListView;
});