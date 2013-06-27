define([
        'underscore',
        'marionette',
        'vent',
        "app/scripts/views/st1View"
    ], function(_, Marionette, vent, St1View) {

        'use strict';

        var SpecLTLayout = Marionette.Layout.extend({

                regions: {
                    st1Region: "#st1"
                },

                bindUIElements: function() {
                    this.bindSt1()
                },

                bindSt1: function() {
                    var st1View = new St1View({});
                    this.st1Region.show(st1View);
                }
            });

        return SpecLTLayout;
    });