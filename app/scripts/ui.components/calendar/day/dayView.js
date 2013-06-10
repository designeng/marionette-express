define(
[
        "marionette",
        "vent",
        'hbars!templates/ui.components/calendar/day/dayViewTpl'
], function(Marionette, Vent, dayViewTpl) {

    var DayView = Backbone.Marionette.ItemView.extend({

        template: dayViewTpl,
        /*
                render: function() {
                    var templateHtml = this.template(this.model);
                    this.$el.html(templateHtml);
                    return this;
                },
*/
        events: {

        },

        onShow: function() {
            console.log("DayView onShow");
            Vent.trigger("firstevent");
        },

        serializeData: function() {
            var data = {};

            if (this.model) {
                data = this.model.toJSON();
            } else if (this.collection) {
                data = {
                    items: this.collection.toJSON()
                };
            }

            console.log("serializeData", this.cid, this.model)
            return data;
        },


    });


    return DayView;
});