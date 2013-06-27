define([
        'underscore',
        'marionette',
        'vent',
        "app/scripts/views/simpleView",
        "app/scripts/views/difficultView"
    ], function(_, Marionette, vent, SimpleView, DifficultView) {

        'use strict';

        var SuperLTLayout = Marionette.Layout.extend({

                regions: {
                    simpleRegion: "#simple",
                    difficultRegion: "#difficult"
                },

                bindUIElements: function() {
                    this.bindSimple();
                    this.bindDifficult()
                },

                bindSimple: function() {
                    var simpleView = new SimpleView({});
                    this.simpleRegion.show(simpleView);
                },
                bindDifficult: function() {
                    var difficultView = new DifficultView({});
                    this.difficultRegion.show(difficultView);
                }
            });

        return SuperLTLayout;
    });