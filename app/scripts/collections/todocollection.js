define(['backbone'], function(Backbone) {

	var TodoCollection = Backbone.Collection.extend({

	  url: "/test"

	});

	return TodoCollection;
});