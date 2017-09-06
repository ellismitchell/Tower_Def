// app.js
console.log("app js is loaded");

$(document).ready(function() {

	// Create a gameboard dynamically with array
	var $board = $('.board');
	var board_size = 6;
	var row = ""
	for(var i = 1; i <= board_size; i ++){
		row+=`<div class="row row_${i}">`;

		for(var j= 1; j<=board_size; j++){
			row += templateRow(i,j);
		}

		row +=`</div>`;	
	}
	$board.append(row);
	console.log("clicked");
	$('.edit-btn').on("click", displayForm);


});

function displayForm(event){
	$('.toggle').toggle();
}

function updateProfile(event) {

}

// Create the game board
function templateRow(x,y){
	return`
		<div class="col col-2" id="${x}${y}">
		</div>
	`;
}