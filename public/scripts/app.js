// app.js
console.log("app js is loaded");

$(document).ready(function() {

	// dynamically set minions, towers, tower range css


	// Create a gameboard dynamically with array
	var $board = $('.board');
	var board_size = 8;
	var row = "";
	// Hardcoded the gameboard grids
	for(var i = 1; i <= board_size; i ++){
		row+=`<div class="row row_${i}">`;

		for(var j= 1; j<=board_size; j++){
			row += templateRow(i,j);
		}
		row +=`</div>`;	
	}
	$board.append(row);
	$('.edit-btn').on("click", displayForm);

	var paths = [
		{direction: 'down', endpoint: $('#32')},
		{direction: 'right', endpoint: $('#35')},
		{direction: 'up', endpoint: $('#15')},
		{direction: 'right', endpoint: $('#17')},
		{direction: 'down', endpoint: $('#67')},
		{direction: 'left', endpoint: $('#61')},
		{direction: 'down', endpoint: $('#81')},
		{direction: 'right', endpoint: $('#88')}
	];

	$('.profile_form').on("submit", profileBtnOnSubmit);


	var minion_path = []
	var minion_wave = [];
	var spawned_wave = [];
	var towers = [];
	var tower_range = 150;
	var gameEnd = false;
	for (var i = 1; i <= 5; i++) {
		minion_wave.push({id: i, image: "/imgs/car1.jpg", speed: 20, hp: 500, pathIndex: 0});
	}
	// Hardcoded towers
	//  Need to change hardcoded row and col~
	// for (var i = 1; i <= 2; i++) {
	// 	towers.push({id: i, col: i+2, row: 4, image: "/imgs/tower.jpg", range: 150, dmg: 10});
	// 	var $tower = $(`#4${i+2}`);
	// 	$tower.append(`<img src="/imgs/tower.jpg" class="tower" id="t${i}">`);
	// 	$tower.append('<div class="towerRange"></div>');
	// }
	
	// Place tower at mouse click
	// still need to check if the click is within path
	$('.column').on("click", placeTower);
	function placeTower(event){
		// Add tower if theres none already in place
		if(gameEnd) return;
		if($(this).has('.tower').length > 0 ) return;

		var tower = {
			id : towers.length + 1,
			col: ($(this).attr("id")[1]),
			row: ($(this).attr("id")[0]),
			image: "/imgs/tower.jpg",
			range: tower_range,
			dmg: 10,
		};
		towers.push(tower);
		$(this).append(`<img src="/imgs/tower.jpg" class="tower" id="t${tower.id}">`);
		$(this).append('<div class="towerRange"></div>');
	}

	var interval = 200;
	// var minionIntervalID = setInterval(minion_move, interval);
	var cW = 100;
	var player_hp = 5;
	var minionSpeed = 20;
	var bulletTime = 400;
	var mW = 50;

	var minion_wave_intervalID = "";
	var move_minion_intervalID = "";
	var tower_intervalID = "";
	var $player_hp = $('.player_health');
	$player_hp.text(player_hp);

	// Start minion wave with btn click
	$('.start_wave').on("click", function() {
		$('.start_wave').hide();
		minion_wave_intervalID = setInterval(spawnMinion, 2000);
		move_minion_intervalID = setInterval(moveMinions, interval);
		tower_intervalID = setInterval(towerResponse, 100);
	});

	// create minion at #31 div at the moment
	// Will adjust later when we want different spawning location
	function spawnMinion() {
		if (minion_wave.length == 0) {
			clearInterval(minion_wave_intervalID);
			return;}
		var minion = minion_wave.pop();
		// NEED TO CHANGE HARDCODED #31 TOO
		// ######################
		$('#12').append(`<img src="/imgs/car1.jpg" class="minion" id="m${minion.id}">`);
		$('#12').append(`<p class="hp" id="hp${minion.id}">${minion.hp}</p>`);
		spawned_wave.push(minion);
		// var minion_selector = `#m${minion.id}`;
		// minion_move($(minion_selector));
	}
	
	// check location of minions across the board
	// remove if near the end. If at the end, we can
	// update player health and maybe change endgame state
	function moveMinions() {
		spawned_wave.forEach(function(minion){
			var minion_selector = $(`#m${minion.id}`);
			var hp_selector = $(`#hp${minion.id}`);
			var path = paths[minion.pathIndex];


			if (path.direction === "right"){

				minion_selector.animate({
					"left": `+=${minionSpeed}px`
				}, interval);
				hp_selector.animate({
					"margin-left": `+=${minionSpeed}px`
				}, interval);

				if(minion_selector.offset().left >= path.endpoint.offset().left-mW/2){
					// minion_selector.remove();
					// hp_selector.remove();
					// spawned_wave.shift();
					// updateGameState();
					minion.pathIndex++;
				}
			}

			// direction left
			if (path.direction === "left"){

				minion_selector.animate({
					"left": `-=${minionSpeed}px`
				}, interval);
				hp_selector.animate({
					"margin-left": `-=${minionSpeed}px`
				}, interval);

				if(minion_selector.offset().left <= path.endpoint.offset().left+mW/2){
					minion.pathIndex++;
				}
			}

			// direction down
			if (path.direction === "down"){

				minion_selector.animate({
					// "margin-top": `+=${minionSpeed}px`
					"top" : `+=${minionSpeed}px`
					// "transform":`translateY(${minionSpeed}px)`
				}, interval, "swing");
				hp_selector.animate({
					"margin-top": `+=${minionSpeed}px`
				}, interval, "swing");

				if(minion_selector.offset().top >= path.endpoint.offset().top-mW/2){
					minion.pathIndex++;
				}
			}

			if (path.direction === "up"){

				minion_selector.animate({
					"top": `-=${minionSpeed}px`
				}, interval);
				hp_selector.animate({
					"margin-top": `-=${minionSpeed}px`
				}, interval);

				if(minion_selector.offset().top <= path.endpoint.offset().top+mW/2){
					minion.pathIndex++;
				}
			}

		});
	}

	function updateGameState() {
		player_hp--;
		$player_hp.text(player_hp);
		if(player_hp === 0) {
			clearInterval( minion_wave_intervalID);
			clearInterval( move_minion_intervalID);
			clearInterval( tower_intervalID);
			alert("Game Over!");
			gameEnd = true;

		}
	}


	function towerResponse() {
		// For each tower, check if minions wave are in range
		// if in range, shoot bullet
		towers.forEach(function(tower){
			spawned_wave.forEach(function(minion){
				let minion_selector = $(`#m${minion.id}`);
				var minionX  = minion_selector.offset().left+25;//+25 is half the minion size
				var minionY = minion_selector.offset().top+25;
				$tower = $(`#${tower.row}${tower.col}`);
				var towerX = $tower.offset().left+40; //+40 is half the tower size
				var towerY = $tower.offset().top+40;

				var xDistance = minionX-towerX+minionSpeed*bulletTime/interval;
				var yDistance = minionY-towerY;
				var distance = Math.sqrt(xDistance*xDistance+yDistance*yDistance);
				if (distance < tower.range){
				// change to tower range
					shoot_bullet(minion, tower);
				}
			});
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

	// minion is the minion obj, tower obj
	function shoot_bullet(minion, tower){
		// var minion = $('#m1');
		var $tower = $(`#${tower.row}${tower.col}`);
		$tower.append(`<img src="/imgs/car1.jpg" class="bullet" id="b${tower.id}">`);
	
		var minion_selector = $(`#m${minion.id}`);
		var hp_selector = $(`#hp${minion.id}`);
		var tower_damage = tower.dmg;

		var bullet = $(`#b${tower.id}`);
		var minionX  = minion_selector.offset().left+15; //15=(minion size - bullet size)/2
		var minionY = minion_selector.offset().top+15;
		var bulletX = bullet.offset().left;
		var bulletY = bullet.offset().top;
		var xDistance = minionX - bulletX + minionSpeed*bulletTime/interval;
		var yDistance = minionY - bulletY;
		bullet.animate({
			"margin-left": `+=${xDistance}`,
			"margin-top": `+=${yDistance}`,
		}, bulletTime, "linear", function removeBullet(){
			bullet.remove();
			minion.hp = minion.hp - tower_damage;
			hp_selector.text(minion.hp);
			if(minion.hp <= 0){
				hp_selector.remove();
				// spawned_wave.shift();
				spawned_wave =spawned_wave.filter(function(element) {
					return element.id != minion.id;
				});
				minion_selector.remove();
			}
		});
	}
});

function profileBtnOnSubmit(event){
	event.preventDefault();
	var d = $(this).serialize();

	console.log(d);
		$.ajax({
			method: "POST",
			url: "/users",
			data: d,
			success: renderProfile,
		});
}

// Take in input name and input images and render on the gamepage
function renderProfile(user){
	console.log(user);
	var form = $('.profile_form');
	form.hide();
	$('.show_profile').html(
		 `	
		<div class="card" >
			  <img class="card-img-top" src=${user.profileImage} alt="Card image cap">
			  <div class="card-body">
			    <h4 class="card-title">${user.name}</h4>
			  </div>	
		</div>
		`
		);
}

function displayErr(err){
	console.log(err);
}

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