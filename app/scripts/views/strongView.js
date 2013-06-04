/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'hbars!templates/views/strongViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, strongViewTpl) {

        'use strict';

        var strongView = Marionette.ItemView.extend({
                template: strongViewTpl,

                render: function() {
                    var renderedTemplate = this.template(this.model);
                    this.$el.html(renderedTemplate);
                    return this;
                },


                test: function() {

                    console.log("onShow")

                    return this;
                }
            });


        return strongView;
    });