define([
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'hbars!../../templates/message',
        'i18n!nls/general',
        'hbars!templates/views/extendedTemplateParamsViewTpl'
    ], function(Backbone, _, Marionette, Handlebars, vent, ExtendedTemplate, localizedText, extendedTemplateParamsViewTpl) {

        'use strict';

        var ExtendedTemplateParamsView = Marionette.ItemView.extend({

                template: ExtendedTemplate,

                render: function() {

                    var templateParams = _.extend({}, this.model, localizedText),
                        renderedTemplate = this.template(templateParams);

                    this.$el.html(renderedTemplate);

                    this.bindUIElements();
                    this.delegateEvents();

                    return this;
                }
            });

        return ExtendedTemplateParamsView;
    });