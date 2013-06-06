define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/extendedTemplateParamsViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, localizedText, extendedTemplateParamsViewTpl) {

        'use strict';

        var ExtendedTemplateParamsView = Marionette.ItemView.extend({
                template: extendedTemplateParamsViewTpl,

                render: function() {
                    var templateParams = _.extend({}, this.model, localizedText),
                        renderedTemplate = this.template(templateParams);
                    this.$el.html(renderedTemplate);
                    return this;
                },




            });

        return ExtendedTemplateParamsView;
    });