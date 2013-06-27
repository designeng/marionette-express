define([
        'underscore',
        'marionette',
        'vent'
    ], function(_, Marionette, vent) {

        'use strict';

        var SimpleView = Marionette.ItemView.extend({

                className: "simple superLT__simple"

            });

        return SimpleView;
    });