define(
    [
        "backbone",
        "vent",
        "moment",
        "ui.components/calendar/day/dayModel"
    ], function(
        Backbone,
        Vent,
        Moment,
        DayModel) {

        describe("ui.components/calendar/day/dayModel", function() {

            var dayModel = new DayModel();

            describe('dayModel', function() {

                it('is defined', function() {
                    expect(dayModel).toBeDefined();
                });



            });

        });
    });

/* Some possible expectations:
expect(t.initialize).

*/