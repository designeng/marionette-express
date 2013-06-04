define(['backbone'], function(Backbone) {
  var todo = Backbone.Model.extend({
    defaults: {
      title: 'some title'
    }
  });
  return todo;
});
