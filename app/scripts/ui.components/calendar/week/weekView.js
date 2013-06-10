define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'moment',
        'ui.components/calendar/day/dayModel',
        'i18n!nls/general',
        'hbars!templates/ui.components/calendar/week/weekViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, moment, DayModel, localizedText, weekViewTpl) {

        'use strict';

        var WeekView = Marionette.View.extend({
                template: weekViewTpl,

                render: function() {
                    var templateParams = _.extend({}, this.model, localizedText),
                        renderedTemplate = this.template(templateParams);
                    this.$el.html(renderedTemplate);
                    return this;
                },

                initialize: function(){
                	
                	//var day = new DayModel();

                	//console.log(moment().format());
                	//console.log(day);
                }





            });

        return WeekView;
    });