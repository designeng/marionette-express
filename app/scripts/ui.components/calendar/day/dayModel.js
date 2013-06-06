define([
        "marionette",
        "vent"
    ], function(Marionette, Vent) {

        'use strict';

        var dayModel = Backbone.Model.extend({

                defaults: {
                    date: '',
                    day: null
                }

            });

        return dayModel;
    });