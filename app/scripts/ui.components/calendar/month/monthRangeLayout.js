define([
        'underscore',
        'marionette',
        'vent',
        'ui.components/calendar/month/monthLayout',
        'hbars!templates/ui.components/calendar/month/monthRangeLayoutTpl'
], function(_, Marionette, vent, MonthLayout, monthRangeLayoutTpl) {

    'use strict';

    var MonthRangeLayout = Marionette.Layout.extend({
        template: monthRangeLayoutTpl,

        regions: {
            calendarLeft: ".calendar__monthRangeLayout__monthLayout--left",
            calendarRight: ".calendar__monthRangeLayout__monthLayout--right"
        },

        //started with current moment
        initialize: function() {
            var a = moment();
            this.currentM = a.clone();
            a.add("M", 1);
            this.nextM = a.clone();
        },

        bindUIElements: function() {
            this.bindLeft();
            this.bindRight();
        },

        bindLeft: function() {
            var monthLeft = new MonthLayout({
                monthMoment: this.currentM,
                left: "0px"
            });
            this.calendarLeft.show(monthLeft);
        },

        bindRight: function() {
            var monthRight = new MonthLayout({
                monthMoment: this.nextM,
                left: "440px"
            });
            this.calendarRight.show(monthRight);
        }

    });

    return MonthRangeLayout;
});