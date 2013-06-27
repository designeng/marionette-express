define([
        'underscore',
        'marionette',
        'vent'
        "views/extraOneView",
        "views/extraTwoView"
    ], function(_, Marionette, vent, ExtraOneView, ExtraTwoView) {

        'use strict';

        var extraNewLayout = Marionette.Layout.extend({

                regions: {
                    extraOneRegion: "#extraOne",
                    extraTwoRegion: "#extraTwo"
                },

                bindUIElements: function() {
                    this.bindExtraOne();
                    this.bindExtraTwo()
                },

                bindExtraOne: function() {
                    var extraOneView = new ExtraOneView({});
                    this.extraOneRegion.show(extraOneView);
                },
                bindExtraTwo: function() {
                    var extraTwoView = new ExtraTwoView({});
                    this.extraTwoRegion.show(extraTwoView);
                }
            });

        return extraNewLayout;
    });