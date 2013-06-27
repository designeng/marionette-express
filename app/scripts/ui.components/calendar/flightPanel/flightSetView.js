define([
        'underscore',
        'marionette',
        'vent',
        'ui.components/calendar/flightPanel/destinationArrivalView',
        'hbars!templates/ui.components/calendar/flightPanel/flightSetViewTpl'
    ], function(_, Marionette, vent, destinationArrivalView, flightSetViewTpl) {

        'use strict';

        var FlightSetView = Marionette.Layout.extend({
               


                template: flightSetViewTpl,

                regions: {
                    testR: "#testR"
                },

                initialize: function() {
                    this.addRegions({someRegion: "#someR"})
                },

                onRender: function() {
                    console.log("onRender ------");

                    var destArr = new destinationArrivalView();
                    this.someRegion.show(destArr);

                    console.log(this.regions, destArr)

                    this.testR.show(destArr);
                    this.removeRegion("testR")
                    //this.testR.close();
                    console.log("REGIONS", this.regions, this.regionManager)
                }


            });

        return FlightSetView;
    });