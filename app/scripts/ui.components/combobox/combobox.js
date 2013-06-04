define(
	[
	"marionette",
	"vent",
	'hbars!/templates/ui.components/combobox/template',
	"ui.components/combobox/views/inputview",
	"ui.components/combobox/views/dropdownlistview",
	"ui.components/combobox/settings"
	],
	function(Marionette, Vent, ComboboxTemplate, InputView, DropDownListView, Settings){

	var Combobox = Backbone.Marionette.Layout.extend({
		template: ComboboxTemplate,

		inputView: null,
		dropDownListView: null,

		regions: {
		    inputRegion: "#combobox__input",
		    dropdownlistRegion: "#combobox__dropdownlist"
		},

 		initialize: function(){
        	this.inputView = new InputView();
        	this.dropDownListView = new DropDownListView();
    	},

 		render: function() {
 			var data = {};
	        var templateHtml = this.template(data);
	        this.$el.html(templateHtml);

	        return this;
	    },

	    onRender: function(){
	    	console.log("Combobox onRender"); //don't work
    	},

    	onShow: function() {
    		console.log("Combobox onShow")
        	this.inputRegion.show(this.inputView);
        	this.dropdownlistRegion.show(this.dropDownListView);
    	}
	});

	return Combobox;
});