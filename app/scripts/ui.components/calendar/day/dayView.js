define(
[
        "marionette",
        "vent",
        'hbars!templates/ui.components/calendar/day/dayViewTpl'
], function(Marionette, Vent, dayViewTpl) {

    var DayView = Backbone.Marionette.ItemView.extend({

        template: dayViewTpl,

        events: {
            "mouseover .calendar__day": "dayOver",
            "mouseout .calendar__day": "dayOut",
            "click .calendar__day": "dayClick"
        },

        initialize: function(options){
            var currentDay = moment().format("YYYY MM DD");
            if(this.model.get("year") + " " + this.model.get("month") + " " + this.model.get("day") === currentDay){
                console.log("current day")
                this.$el.addClass("calendar__day--now");
            }
        },

        onShow: function() {
            console.log("DayView onShow");
            Vent.trigger("firstevent");
        },

        dayOver: function() {
            this.$el.addClass("calendar__day--over");
        },

        dayOut: function() {
            this.$el.removeClass("calendar__day--over");
        },

        dayClick: function() {
            console.log("click")
        }

    });


    return DayView;
});