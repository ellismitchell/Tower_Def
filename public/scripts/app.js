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
	$('.edit-btn').on("click", displayForm);


	// Place tower
	var $tower = $('#43');
	$tower.append(`<img src="/imgs/tower.jpg" class="tower" id="t1">`);
	$tower.append('<div class="towerRange"></div>');


	var minion_wave = [];
	var spawned_wave = [];
	var towers = [];
	for (var i = 1; i <= 5; i++) {
		minion_wave.push({id: i, image: "/imgs/car1.jpg", speed: 20, hp: 100});
	}
	for (var i = 1; i <= 5; i++) {
		towers.push({id: i, image: "/imgs/tower.jpg", range: 150, dmg: 50});
	}

	var interval = 100;
	// var minionIntervalID = setInterval(minion_move, interval);
	var cW = 150;
	var minionSpeed = 20;
	var bulletTime = 300;
	var minion_wave_intervalID = setInterval(spawnMinion, 2000);
	var move_minion_intervalID = setInterval(moveMinions, interval);
	var tower_intervalID = setInterval(towerResponse, 100);

	function spawnMinion() {
		if (minion_wave.length == 0) {
			clearInterval(minion_wave_intervalID);
			return;
		}
		var minion = minion_wave.pop();
		$('#31').append(`<img src="/imgs/car1.jpg" class="minion" id="m${minion.id}">`);
		$('#31').append(`<p class="hp" id="hp${minion.id}">${minion.hp}</p>`);
		spawned_wave.push(minion);

		// var minion_selector = `#m${minion.id}`;
		// minion_move($(minion_selector));
		
	}
	// Draw the guy and move across
	// $('#31').append(`<img src="/imgs/car1.jpg" class="minion" id="m1">`)

	// cW : column width
	// .offset() calculates from the center
	
	function moveMinions() {
		spawned_wave.forEach(function(minion){
			var minion_selector = $(`#m${minion.id}`);
			var hp_selector = $(`#hp${minion.id}`);
				var column = $('#36');
			if(minion_selector.offset().left >= column.offset().left+cW/2){
				minion_selector.remove();
				hp_selector.remove();
				spawned_wave.shift();
		}
			minion_selector.animate({
				"margin-left": `+=${minionSpeed}px`
			}, interval);
			hp_selector.animate({
				"margin-left": `+=${minionSpeed}px`
			}, interval);
		});
	}



	function towerResponse() {
		// For each tower, check if minions are in range
		// if in range, shoot bullet
		
		spawned_wave.forEach(function(minion){
			let minion_selector = $(`#m${minion.id}`);
			var minionX  = minion_selector.offset().left;
			var minionY = minion_selector.offset().top;
			var towerX = $tower.offset().left;
			var towerY = $tower.offset().top;
			var distance = Math.sqrt((towerX-minionX)*(towerX-minionX)+(towerY-minionY)*(towerY-minionY));
			if (distance < 150){
			// change to tower range
				shoot_bullet(minion);
			}
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


	// Create bullet incrementally
	// var $tower = $('#43');
	// $tower.append(`<img src="/imgs/car1.jpg" class="bullet" id="b1">`);
	
	// shoot_bullet();

	// minion is the minion obj
	function shoot_bullet(minion){
		// var minion = $('#m1');
			var $tower = $('#43');
		$tower.append(`<img src="/imgs/car1.jpg" class="bullet" id="b1">`);
	
		var minion_selector = $(`#m${minion.id}`);
		var hp_selector = $(`#hp${minion.id}`);
		var tower_damage = 50;

		var bullet = $('#b1');
		var minionX  = minion_selector.offset().left;
		var minionY = minion_selector.offset().top;
		var bulletX = bullet.offset().left;
		var bulletY = bullet.offset().top;
		var xDistance = minionX - bulletX + minionSpeed*bulletTime/interval;
		var yDistance = minionY - bulletY;
		bullet.animate({
			"margin-left": `+=${xDistance}`,
			"margin-top": `+=${yDistance}`,
		}, bulletTime, function removeBullet(){
			bullet.remove();
			minion.hp = minion.hp - tower_damage;
			hp_selector.text(minion.hp);
			if(minion.hp <= 0){
				hp_selector.remove();
				spawned_wave.shift();
				minion_selector.remove();
			}
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