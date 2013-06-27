define([
        'underscore',
        'marionette',
        'vent',
        "app/scripts/views/bemOneView"
    ], function(_, Marionette, vent, BemOneView) {

        'use strict';

        var BemLTLayout = Marionette.Layout.extend({

                regions: {
                    bemOneRegion: "#bemOne"
                },

                bindUIElements: function() {
                    this.bindBemOne()
                },

                bindBemOne: function() {
                    var bemOneView = new BemOneView({});
                    this.bemOneRegion.show(bemOneView);
                }
            });

        return BemLTLayout;
    });