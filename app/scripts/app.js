/*  @DoNotCreateTests  */
define([
    'backbone',
    'underscore',
    'marionette',
    'vent',     
    'ui.components/calendar/month/MonthView'    
    ], function(Backbone, _, Marionette, vent, MonthView) {
    'use strict';

    var app = new Marionette.Application();

    var test = function(){
        return "123";
    }

    app.test = test;
    

    // these regions correspond to #ID's in the index.html 
    app.addRegions({
        content: "#content",
        menu: "#menu"
    });

    // marionette app events...
    app.on("initialize:after", function() {
        console.log('initialize:after');
        Backbone.history.start();
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

    app.addInitializer(function () {
        this.content.show(new MonthView({
            model: {}
        }));
    });

    

    // export the app
    return app;
});