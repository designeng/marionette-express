define(
    [
        'underscore',
        'marionette',
        'vent',
        'hbars!templates/ui.components/calendar/flightPanel/destinationArrivalViewTpl'
    ], function(
        _,
        Marionette,
        Vent,
        DestinationArrivalViewTpl) {

        var DestinationArrivalView = require(["ui.components/calendar/flightPanel/destinationArrivalView"]);

        describe("ui.components/calendar/flightPanel/destinationArrivalView", function() {

            var destinationArrivalView = new DestinationArrivalView();


            describe('destinationArrivalView', function() {

                it('is defined', function() {
                    expect(destinationArrivalView).toBeDefined();
                });



            });

        });
    });

/* Some possible expectations:

*/