define([
        'underscore',
        'marionette',
        'vent',
        'hbars!templates/ui.components/calendar/flightPanel/destinationArrivalViewTpl'
    ], function(_, Marionette, vent, destinationArrivalViewTpl) {

        'use strict';

        var DestinationArrivalView = Marionette.ItemView.extend({
                template: destinationArrivalViewTpl,



            });

        return DestinationArrivalView;
    });