define(
[
        "marionette",
        "vent",
        'hbars!templates/ui.components/calendar/day/dayViewTpl'
], function(Marionette, Vent, dayViewTpl) {

    var DayView = Backbone.Marionette.ItemView.extend({

        template: dayViewTpl,

        tagName: "a",

        className: "calendar__day",


        events: {
            "click .calendar__day": "dayClick"
        },

        initialize: function(options) {
            var currentDay = moment().format("YYYY MM DD");
            var dayStr = this.model.get("year") + " " + this.model.get("month") + " " + this.model.get("day");
            var isAfterCurrent = moment(dayStr).isAfter(currentDay);

            //add state "now"
            if (dayStr === currentDay) {
                this.$el.addClass("calendar__day--now");
            }

            //add state "actual" (intersects with "now" state)
            if (dayStr === currentDay || isAfterCurrent) {
                this.$el.addClass("calendar__day--actual");

                //add state "weekend"
                if (this.model.get("isWeekend")) {
                    this.$el.addClass("calendar__day--weekend");
                }
            }

            this.on("search:flexible", this.onFlexibleSearch, this);


        },

        onFlexibleSearch: function(){
            console.log("onFlexibleSearch")
        },

        dayClick: function() {
            console.log("click")
        }

    });


    return DayView;
});