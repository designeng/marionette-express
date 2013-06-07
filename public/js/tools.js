$(document).ready(function() {

	// .json everywhere is returned by express router
	$.get('/templates.json', function(data) {
		var templateCreated = [],
			selector = '.tools-tpl';

		$.each(JSON.parse(data), function(key, val) {
			templateCreated.push(key);
		});

		$('div').filter(selector).each(function() {
			var file = $(this).data('file');
			if (!inArray(templateCreated, file)) {
				$(this).removeClass("created")
			}
		});
	});


	$.get('/specs.json', function(data) {
		var specCreated = [],
			selector = '.tools-spec';

		$.each(JSON.parse(data), function(key, val) {
			specCreated.push(key);
		});

		$('div').filter(selector).each(function() {
			var file = $(this).data('file');
			if (!inArray(specCreated, file)) {
				$(this).removeClass("created")
			}
		});
	});

	$.get('/css.json', function(data) {
		var cssCreated = [],
			selector = '.tools-css';

		$.each(JSON.parse(data), function(key, val) {
			cssCreated.push(key);
		});

		$('div').filter(selector).each(function() {
			var file = $(this).data('file');
			if (!inArray(cssCreated, file)) {
				$(this).removeClass("created")
			}
		});
	});

	logReload();
	/*
	$.get('/log.json', function(data) {

		$.each(JSON.parse(data), function(key, val) {
			console.log(key, val);
		});
	});
*/
	$(".tools-tpl").on("click", function(e) {
		var filepath = $(this).data('file');
		$.get(filepath.replace(".js", ".maketpl")).done(function(result) {
			//$("#result").html(result);
		});
		$(this).addClass("created");
		e.preventDefault();
	});

	$(".tools-spec").on("click", function(e) {
		var filepath = $(this).data('file');
		$.get(filepath.replace(".js", ".tdd")).done(function(result) {
			//$("#result").html(result);
		});
		$(this).addClass("created");
		e.preventDefault();
	});

	$(".tools-css").on("click", function(e) {
		var filepath = $(this).data('file');
		$.get(filepath.replace(".html", ".makecss")).done(function(result) {
			//$("#result").html(result);
		});
		$(this).addClass("created");
		e.preventDefault();
	});

	$('#clearlog').on('click', function() {
		$.post('/log/clear', {
			_method: 'delete'
		}, function(response) {
			console.log(response);
		});
	});

});

function logReload() {
	$.get('/log.txt', function(data) {
		$("#log-wrapper").empty();
		if (data.length > 0) {
			var values = data.split("|");
			var compiled = _.template($("script.message").html());

			for (var i = values.length - 1; i >= 0; i--) {
				var val = values[i];
				if (val != "") {
					var parsed = JSON.parse(val);
					$("#log-wrapper").append(compiled(parsed));
				}
			};
		}
	});
}

function inArray(array, value) {
	for (var i = 0, l = array.length; i < l; i++) {
		if (array[i] === value) {
			return true;
		}
	}
	return false;
}