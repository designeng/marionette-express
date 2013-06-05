/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/nextViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, nextViewTpl) {

        'use strict';

        var nextView = Marionette.ItemView.extend({

                template: nextViewTpl,

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


        return nextView;
    });