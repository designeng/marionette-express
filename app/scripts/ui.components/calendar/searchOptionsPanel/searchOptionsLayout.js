define([
        'underscore',
        'marionette',
        'vent',
        'ui.components/calendar/searchOptionsPanel/flexibleSearchView',
        'ui.components/calendar/searchOptionsPanel/transplantView',
        'ui.components/calendar/searchOptionsPanel/passengersView',
        'ui.components/calendar/searchOptionsPanel/passengerClassView',
        'ui.components/calendar/searchOptionsPanel/searchInputView',
        'hbars!templates/ui.components/calendar/searchOptionsPanel/searchOptionsLayoutTpl'
], function(_, Marionette, vent, FlexibleSearchView, TransplantView, PassengersView, PassengerClassView, SearchInputView, searchOptionsLayoutTpl) {

    'use strict';

    var SearchOptionsLayout = Marionette.Layout.extend({

        template: searchOptionsLayoutTpl,


        regions: {
            passengersRegion: "#passengers",
            passengerClassRegion: "#passengerClass",
            flexibleSearchRegion: "#flexibleSearch",
            transplantRegion: "#transplant",
            searchInputRegion: "#searchInput"
        },


        bindUIElements: function() {
            this.bindPassengers();
            this.bindPassengerClass();
            this.bindFlexibleSearch();
            this.bindTransplant();
            this.bindSearchInput();
        },

        bindFlexibleSearch: function() {
            var flexibleSearchView = new FlexibleSearchView();
            this.flexibleSearchRegion.show(flexibleSearchView);
        },

        bindTransplant: function() {
            var transplantView = new TransplantView();
            this.transplantRegion.show(transplantView);
        },

        bindPassengers: function() {
            var passengersView = new PassengersView();
            console.log(passengersView)
            this.passengersRegion.show(passengersView);
        },

        bindPassengerClass: function() {
            var passengerClassView = new PassengerClassView();
            this.passengerClassRegion.show(passengerClassView);
        },

        bindSearchInput: function() {
            var searchInputView = new SearchInputView();
            this.searchInputRegion.show(searchInputView);
        }


    });

    return SearchOptionsLayout;
});