/**
 * Mixin for activating widgets after render
 */
define([], function() {
	var Widgets = {}; //shoud be described - may be in outer file

	var Mixins = {};

	Mixins.ActivateWidgets = {
		activateWidgets: function(){
			var that = this;
			this._widgets = this._widgets || [];
			this.$el.find(".widget").each(function(index, $el){
				$el = $($el);
				var data = $el.data();
				var name = data.widget;
				if(name && _.isString(name) && Widgets[name]){
					that._widgets.push(new Widgets[name]({el: $el}));
					$el.data('widget', _.last(that._widgets));
					$el.data('inited', true);
				}
			});
			this.trigger("widgets:ready");
		},
		getWidgetById: function(id){
			return _.find(this._widgets, function(widget){
				return widget.$el.attr("id") == id;
			})
		},
		getWidgetByName: function(name){
			return _.find(this._widgets, function(widget){
				return widget.$el.data().name == name;
			})
		},
		render: function(){
			this.activateWidgets();
		}
	};

	return Mixins;

});
