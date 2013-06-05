/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/experimentalViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, experimentalViewTpl) {

        'use strict';

        var experimentalView = Marionette.ItemView.extend({

                template: experimentalViewTpl,

                render: function() {

                    var templateParams = _.extend({}, this.model, localizedText),
                        renderedTemplate = this.template(templateParams);

                    this.$el.html(renderedTemplate);

                    this.bindUIElements();
                    this.delegateEvents();

                    return this;
                },

                onShow: function() {

                    console.log("onShow")

                    return this;
                }
            });


        return experimentalView;
    });