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

	var minion_wave = [];
	var spawned_wave = [];
	for (var i = 1; i <= 5; i++) {
		minion_wave.push({id: i, image: "/imgs/car1.jpg", speed: 20, hp: 100});
	}

	var interval = 100;
	// var minionIntervalID = setInterval(minion_move, interval);
	var cW = 150;
	var minionSpeed = 20;
	var bulletTime = 1000;
	var minion_wave_intervalID = setInterval(spawnMinion, 2000);
	var move_minion_intervalID = setInterval(moveMinions, interval);

	function spawnMinion() {
		if (minion_wave.length == 0) {
			clearInterval(minion_wave_intervalID);
			return;
		}
		var minion = minion_wave.pop();
		$('#31').append(`<img src="/imgs/car1.jpg" class="minion" id="m${minion.id}">`);
		spawned_wave.push(minion);

		// var minion_selector = `#m${minion.id}`;
		// console.log(minion_selector);
		// console.log($(minion_selector));
		// minion_move($(minion_selector));
		
	}
	// Draw the guy and move across
	// $('#31').append(`<img src="/imgs/car1.jpg" class="minion" id="m1">`)

	// cW : column width
	// .offset() calculates from the center
	
	function moveMinions() {
		spawned_wave.forEach(function(minion){
			var minion_selector = $(`#m${minion.id}`);
				var column = $('#36');
			if(minion_selector.offset().left >= column.offset().left+cW/2){
				minion_selector.remove();
				spawned_wave.shift();

		}
			minion_selector.animate({
				"margin-left": `+=${minionSpeed}px`
			}, interval);
		});
}


	// function minion_move(minion) {
	// 	// var minion = $('#m1');
	// 	console.log(minion);
	// 	console.log(minion.offset());
	// 	var column = $('#36');
	// 	// checking the minion x > column's x+width 
		// if(minion.offset().left >= column.offset().left+cW/2){
		// 	console.log(minion.offset().left);
		// 	console.log(column.offset().left);
		// 	window.clearInterval(minionIntervalID);
		// }
		
	// 	minion.animate({
	// 		"margin-left": `+=${minionSpeed}px`
	// 	}, interval);
	// }

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
			// minion.remove(); // lower health later
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