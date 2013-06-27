/* @CreateTests */
define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/experimentalViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localized, experimentalViewTpl) {

        'use strict';

        var experimentalView = Marionette.ItemView.extend({
                template: experimentalViewTpl,



                onShow: function() {

                    console.log("onShow")

                    return this;
                }
            });


        return experimentalView;
    });