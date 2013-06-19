var currentJsFile; //to pass filepath from .tools-addfunc to modal window save button (fix me without globals!) See at bootstrap-modal.js, delegated new event - savedata

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

	$("#add-functions").on("click", function(e) {
		var checkedFunctions = [];
		var checkboxes = $("#functions-list").find(':checkbox');
		for (var i = 0; i < checkboxes.length; i++) {
			if ($(checkboxes[i]).is(':checked')) {
				checkedFunctions.push(checkboxes[i].value);
			}
		};
		if (checkedFunctions.length) {
			$.ajax({
				url: "/addfunctions",
				type: "POST",
				data: {
					"file": currentJsFile,
					"functions": checkedFunctions
				},
				success: function(data, textStatus, jqXHR) {

				}
			});
		}
	});

	$("#create-layout-control").on('click', function() {
		var regions = [];
		var resObj = {};

		var regionsIn = $("#layout-creation").find(':input.layout-region-data');

		if (regionsIn.length) {
			for (var i = 0; i < regionsIn.length; i++) {
				var val = $(regionsIn[i]).val();

				if (typeof val != undefined && val !== "") {
					regions.push(val);
				}
			};
		} else{
			regions.push("yourValue");
		}

		var inputValues = $("#layout-creation").find(':input.layout-data');

		for (var i = 0; i < inputValues.length; i++) {
			var val = $(inputValues[i]).val(),
				name = $(inputValues[i]).attr("name");

			if (typeof val != undefined && val !== "") {
				console.log(name, val)
				resObj[name] = val;
			} else {
				console.log("Field " + name + " is empty!");
				return;
			}
		};

		$.ajax({
			url: "/createlayout",
			type: "POST",
			data: {
				"dir": em.directory,
				"layoutName": resObj.layoutName,
				"regions": regions
			},
			success: function(data, textStatus, jqXHR) {
				console.log(data)
			},
			error: function(err) {
				console.log(err)
			}
		});
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