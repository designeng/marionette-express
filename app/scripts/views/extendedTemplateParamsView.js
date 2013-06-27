define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/extendedTemplateParamsViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localized, extendedTemplateParamsViewTpl) {

        'use strict';

        var ExtendedTemplateParamsView = Marionette.ItemView.extend({
                template: extendedTemplateParamsViewTpl,

                render: function() {
                    var templateParams = _.extend({}, this.model, localized),
                        renderedTemplate = this.template(templateParams);
                    this.$el.html(renderedTemplate);
                    return this;
                },

                someFunc: function(){
                    var arr = ["test", 1, 2, 3, 4, 5, []]
                }


            });

        return ExtendedTemplateParamsView;
    });