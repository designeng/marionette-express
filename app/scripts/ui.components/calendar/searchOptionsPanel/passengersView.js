define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'hbars!templates/ui.components/calendar/searchOptionsPanel/passengersViewTpl'
], function(Backbone, _, Marionette, Handlebars, vent, PassengersViewTpl) {

    'use strict';

    var PassengersView = Marionette.ItemView.extend({
        template: PassengersViewTpl


    });

    return PassengersView;
});