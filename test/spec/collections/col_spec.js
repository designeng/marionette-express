define(['collections/todocollection'], function(TodoCollection) {
  describe('Collection::todocollection', function () {

    describe('collections', function () {
      it('should have url', function () {
        var t = new TodoCollection();

        console.log("TodoCollection url: " + t.url);

        expect(t.url).toEqual("/test");
      });
    });

  });
});