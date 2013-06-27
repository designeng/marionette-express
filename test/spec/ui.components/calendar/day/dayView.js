define(
[
        "marionette",
        "vent",
        "ui.components/calendar/day/dayModel",
        "ui.components/calendar/day/dayView",
        'hbars!templates/ui.components/calendar/day/dayViewTpl'
], function(
    Marionette,
    Vent,
    DayModel,
    DayView,
    DayViewTpl) {

    describe("ui.components/calendar/day/dayView", function() {

        console.log(DayView);


        beforeEach(function() {
            this.addMatchers({
                toBeInstanceOf: function(type) {
                    return this.actual instanceof type;
                }
            });
        });


        describe('dayView', function() {

            var dayView = new DayView({
                model: new DayModel({
                    moment: moment()
                })
            });

            it('is defined', function() {
                expect(dayView).toBeDefined();
            });

            it("should have model - instanse of DayModel", function() {
                expect(dayView.model).toBeInstanceOf(DayModel);
            });


        });

    });
});

/* Some possible expectations:
expect(t.initialize).
expect(t.onFlexibleSearch).
expect(t.dayClick).

*/