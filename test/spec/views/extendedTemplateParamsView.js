define(
    [
        'backbone',
        'underscore',
        'marionette',
        'Handlebars',
        'vent',
        'i18n!nls/general',
        'hbars!templates/views/extendedTemplateParamsViewTpl'
    ], function(
        Backbone,
        _,
        Marionette,
        Handlebars,
        Vent,
        Localized,
        ExtendedTemplateParamsViewTpl) {

        var ExtendedTemplateParamsView = require(["views/extendedTemplateParamsView"]);

        describe("views::extendedTemplateParamsView", function() {

            var extendedTemplateParamsView = new ExtendedTemplateParamsView();


            describe('your_description', function() {
                it('your_text', function() {



                });

                /* Expectations:
expect(t.render).
expect(t.someFunc).

*/
            });

        });
    });