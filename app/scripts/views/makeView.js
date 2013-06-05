/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/makeViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, makeViewTpl) {

        'use strict';

        var makeView = Marionette.ItemView.extend({
                template: makeViewTpl,

                render: function() {
                    var templateParams = _.extend({}, this.model, localizedText),
                        renderedTemplate = this.template(templateParams);
                    this.$el.html(renderedTemplate);
                    return this;
                },

                onShow: function() {

                    console.log("onShow")

                    return this;
                }
            });

        return makeView;
    });