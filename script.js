$(document).ready(function($) {
	// Function to search on Wikipedia and display results
	function getSearch() {
		var query = $('#searchBar').val();
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + query + "&callback=?";

		$.getJSON(url, function(json) {
			
			// Replace content of div1 with "" to clear results div
			$("#div1").html("");

			for (var i = 1; i < json[1].length; i++) {
				// Variables for every item to display on search results
				var $div = $("<div>", {id: "div"});
				var $span = $("<span>");
				var $title = $("<h3>");
				var $text = $("<p>");
				var $link = $("<a>", {class: "links", href: ""});

				// Append query results to every item and append all to link
				$title.append(json[1][i].toUpperCase());
				$text.append(json[2][i]);
				$link.attr('href', json[3][i]);
				$span.attr("data-hover", json[1][i]);

				// Here we build the clickeable block
				$div.append($title, $text);
				$span.append($div)
				$link.append($span);
				$("#div1").append($link);
			}
		});
	}
	// Handler for click on search button
	$("#search").on("click", function() {
		getSearch();
	});
	// Handler for enter on search bar
	$("#searchBar").keypress(function(event) {
		if (event.which == 13) {
			getSearch();
		}
	});
});