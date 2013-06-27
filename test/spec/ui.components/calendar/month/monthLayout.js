define(
    [
        'underscore',
        'marionette',
        'vent',
        'moment',
        'hbars!templates/ui.components/calendar/month/monthLayoutTpl',
        'ui.components/calendar/month/monthHeaderView',
        'ui.components/calendar/month/monthBodyView'
    ], function(
        _,
        Marionette,
        Vent,
        Moment,
        MonthLayoutTpl,
        MonthHeaderView,
        MonthBodyView) {

        var MonthLayout = require(["ui.components/calendar/month/monthLayout"]);

        describe("ui.components/calendar/month/monthLayout", function() {

            var monthLayout = new MonthLayout({model: {} });


            describe('monthLayout', function() {

                it('is defined', function() {
                    expect(monthLayout).toBeDefined();
                });



            });

        });
    });

/* Some possible expectations:
expect(t.initialize).
expect(t.bindUIElements).
expect(t.bindMonthHeader).
expect(t.bindMonthBody).

*/