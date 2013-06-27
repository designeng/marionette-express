define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/ui.components/calendar/searchOptionsPanel/passengerClassViewTpl'
], function(Backbone, _, Marionette, Handlebars, vent, localized, passengerClassViewTpl) {

    'use strict';

    var PassengerClassView = Marionette.View.extend({
        template: passengerClassViewTpl,

        templateParams: null,

        initialize: function() {
            this.templateParams = _.extend({}, this.model, localized);
        },

        render: function() {
            var renderedTemplate = this.template(this.templateParams);
            this.$el.html(renderedTemplate);

            return this;
        },


    });

    return PassengerClassView;
});