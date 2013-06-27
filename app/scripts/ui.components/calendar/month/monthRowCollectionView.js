define([
        'underscore',
        'marionette',
        'vent',
        'ui.components/calendar/month/monthLayoutModel',
        'ui.components/calendar/month/monthLayout',
        'hbars!templates/ui.components/calendar/month/monthRowCollectionViewTpl'
], function(_, Marionette, vent, MonthLayoutModel, MonthLayout, monthRowCollectionViewTpl) {

    'use strict';

    var MonthRowCollectionView = Marionette.CollectionView.extend({
        template: monthRowCollectionViewTpl,

        className: "monthRow",

        itemView: MonthLayout,

        _currentMoment: 123,

        //started with current moment
        initialize: function() {
            var a = moment();
            this.currentM = a.clone();
            a.add("M", 1);
            this.nextM = a.clone();

            this._currentMoment = moment();
            this._left = 0;

            this.collection = new Backbone.Collection();

            this.bindEvents();
        },

        onBeforeRender: function() {
            //collection populating
            console.log("_currentMoment", this._currentMoment);


            var month = new MonthLayoutModel({
                moment: this._currentMoment,
                left: this._left
            });
            this.collection.add(month);

            //lenght is set to 1 - we need only two MonthLayout views in calendar
            var lenght = 1;
            for (var i = 0; i < lenght; i++) {
                this._currentMoment.add("M", 1);//very curiose... what moment will be if current day number = 31, and next month has only 30 days ?

                console.log("_currentMoment", i, this._currentMoment);

                this._left += 440;
                month = new MonthLayoutModel({
                    moment: this._currentMoment,
                    left: this._left
                });
                this.collection.add(month);
            };
        },

        bindEvents: function() {
            vent.on("calendar:forward", this.addItem);
        },

        addItem: function() {
            console.log(this); //but this -  Wreqr!

            this._currentMoment.add("M", 1);


            this._left += 440;
            var month = new MonthLayoutModel({
                moment: this._currentMoment,
                left: this._left
            });
            this.collection.add(month);
        }

    });

    return MonthRowCollectionView;
});