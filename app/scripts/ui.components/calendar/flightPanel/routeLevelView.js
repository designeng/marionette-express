define([
        'underscore',
        'marionette',
        'vent',
        'hbars!templates/ui.components/calendar/flightPanel/routeLevelViewTpl'
    ], function(_, Marionette, vent, routeLevelViewTpl) {

        'use strict';

        var RouteLevelView = Marionette.ItemView.extend({
                template: routeLevelViewTpl,



            });

        return RouteLevelView;
    });