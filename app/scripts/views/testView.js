/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/testViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, testViewTpl) {

        'use strict';

        var testView = Marionette.ItemView.extend({
                template: testViewTpl,




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


        return testView;
    });