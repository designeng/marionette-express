define([
        'underscore',
        'marionette',
        'vent',
        "ui.components/calendar/flightPanel/flightSetView",
        "ui.components/calendar/flightPanel/destinationArrivalView",
        "ui.components/calendar/flightPanel/routeLevelView",
        'hbars!templates/ui.components/calendar/flightPanel/flightPanelLayoutTpl'
    ], function(_, Marionette, vent, FlightSetView, DestinationArrivalView, RouteLevelView, flightPanelLayoutTpl) {

        'use strict';

        var FlightPanelLayout = Marionette.Layout.extend({
                template: flightPanelLayoutTpl,

                className: "flightPanel",

                regions: {
                    flightSetRegion: "#flightSet",
                    destinationArrivalRegion: "#destinationArrival",
                    routeLevelRegion: "#routeLevel"
                },

                initialize: function(){
                    console.log(this.$el)
                },

                bindUIElements: function() {
                    this.bindFlightSet();
                    //this.bindDestinationArrival();
                    this.bindRouteLevel()
                },

                bindFlightSet: function() {
                    var flightSetView = new FlightSetView({});
                    this.flightSetRegion.show(flightSetView);
                },
                bindDestinationArrival: function() {
                    var destinationArrivalView = new DestinationArrivalView({});
                    this.destinationArrivalRegion.show(destinationArrivalView);
                },
                bindRouteLevel: function() {
                    var routeLevelView = new RouteLevelView({});
                    this.routeLevelRegion.show(routeLevelView);
                }
            });

        return FlightPanelLayout;
    });