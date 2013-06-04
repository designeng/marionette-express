define(['app', 'marionette'], function(App, Marionette) {


    describe('app', function () {
	      it('should be type of Marionette.Application', function () {
	        //var app = new App();

	        console.log(App);
	        //console.log("app.test return: " + app.test());

	        expect(App instanceof Marionette.Application).toBeTruthy();
      });
    });

    describe('app test', function () {
	      it('should be eq 123', function () {

	        expect(App.test()).toEqual("123");
      });
    });

});