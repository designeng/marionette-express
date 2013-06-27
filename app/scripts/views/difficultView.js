define([
        'underscore',
        'marionette',
        'vent'
    ], function(_, Marionette, vent) {

        'use strict';

        var DifficultView = Marionette.ItemView.extend({

                className: "difficult superLT__difficult"

            });

        return DifficultView;
    });