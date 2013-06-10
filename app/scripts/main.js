// Filename: main.js
// requireJS bootloader file typically included in the index.html
require.config({
    baseUrl: '/app/scripts',

    paths: {
        jquery: 'vendors/jquery.min',  // amd version
        underscore: 'vendors/underscore', // amd version
        backbone: 'vendors/backbone', // amd version        
        'backbone.eventbinder': 'vendors/backbone.eventbinder', // amd version
        'backbone.babysitter': 'vendors/backbone.babysitter', // amd version
        marionette: 'vendors/backbone.marionette',  // amd version
        'backbone.wreqr': 'vendors/backbone.wreqr', // amd version
        Handlebars: 'vendors/handlebars',
        text: 'vendors/requirejs-text/text',
        hbars: 'vendors/hbars',
        tpl: 'vendors/tpl',
        moment: "vendors/moment",
        interval: "vendors/moment-interval",
        templates: '../templates', //it shoud be so! hbars plugin will read all templates inside     
        'handlebars.helpers': 'helpers/handlebars.helpers',
        i18n: 'vendors/i18n'
    },

    // load the 'non AMD' versions of backbone, underscore and Marionette
    shim: {        
        backbone: {
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
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

require(['app', 'i18n!nls/general', 'handlebars.helpers'], function(App, generalText) {
    'use strict';

    var options = {
        /*
            libraryController: libraryController,
            libraryRouter: libraryRouter,
            secondApp: secondApp
            */
    };
    
    App.start(options);

    console.log("123generalText123 ", generalText.loc_author);
});