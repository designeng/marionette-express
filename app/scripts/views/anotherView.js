/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/anotherViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, anotherViewTpl) {

        'use strict';

        var anotherView = Marionette.ItemView.extend({
                template: anotherViewTpl,

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




        return anotherView;
    });