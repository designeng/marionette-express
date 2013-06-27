define(
	{{ _safeString defineArea }}
	, function(
		{{ _toParamsColumn requireJsModuleParams }}
	) {	

	var {{ _toUpperFirstChar name }} = require(["{{ path }}"]);

  	describe("{{ specDescription }}", function () {
  	
  		var {{ _toLowerFirstChar name }} = new {{ _toUpperFirstChar name }}();


    	describe('{{ _toLowerFirstChar name }}', function () {

      		it('is defined', function () {
        		 expect({{ _toLowerFirstChar name }}).toBeDefined();
      		});



    });

  });
});

/* Some possible expectations:
{{ expectations }}
*/
