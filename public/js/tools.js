$(document).ready(function(){

	$(".tools-tpl").on("click", function(e){
		var filepath = this.getAttribute("data-file");
		$.get(filepath.replace(".js", ".maketpl")).done(function(result) { 
			$("#result").html(result); 
		});
	    e.preventDefault();
	});

	$(".tools-test").on("click", function(e){
		var filepath = this.getAttribute("data-file");
		$.get(filepath.replace(".js", ".tdd")).done(function(result) { 
			$("#result").html(result); 
		});
	    e.preventDefault();
	});

	$(".tools-css").on("click", function(e){
		var filepath = this.getAttribute("data-file");
		$.get(filepath.replace(".html", ".makecss")).done(function(result) { 
			$("#result").html(result); 
		});
	    e.preventDefault();
	});

});