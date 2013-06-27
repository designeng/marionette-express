define([
        'marionette',
        'vent',
        'hbars!templates/ui.components/calendar/calendarLayoutTpl',
        'ui.components/calendar/flightPanel/FlightPanelLayout',
        'ui.components/calendar/navigation/arrowsLayout',
        'ui.components/calendar/month/MonthRowCollectionView',
        'ui.components/calendar/searchOptionsPanel/searchOptionsLayout'
], function(
    Marionette,
    vent,
    calendarLayoutTpl,
    FlightPanelLayout,
    ArrowsLayout,
    MonthRowCollectionView,
    SearchOptionsLayout) {

    'use strict';

    var CalendarLayout = Marionette.Layout.extend({
        template: calendarLayoutTpl,

        className: "calendarLayout",

        regions: {
            flightPanelWrapper: "#flightPanelWrapper",
            navigationWrapper: "#navigationWrapper",
            calendarRangeWrapper: "#calendarRangeWrapper",
            searchOptions: "#searchOptions"
        },

        bindUIElements: function() {
            this.bindFlightPanel();
            this.bindArrows();
            this.bindMonthRowCollectionView();
            this.bindSearchOptions();
        },

        bindFlightPanel: function() {
            var flightPanelLayout = new FlightPanelLayout();
            this.flightPanelWrapper.show(flightPanelLayout);
        },

        bindArrows: function() {
            var arrowsLayout = new ArrowsLayout();
            this.navigationWrapper.show(arrowsLayout);
        },

        bindMonthRowCollectionView: function() {
            var monthRowCollectionView = new MonthRowCollectionView();
            this.calendarRangeWrapper.show(monthRowCollectionView);
        },

        bindSearchOptions: function() {
            var searchOptionsLayout = new SearchOptionsLayout();
            this.searchOptions.show(searchOptionsLayout);
        }
    });

    return CalendarLayout;
});