define(
    [
        'underscore',
        'marionette',
        'vent',
        'ui.components/calendar/flightPanel/destinationArrivalView',
        'hbars!templates/ui.components/calendar/flightPanel/flightSetViewTpl'
    ], function(
        _,
        Marionette,
        Vent,
        DestinationArrivalView,
        FlightSetViewTpl) {

        var FlightSetView = require(["ui.components/calendar/flightPanel/flightSetView"]);

        describe("ui.components/calendar/flightPanel/flightSetView", function() {

            var flightSetView = new FlightSetView();


            describe('flightSetView', function() {

                it('is defined', function() {
                    expect(flightSetView).toBeDefined();
                });



            });

        });
    });

/* Some possible expectations:
expect(t.initialize).
expect(t.onRender).

*/