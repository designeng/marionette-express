/*  @DoNotCreateTests  */
define([
        'backbone',
        'underscore',
        'marionette',
        'vent',
        'moment',
        'i18n!nls/general',

        'ui.components/calendar/calendarModule'

], function(Backbone,
    _,
    Marionette,
    vent,
    moment,
    localized,
    calendarModule) {
    'use strict';

    var app = new Marionette.Application();

    // these regions correspond to #ID's in the index.html 
    app.addRegions({
        calendarModuleWrapper: "#calendarModuleWrapper"
    });

    // marionette app events...
    app.on("initialize:after", function() {
        console.log('initialize:after');
        Backbone.history.start();
    });

    app.addInitializer(function() {
        /**
         * Helper for i18n support for Handlebars
         */
        Handlebars.registerHelper('_', function(text) {
            if (arguments.length > 2) {
                console.log("Handlebars.registerHelper ARGS > 2")
                var str = arguments[0],
                    params = _.toArray(arguments).slice(1, -1),
                    param;
                while (str.indexOf("%s") != -1) {
                    param = params.length == 1 ? params[0] : params.shift();
                    str = str.replace(/%s/, param);
                }
                text = str;
            } else {
                //Get string from lang config
                text = localized[text];
            }
            return text;
        });
    });


    // pass in router/controller via options
    app.addInitializer(function(options) {
        // configure for loading templates stored externally...
        Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
            // Marionette expects "templateId" to be the ID of a DOM element.
            // But with RequireJS, templateId is actually the full text of the template.
            var template = templateId;

            // Make sure we have a template before trying to compile it
            if (!template || template.length === 0) {
                var msg = "Could not find template: '" + templateId + "'";
                var err = new Error(msg);
                err.name = "NoTemplateError";
                throw err;
            }

            return template;
        };
    });

    app.addInitializer(function() {
        vent.on("someEvent", function() {
            console.log("someEvent init 123");
        });
    });

    app.addInitializer(function(){
        calendarModule.start();
        calendarModule.someFunction();
    })

    return app;
});