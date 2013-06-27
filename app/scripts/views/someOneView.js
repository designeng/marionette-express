define([
        'underscore',
        'marionette',
        'vent'
    ], function(_, Marionette, vent) {

        'use strict';

        var SomeOneView = Marionette.ItemView.extend({

                className: "someCoolLT__someOne someCoolLT__item someOne"

            });

        return SomeOneView;
    });