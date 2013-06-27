define([
        'underscore',
        'marionette',
        'vent',
        'hbars!templates/ui.components/calendar/navigation/arrowsLayoutTpl'
    ], function(_, Marionette, vent, arrowsLayoutTpl) {

        'use strict';

        var ArrowsLayout = Marionette.Layout.extend({
                template: arrowsLayoutTpl,

                className: "arrowsLayout",

                events: {
                    "click .arrowsLayout__arrow--back": "back",
                    "click .arrowsLayout__arrow--forward": "forward"
                },

                back: function(){
                    vent.trigger("calendar:back");
                },

                forward: function(){
                    vent.trigger("calendar:forward");
                }
            });

        return ArrowsLayout;
    });