/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/superViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, superViewTpl) {

        'use strict';

        var superView = Marionette.ItemView.extend({

                template: "<div>Exmple</div>",

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
                },

                onClose: function() {

                    return this;
                },

                onChange: function() {

                    return this;
                }
            });


        return superView;
    });