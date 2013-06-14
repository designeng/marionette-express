define([
        'underscore',
        'marionette',
        'vent',
        'hbars!templates/ui.components/testcomp/myLayoutTpl'
    ], function(_, Marionette, vent, myLayoutTpl) {

        var myLayout = Marionette.Layout.extend({
                render: function() {
                    var renderedTemplate = this.template(this.model);
                    this.$el.html(renderedTemplate);
                    return this;
                },


                template: defineYourTemplate,

                regions: {

                }
            });

        return myLayout;
    });