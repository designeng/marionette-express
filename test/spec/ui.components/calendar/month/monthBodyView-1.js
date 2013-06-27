define(
[
        "marionette",
        "app",
        "vent",
        "moment",
        "ui.components/calendar/day/dayModel",
        "ui.components/calendar/month/monthCollection",
        "ui.components/calendar/day/dayView",
        "ui.components/calendar/month/monthHeaderView",
        'hbars!templates/ui.components/calendar/month/monthBodyViewTpl'


], function(
    Marionette,
    App,
    Vent,
    Moment,
    DayModel,
    MonthCollection,
    DayView,
    MonthHeaderView,
    MonthBodyViewTpl) {

    var MonthBodyView = require(["ui.components/calendar/month/monthBodyView"]);

    describe("ui.components/calendar/month/monthBodyView", function() {

        var monthBodyView = new MonthBodyView();


        describe('monthBodyView', function() {

            it('is defined', function() {
                expect(monthBodyView).toBeDefined();
            });


        });

    });

});

/* Some possible expectations:
expect(t.initialize).
expect(t.render).
expect(t.appendHtml).
expect(t.onBeforeRender).

*/