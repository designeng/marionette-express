define([
        'underscore',
        'marionette',
        'vent',
        'hbars!templates/views/bemOneViewTpl'
    ], function(_, Marionette, vent, bemOneViewTpl) {

        'use strict';

        var BemOneView = Marionette.ItemView.extend({
                template: bemOneViewTpl,



                className: "bemOne"

            });

        return BemOneView;
    });