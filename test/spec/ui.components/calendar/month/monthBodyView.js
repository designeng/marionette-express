define(
[
        "marionette",
        "app",
        "vent",
        "moment",
        "ui.components/calendar/day/dayModel",
        "ui.components/calendar/month/monthCollection",
        "ui.components/calendar/day/dayView",
        "ui.components/calendar/month/monthHeaderView",
        "ui.components/calendar/month/monthBodyView",
        'hbars!templates/ui.components/calendar/month/monthBodyViewTpl'
], function(
    Marionette,
    App,
    Vent,
    Moment,
    DayModel,
    MonthCollection,
    DayView,
    MonthHeaderView,
    MonthBodyView,
    MonthBodyViewTpl) {

    var monthBodyView, a, renderSpy;

    describe("monthBodyView test suite - ", function() {

        a = moment();
        var monthModel = {
            year: a.format("YYYY"),
            monthNumber: a.format("MM")
        }

        //var monthBodyView = new MonthBodyView({model: monthModel});

        beforeEach(function() {
            this.addMatchers({
                toBeInstanceOf: function(type) {
                    return this.actual instanceof type;
                }
            })
        });

        describe('monthBodyView', function() {
            monthBodyView = new MonthBodyView({
                model: monthModel
            });

            monthBodyView.render();

            it('is defined', function() {
                expect(monthBodyView).toBeDefined();
            });

            it("should have model", function() {
                expect(monthBodyView.hasOwnProperty("model")).toBe(true);
            });

            it("should be instanse of MonthBodyView", function() {
                expect(monthBodyView).toBeInstanceOf(MonthBodyView);
            });

            it("should have model with properties 'year' and 'monthNumber'", function() {
                expect(monthBodyView.model.hasOwnProperty("year")).toBe(true);
                expect(monthBodyView.model.hasOwnProperty("monthNumber")).toBe(true);
            });

            it("model year should be equial 2013", function() {
                expect(monthBodyView.model.year).toEqual('2013');
            });

            it("model monthNumber should be equial 06", function() {
                expect(monthBodyView.model.monthNumber).toEqual('06');
            });

            it("should have render method", function() {
                expect(Backbone.View.prototype.hasOwnProperty("render")).toBe(true);
            });

            it("$el should have class", function() {
                expect(monthBodyView.$el).toHaveClass("v-monthBody");
            });

            it("should have count of days", function() {
                expect(_.size(monthBodyView.children)).toBe(30);
            });


        });

        describe('nextMonthBodyView', function() {
            var b = a.add("M", 1); //compared with June (at the time of writing)
            var monthModel = {
                year: b.format("YYYY"),
                monthNumber: b.format("MM")
            }

            var initSpy = spyOn(MonthBodyView.prototype, 'initialize').andCallThrough();
            var renderSpy = spyOn(MonthBodyView.prototype, 'render').andCallThrough();

            var nextMonthBodyView = new MonthBodyView({
                model: monthModel
            });

            it("nextMonthBodyView is created", function() {
                expect(initSpy).toHaveBeenCalled();
            });

            nextMonthBodyView.render();

            it("nextMonthBodyView is rendered", function() {
                expect(renderSpy).toHaveBeenCalled();
            });

            it("calls the onBeforeRender() function", function() {
                spyOn(nextMonthBodyView, "onBeforeRender");
                nextMonthBodyView.render();
                expect(nextMonthBodyView.onBeforeRender).toHaveBeenCalled();
            });

            it("model monthNumber should be equial 07", function() {
                expect(nextMonthBodyView.model.monthNumber).toEqual('07');
            });

            it("should have count of days", function() {
                expect(_.size(nextMonthBodyView.children)).toBe(31);
            });


        });

        describe('test spy', function() {
            var Person = function() {};

            Person.prototype.helloSomeone = function(toGreet) {
                return this.sayHello() + " " + toGreet;
            };

            Person.prototype.sayHello = function() {
                return "Hello";
            };

            it("calls the sayHello() function", function() {
                var fakePerson = new Person();
                spyOn(fakePerson, "sayHello");
                fakePerson.helloSomeone("world");
                expect(fakePerson.sayHello).toHaveBeenCalled();
            });
        });

    });

});