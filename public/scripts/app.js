// app.js
console.log("app js is loaded");

$(document).ready(function() {
	$('#myModal').modal();
	$('.user-submit').click(function(){
		let name = $('[name=username]').val();
		console.log(name);
		$.ajax({
			method: "GET",
			url: `/users/find/${name}`,
			success: handleUser
		});
	});
	function handleUser(data){
		// console.log(data.length);
		var same_name = $('[name=username]').val();
		if (data === null) {
			console.log("WE ARE IN");
			// $('input').toggle();
			$('.modal-title').text('Enter your image link');
			$('.modal-body').html('<input type="url" name="image-link" >');
			$('.modal-footer').html(` <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="image-submit btn btn-primary">Save changes</button>`);
			$('.image-submit').click(function(){
				var img_link = $('[name=image-link]').val();

				$.ajax({
					method: 'POST',
					url: '/users',
					data: {profile_name: same_name, profile_link: img_link},
					success: renderProfile
				});
			});
		}
		else {
			console.log(data);
			renderProfile(data);
		}
	}

	
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
	// hardcoding color for terrain, for better visual..
	$('#12,#22,#32,#42,#43,#44,#45,#35,#25,#15,#16,#17,#18,#28,#38,#48,#58,#68,#67,#66,#65,#64,#63,#62,#61,#71,#81,#82,#83,#84,#85,#86,#87,#88').addClass("path");
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
	var minion_counts = 50;
	var gold = 300;
	$('.player_gold').text(gold);
	for (var i = 1; i <= minion_counts; i++) {
		minion_wave.push({id: i, image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true});
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
		if($(this).has('.tower').length > 0 || $(this).hasClass("path") || gold < 75) return;

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
		gold -= 75;
		$('.player_gold').text(gold);
		// $(this).append('<div class="towerRange"></div>');
	}

	var interval = 100;
	// var minionIntervalID = setInterval(minion_move, interval);
	var cW = 100;
	var player_hp = 5;
	var minions_killed = 0;
	var minionSpeed = 10;
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
		// move_minion_intervalID = setInterval(moveMinions, interval);
		// move_minion_intervalID = setInterval(move_minion, interval);
		tower_intervalID = setInterval(towerResponse, 50);

	});


	// distance = speed x time
	// in our case, each box is 100px, or take 1sec to travel
	// distance to time ratio is 1: 15
	var minion_displacement =[
		// {distance : 300, time : 4500},
		// {distance : 300, time : 4500},
		// {distance : 300, time : 4500},
		// {distance : 300, time : 4500},
		// // Going down from 18 to 68
		// {distance : 500, time : 7500},
		// {distance : 700, time : 10500},
		// {distance : 200, time : 3000},
		// {distance : 800, time : 14000}

		// Another set for play test
		// {distance : 300, time : 3000, direction: "down"},
		// {distance : 300, time : 3000, direction: "right"},
		// {distance : 300, time : 3000, direction: "up"},
		// {distance : 300, time : 3000, direction: "right"},
		// // Going down from 18 to 68
		// {distance : 500, time : 5000, direction: "down"},
		// {distance : 700, time : 7000, direction: "left"},
		// {distance : 200, time : 2000, direction: "down"},
		// {distance : 800, time : 8000, direction: "right"}

		{distance : 300, time : 300, direction: "down"},
		{distance : 300, time : 300, direction: "right"},
		{distance : 300, time : 300, direction: "up"},
		{distance : 300, time : 300, direction: "right"},
		// Going down from 18 to 68
		{distance : 500, time : 500, direction: "down"},
		{distance : 700, time : 700, direction: "left"},
		{distance : 200, time : 200, direction: "down"},
		{distance : 800, time : 800, direction: "right"}
	];

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
		move_minion(minion);
	};

	// hardcoded path animate all the way to the end
	function move_minion(minion) {
		var minion_selector = $(`#m${minion.id}`);
		var hp_selector = $(`#hp${minion.id}`);

		// minion speed was 20
		// interval was 200

		// Move down 2 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[0].distance}px`,

			}, Number(`${minion_displacement[0].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `+=${minion_displacement[0].distance}px`,
		}, Number(`${minion_displacement[0].time}`), 'linear');

		// Move right 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[1].distance}px`,
			}, Number(`${minion_displacement[1].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"left": `+=${minion_displacement[1].distance}px`,
		}, Number(`${minion_displacement[1].time}`), 'linear');

		// Move up 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `-=${minion_displacement[2].distance}px`,
			}, Number(`${minion_displacement[2].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `-=${minion_displacement[2].distance}px`,
		}, Number(`${minion_displacement[2].time}`), 'linear');

		// Move right 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[3].distance}px`,
			}, Number(`${minion_displacement[3].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"left": `+=${minion_displacement[3].distance}px`,
		}, Number(`${minion_displacement[3].time}`), 'linear');

		// Move down 5 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[4].distance}px`,
			}, Number(`${minion_displacement[4].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `+=${minion_displacement[4].distance}px`,
		}, Number(`${minion_displacement[4].time}`), 'linear');

		// Move left 7 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `-=${minion_displacement[5].distance}px`,
			}, Number(`${minion_displacement[5].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"left": `-=${minion_displacement[5].distance}px`,
		}, Number(`${minion_displacement[5].time}`), 'linear');

		// Move down 2 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[6].distance}px`,
			}, Number(`${minion_displacement[6].time}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `+=${minion_displacement[6].distance}px`,
		}, Number(`${minion_displacement[6].time}`), 'linear');

		// Move right 8 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[7].distance}px`,
			}, Number(`${minion_displacement[7].time}`), 'linear');
		hp_selector.animate({
			"left": `+=${minion_displacement[7].distance}px`,
		}, Number(`${minion_displacement[7].time}`), 'linear', updateGameState);
	}

	function updateGameState() {
		player_hp--;
		$('.player_health').text(player_hp);
		$player_hp.text(player_hp);
		if(player_hp === 0) {
			clearInterval( minion_wave_intervalID);
			clearInterval( move_minion_intervalID);
			clearInterval( tower_intervalID);
			alert("Game Over!");
			jQuery.fx.off = true;
			gameEnd = true;
			submitScore();
		}
	}

	function submitScore(){
		
		var name = $('.card-title').text();
		console.log("name is " + name);
		var time = new Date();
		$.ajax({
			method: "POST",
			url: "/users/scores/" + name,
			data: {
				score : minions_killed,
				date : time,
			}
		}).then(function(data){
			console.log(data);
		});
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
				var minionDirection = minion_displacement[minion.pathIndex].direction;
				if (minionDirection === "right"){
					var xDistance = minionX - towerX + minionSpeed*bulletTime/interval;
					var yDistance = minionY - towerY;
				}
				else if (minionDirection === "left"){
					var xDistance = minionX - towerX - minionSpeed*bulletTime/interval;
					var yDistance = minionY - towerY;
				}
				else if (minionDirection === "up"){
					var xDistance = minionX - towerX ;
					var yDistance = minionY - towerY- minionSpeed*bulletTime/interval;
				}
				else if (minionDirection === "down"){
					var xDistance = minionX - towerX ;
					var yDistance = minionY - towerY + minionSpeed*bulletTime/interval;
				}
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
		var minionDirection = minion_displacement[minion.pathIndex].direction;
		if (minionDirection === "right"){
			var xDistance = minionX - bulletX + minionSpeed*bulletTime/interval;
			var yDistance = minionY - bulletY;
		}
		else if (minionDirection === "left"){
			var xDistance = minionX - bulletX - minionSpeed*bulletTime/interval;
			var yDistance = minionY - bulletY;
		}
		else if (minionDirection === "up"){
			var xDistance = minionX - bulletX ;
			var yDistance = minionY - bulletY- minionSpeed*bulletTime/interval;
		}
		else if (minionDirection === "down"){
			var xDistance = minionX - bulletX ;
			var yDistance = minionY - bulletY + minionSpeed*bulletTime/interval;
		}
		bullet.animate({
			"margin-left": `+=${xDistance}`,
			"margin-top": `+=${yDistance}`,
		}, bulletTime, "linear", function removeBullet(){
			bullet.remove();
			minion.hp = minion.hp - tower_damage;
			hp_selector.text(minion.hp);

			if(minion.hp <= 0){
				hp_selector.remove();
				/// remove minion that has 0 hp
				spawned_wave =spawned_wave.filter(function(element) {
					return element.id != minion.id;
				});
				
				minion_selector.remove();
				console.log(minion_selector.length);
				if (minion.alive){
					minions_killed++;
					$('.minions_killed').text(minions_killed);
					gold += 25;
					$('.player_gold').text(gold);
					minion.alive = false;
				}
			}
		});
	}
});

function profileBtnOnSubmit(event){
	event.preventDefault();
	$('.toggle').toggle();
	var d = $(this).serialize();
	let name = $('.card-title').text();
	let newName = $('[name=profile_name]').val();
	let newLink = $('[name=profile_link]').val();
	console.log(d);
		$.ajax({
			method: "PUT",
			url: "/users/"+ name,
			data: {
				name: newName,
				link: newLink
			},
			
		}).then(function(user){
			renderProfile(user);
			$('.toggle').toggle();
		});
}

// Take in input name and input images and render on the gamepage
function renderProfile(user){
	console.log(user);
	// var form = $('.profile_form');
	// form.hide();
	$('#myModal').modal('hide');
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
			${x}${y}
		</div>
	`;
}