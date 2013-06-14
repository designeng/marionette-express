define([
        "backbone",
        "vent",
        "moment"
], function(Backbone, Vent, moment) {

    'use strict';

    var dayModel = Backbone.Model.extend({

        defaults: {
            year: 2013,
            month: 1,
            day: 1,
            dayOfWeek: "",
            moment: moment("2013 1 1") // object of Moment.js
        },

        initialize: function(options) {
            if (typeof options != undefined) {
                    options.moment = options.moment || this.defaults.moment;
             
                    this.set({
                        year: options.moment.format("YYYY")
                    });
                    this.set({
                        month: options.moment.format("MM")
                    });
                    this.set({
                        day: options.moment.format("DD")
                    });
                    this.set({
                        dayOfWeek: options.moment.format("dddd")
                    });
             
            }
        }

    });

    return dayModel;
});