require.config({
    baseUrl: '/app/scripts',
    paths: {        
        jquery: 'vendors/jquery.min',  // amd version
        underscore: 'vendors/underscore', // amd version
        backbone: 'vendors/backbone', // amd version        
        'backbone.eventbinder': 'vendors/backbone.eventbinder', // amd version
        'backbone.babysitter': 'vendors/backbone.babysitter', // amd version
        subviews: 'vendors/backbone.subviews',
        marionette: 'vendors/backbone.marionette',  // amd version
        'backbone.wreqr': 'vendors/backbone.wreqr', // amd version
        Handlebars: 'vendors/handlebars',
        text: 'vendors/requirejs-text/text',
        hbars: 'vendors/hbars',
        tpl: 'vendors/tpl',
        moment: "vendors/moment",
        interval: "vendors/moment-interval",
        templates: '../templates', //it shoud be so! hbars plugin will read all templates inside   (really? check it!)
        'handlebars.helpers': 'helpers/handlebars.helpers',
        i18n: 'vendors/i18n'
    },

    // load the 'non AMD' versions of backbone, underscore and Marionette
    shim: {        
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette: ['backbone'],

        Handlebars: {
            exports: 'Handlebars'
        },
        
        'handlebars.helpers': ['Handlebars']
    },
    locale: function(){
        return "ru";
    }()
});