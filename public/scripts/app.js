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

	// Draw the guy and move across
	$('#31').append(`<img src="/imgs/car1.jpg" class="minion" id="m1">`)

	// cW : column width
	// .offset() calculates from the center
	var interval = 100;
	var minionIntervalID = setInterval(minion_move, interval);
	var cW = 150;
	var minionSpeed = 20;
	var bulletTime = 1000;



	function minion_move() {
		var minion = $('#m1');
		var column = $('#36');
		// checking the minion x > column's x+width 
		if(minion.offset().left >= column.offset().left+cW/2){
			console.log(minion.offset().left);
			console.log(column.offset().left);
			window.clearInterval(minionIntervalID);
		}
		
		minion.animate({
			"margin-left": `+=${minionSpeed}px`
		}, interval);
	}

	// Place tower
	var $tower = $('#43');
	$tower.append(`<img src="/imgs/tower.jpg" class="tower" id="t1">`);

	// Create bullet incrementally
	var $tower = $('#43');
	$tower.append(`<img src="/imgs/car1.jpg" class="bullet" id="b1">`);
	
	shoot_bullet();

	function shoot_bullet(){
		var minion = $('#m1');
		var bullet = $('#b1');
		var minionX  = minion.offset().left;
		var minionY = minion.offset().top;
		var bulletX = bullet.offset().left;
		var bulletY = bullet.offset().top;
		var xDistance = minionX - bulletX + minionSpeed*bulletTime/interval;
		var yDistance = minionY - bulletY;
		bullet.animate({
			"margin-left": `+=${xDistance}`,
			"margin-top": `+=${yDistance}`,
		}, bulletTime, "swing", function removeBullet(){
			console.log("removed");
			bullet.remove();
			minion.remove(); // lower health later
		});
	}

	// function removeBullet(bullet) {

	// }




});





function displayForm(event){
	$('.toggle').toggle();
}

function updateProfile(event) {

}

// Create the game board
function templateRow(x,y){
	return`
		<div class="column" id="${x}${y}">
		</div>
	`;
}