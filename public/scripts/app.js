// app.js
console.log("app js is loaded");

$(document).ready(function() {

	// Create a gameboard dynamically with array
	var $board = $('.board');
	var board_size = 5;
	for(var i = 1; i <= board_size; i ++){
		$board.append(templateRow(i));
	}

});

// Create the game board
function templateRow(i){
	return`
		<div class="row row_${i}">
			<div class="col"></div>
			<div class="col"></div>
			<div class="col"></div>

			<div class="col"></div>
			<div class="col"></div>
			<div class="col"></div>
		</div>
	`;
}