define(
    [
        'underscore',
        'marionette',
        'vent',
        "ui.components/calendar/flightPanel/flightSetView",
        "ui.components/calendar/flightPanel/destinationArrivalView",
        "ui.components/calendar/flightPanel/routeLevelView",
        'hbars!templates/ui.components/calendar/flightPanel/flightPanelLayoutTpl'
    ], function(
        _,
        Marionette,
        Vent,
        FlightSetView,
        DestinationArrivalView,
        RouteLevelView,
        FlightPanelLayoutTpl) {

        
        var FlightPanelLayout = require(["ui.components/calendar/flightPanel/flightPanelLayout"]);

        describe("ui.components/calendar/flightPanel/flightPanelLayout", function() {

            var flightPanelLayout = new FlightPanelLayout();


            describe('flightPanelLayout', function() {

                it('is defined', function() {
                    expect(flightPanelLayout).toBeDefined();
                });



            });

        });
    });

/* Some possible expectations:
expect(t.initialize).
expect(t.bindUIElements).
expect(t.bindFlightSet).
expect(t.bindDestinationArrival).
expect(t.bindRouteLevel).

*/