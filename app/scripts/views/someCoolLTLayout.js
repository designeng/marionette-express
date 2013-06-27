define([
        'underscore',
        'marionette',
        'vent',
        "app/scripts/views/someOneView"
    ], function(_, Marionette, vent, SomeOneView) {

        'use strict';

        var SomeCoolLTLayout = Marionette.Layout.extend({

                regions: {
                    someOneRegion: "#someOne"
                },

                bindUIElements: function() {
                    this.bindSomeOne()
                },

                bindSomeOne: function() {
                    var someOneView = new SomeOneView({});
                    this.someOneRegion.show(someOneView);
                }
            });

        return SomeCoolLTLayout;
    });