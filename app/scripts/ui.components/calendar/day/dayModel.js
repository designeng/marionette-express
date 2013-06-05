define([
        template: dayModelTpl,

        render: function() {
            var renderedTemplate = this.template(this.model);
            this.$el.html(renderedTemplate);
            return this;
        },

        "marionette",
        "vent",
        'hbars!templates/ui.components/calendar/day/dayModelTpl'
    ], function(Marionette, Vent, dayModelTpl) {

        'use strict';

        var dayModel = Backbone.Model.extend({

                defaults: {
                    date: '',
                    day: null
                }

            });

        return dayModel;
    });