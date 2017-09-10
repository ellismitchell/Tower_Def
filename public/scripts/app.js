// app.js
console.log("app js is loaded");

$(document).ready(function() {
	$('#myModal').modal({
		backdrop: 'static',
		keyboard: false,
	});

	$('.user-submit').click(function(){
		let name = $('[name=username]').val();
		$.ajax({
			method: "GET",
			url: `/users/find/${name}`,
			success: handleUser
		});
	});
	function handleUser(data){
		var same_name = $('[name=username]').val();
		if (data === null) {
			// $('input').toggle();
			$('.modal-title').html(`<h3>Do you have a profile image link?</h3>`);
			$('.modal-body').html('<input type="url" name="image-link" >');
			$('.modal-footer').html(`<button type="button" class="image-submit btn btn-dark">Play!</button>`);
			$('.image-submit').click(function(){
				// var img_link = $('[name=image-link]').val();
				
				if($('[name=image-link]').val() == null || $('[name=image-link]').val() == undefined || $('[name=image-link]').val() =="") {
					var img_link = "http://novocolegio.com.br/assets/img/administracao/user.jpg";
				}
				console.log(img_link);
				$.ajax({
					method: 'POST',
					url: '/users',
					data: {profile_name: same_name, profile_link: img_link},
					success: renderProfile
				});
			});
		}
		else {
			renderProfile(data);
		}
	}

	
	// dynamically set minions, towers, tower range css

	// Create a gameboard dynamically with array
	var $board = $('.board');
	var board_size = 9;
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
	// $('#12,#22,#32,#42,#43,#44,#45,#46,#36,#26,#16,#17,#18,#19,#110,#210,#310,#410,#510,#610,#710, #79,#78,#77,#76, #75,#74 ,#73 ,#72,#71, #81, #91, #101,#102,#103,#104,#105,#106,#107,#108,#109,#1010').addClass("path");
	$('#14,#24,#51,#57').css("background-image", "url('/imgs/green_field.png'");
	$('#14,#24,#51,#57').css("background-size", "cover");
	$('#12,#22,#32,#42,#43,#44,#45,#46,#36,#26,#16,#17,#18,#19,#19,#29,#39,#49,#59,#69, #79,#78,#77,#76, #75,#74 ,#73 ,#72,#71, #81, #91, #91,#92,#93,#94,#95,#96,#97,#98,#99,#910').addClass("path");
	$('.edit-btn').on("click", displayForm);
	// hardcoding css images...
	//left side is path for these divs..
	// $('#13,#23,#37,#47').css("background-image", "url('/imgs/left_brown2.png'");
	// $('#13,#23,#37,#47').css("background-size", "cover");
	// //right side is path for these divs..
	// $(' #11,#21,#31,#41,#15,#25,#38,#48,#58').css("background-image", "url('/imgs/right_brown2.png'");
	// $(' #11,#21,#31,#41,#15,#25,#38,#48,#58').css("background-size", "cover");
	// //top brown ...
	// $('#52,#53,#54,#55,#56').css("background-image", "url('/imgs/top_brown2.png'");
	// $('#52,#53,#54,#55,#56').css("background-size", "cover");
	// // bottom brown...
	// $('#34,#61,#62,#63,#64,#65,#66,#67').css("background-image", "url('/imgs/bottom_brown2.png'");
	// $('#34,#61,#62,#63,#64,#65,#66,#67').css("background-size", "cover");
	// // top bot brown...
	// $('#83,#84,#85,#86,#87,#88,#89').css("background-image", "url('/imgs/top_bot_brown2.png'");
	// $('#83,#84,#85,#86,#87,#88,#89').css("background-size", "cover");
	// // corners..... brown
	// $('#33').css("background-image", "url('/imgs/left_bot_round2.png'");
	// $('#33').css("background-size", "cover");
	// // roundbrown...
	// $('#82').css("background-image", "url('/imgs/round_brown_2.png'");
	// $('#82').css("background-size", "cover");
	// $('#35,#68').css("background-image", "url('/imgs/right_bot_round2.png'");
	// $('#35,#68').css("background-size", "cover");
	// $('#28').css("background-image", "url('/imgs/right_top_round2.png'");
	// $('#28').css("background-size", "cover");
	// $('#27').css("background-image", "url('/imgs/left_top_round2.png'");
	// $('#27').css("background-size", "cover");

	// column
	$('#12,#22,#32,#26,#36,#29,#39,#49,#59,#69,#81').css("background-image", "url('/imgs/col.png'");
	$('#12,#22,#32,#26,#36,#29,#39,#49,#59,#69,#81').css("background-size", "cover")
	//row
	$('#43,#44,#45,#17,#18,#72,#73,#74,#75,#76,#77,#78,#92,#93,#94,#95,#96,#97,#98,#99').css("background-image", "url('/imgs/row.png'");
	$('#43,#44,#45,#17,#18,#72,#73,#74,#75,#76,#77,#78,#92,#93,#94,#95,#96,#97,#98,#99').css("background-size", "cover");
	// left corners
	$('#42,#91').css("background-image", "url('/imgs/bot_left_round.png'");
	$('#42,#91').css("background-size", "cover");
	$('#16,#71').css("background-image", "url('/imgs/top_left_round.png'");
	$('#16,#71').css("background-size", "cover");
	$('#46,#79').css("background-image", "url('/imgs/bot_right_round.png'");
	$('#46,#79').css("background-size", "cover");
	$('#19').css("background-image", "url('/imgs/top_right_round.png'");
	$('#19').css("background-size", "cover");
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
	var waveCounter = 1;
	$('.player_gold').text(gold);
	// for (var i = 1; i <= minion_counts; i++) {
	// 	minion_wave.push({id: i, image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true});
	// }



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
	var tower = {
			id : "",
			col: "",
			row: "",
			image: "/imgs/green_tower.png",
			range: 150,
			dmg: 20,
			cost: 75,
	};
	var $tower_one = $('.tower_one');
	var $tower_two = $('.tower_two');
	var $tower_three = $('.tower_three');
	$tower_one.css("background-color", "rgba(255,255,0,0.5)");
	$('.tower_one').on("click",function(){
		$tower_one.css("background-color", "rgba(255,255,0,0.5)");
		$tower_two.css("background-color", "transparent");
		$tower_three.css("background-color", "transparent");
		tower = {
					image: "/imgs/green_tower.png",
					range: 150,
					dmg: 20,
					cost: 75,
		};
	});
	$('.tower_two').on("click", function(){
		$tower_one.css("background-color", "transparent");
		$tower_two.css("background-color", "rgba(255,255,0,0.5)");
		$tower_three.css("background-color", "transparent");
		tower = {
					image: "/imgs/red_tower.png",
					range: 250,
					dmg: 10,
					cost: 100,
		};
	});
	$('.tower_three').on("click",function(){
		$tower_one.css("background-color", "transparent");
		$tower_two.css("background-color", "transparent");
		$tower_three.css("background-color", "rgba(255,255,0,0.5)");
		tower = {
					image: "/imgs/rocket_tower.png",
					range: 150,
					dmg: 30,
					cost: 125,
		};
	});

	$('.column').on("click", placeTower);
	function placeTower(event){
		// Add tower if theres none already in place
		if(gameEnd) return;
		if($(this).has('.tower').length > 0 || $(this).hasClass("path") || gold < tower.cost) return;

		var new_tower = {
			id : towers.length + 1,
			col : ($(this).attr("id")[1]),
			row : ($(this).attr("id")[0]),
			image: tower.image,
			range: tower.range,
			dmg: tower.dmg,
			cost: tower.cost,
		};
		towers.push(new_tower);
		$(this).append(`<img src="${new_tower.image}" class="tower" id="t${new_tower.id}">`);
		gold -= new_tower.cost;
		$('.player_gold').text(gold);
		// $(this).append('<div class="towerRange"></div>');
	}

	var interval = 100;
	// var minionIntervalID = setInterval(minion_move, interval);
	var cW = 100;
	var player_hp = 10;
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
		$('.start_wave').css("visibility", "hidden");
		$.ajax({
			method: "GET",
			url: "waves/"+waveCounter
		}).then(function(wave){
			minion_wave = wave.minions;
			waveCounter++;
		});

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
		{distance : 300, time : 3000, direction: "down"},
		{distance : 400, time : 4000, direction: "right"},
		{distance : 300, time : 3000, direction: "up"},
		{distance : 300, time : 3000, direction: "right"},
		// Going down from 18 to 68
		{distance : 600, time : 6000, direction: "down"},
		{distance : 800, time : 8000, direction: "left"},
		{distance : 200, time : 2000, direction: "down"},
		{distance : 900, time : 9000, direction: "right"}

		// {distance : 300, time : 300, direction: "down"},
		// {distance : 300, time : 300, direction: "right"},
		// {distance : 300, time : 300, direction: "up"},
		// {distance : 300, time : 300, direction: "right"},
		// // Going down from 18 to 68
		// {distance : 500, time : 500, direction: "down"},
		// {distance : 700, time : 700, direction: "left"},
		// {distance : 200, time : 200, direction: "down"},
		// {distance : 800, time : 800, direction: "right"}
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
		$('#12').append(`<img src="${minion.image}" class="minion" id="m${minion._id}">`);
		$('#12').append(`<p class="hp" id="hp${minion._id}">${minion.hp}</p>`);
		spawned_wave.push(minion);
		// var minion_selector = `#m${minion._id}`;
		// minion_move($(minion_selector));
		move_minion(minion);
	};

	// hardcoded path animate all the way to the end
	function move_minion(minion) {
		var minion_selector = $(`#m${minion._id}`);
		var hp_selector = $(`#hp${minion._id}`);

		// minion speed was 20
		// interval was 200

		// Move down 2 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[0].distance}px`,

			}, Number(`${minion_displacement[0].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `+=${minion_displacement[0].distance}px`,
		}, Number(`${minion_displacement[0].time/minion.speed*10}`), 'linear');

		// Move right 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[1].distance}px`,
			}, Number(`${minion_displacement[1].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"left": `+=${minion_displacement[1].distance}px`,
		}, Number(`${minion_displacement[1].time/minion.speed*10}`), 'linear');

		// Move up 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `-=${minion_displacement[2].distance}px`,
			}, Number(`${minion_displacement[2].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `-=${minion_displacement[2].distance}px`,
		}, Number(`${minion_displacement[2].time/minion.speed*10}`), 'linear');

		// Move right 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[3].distance}px`,
			}, Number(`${minion_displacement[3].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"left": `+=${minion_displacement[3].distance}px`,
		}, Number(`${minion_displacement[3].time/minion.speed*10}`), 'linear');

		// Move down 5 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[4].distance}px`,
			}, Number(`${minion_displacement[4].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `+=${minion_displacement[4].distance}px`,
		}, Number(`${minion_displacement[4].time/minion.speed*10}`), 'linear');

		// Move left 7 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `-=${minion_displacement[5].distance}px`,
			}, Number(`${minion_displacement[5].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"left": `-=${minion_displacement[5].distance}px`,
		}, Number(`${minion_displacement[5].time/minion.speed*10}`), 'linear');

		// Move down 2 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[6].distance}px`,
			}, Number(`${minion_displacement[6].time/minion.speed*10}`), 'linear', function(){minion.pathIndex++;});
		hp_selector.animate({
			"top": `+=${minion_displacement[6].distance}px`,
		}, Number(`${minion_displacement[6].time/minion.speed*10}`), 'linear');

		// Move right 8 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[7].distance}px`,
			}, Number(`${minion_displacement[7].time/minion.speed*10}`), 'linear');
		hp_selector.animate({
			"left": `+=${minion_displacement[7].distance}px`,
		}, Number(`${minion_displacement[7].time/minion.speed*10}`), 'linear', function(){
			minion_selector.remove();
			hp_selector.remove();
			spawned_wave =spawned_wave.filter(function(element) {
				return element._id != minion._id;
			});
			if (minion_wave.length === 0 && spawned_wave.length === 0) {
				$('.start_wave').css("visibility", "visible");
			}
			updateGameState();
		});
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
				let minion_selector = $(`#m${minion._id}`);
				var minionX  = minion_selector.offset().left+25;//+25 is half the minion size
				var minionY = minion_selector.offset().top+25;
				$tower = $(`#${tower.row}${tower.col}`);
				var towerX = $tower.offset().left+50; //+40 is half the tower size
				var towerY = $tower.offset().top+50;
				var minionDirection = minion_displacement[minion.pathIndex].direction;
				if (minionDirection === "right"){
					var xDistance = minionX - towerX + minion.speed*bulletTime/interval;
					var yDistance = minionY - towerY;
				}
				else if (minionDirection === "left"){
					var xDistance = minionX - towerX - minion.speed*bulletTime/interval;
					var yDistance = minionY - towerY;
				}
				else if (minionDirection === "up"){
					var xDistance = minionX - towerX ;
					var yDistance = minionY - towerY- minion.speed*bulletTime/interval;
				}
				else if (minionDirection === "down"){
					var xDistance = minionX - towerX ;
					var yDistance = minionY - towerY + minion.speed*bulletTime/interval;
				}
				var distance = Math.sqrt(xDistance*xDistance+yDistance*yDistance);
				if (distance < tower.range){
				// change to tower range
					shoot_bullet(minion, tower);
				}
			});
		});
	}


	// minion is the minion obj, tower obj
	function shoot_bullet(minion, tower){
		// var minion = $('#m1');
		var $tower = $(`#${tower.row}${tower.col}`);
		$tower.append(`<img src="/imgs/car1.png" class="bullet" id="b${tower.id}">`);
	
		var minion_selector = $(`#m${minion._id}`);
		var hp_selector = $(`#hp${minion._id}`);
		var tower_damage = tower.dmg;

		var bullet = $(`#b${tower.id}`);
		var minionX  = minion_selector.offset().left+15; //15=(minion size - bullet size)/2
		var minionY = minion_selector.offset().top+15;
		var bulletX = bullet.offset().left;
		var bulletY = bullet.offset().top;
		var minionDirection = minion_displacement[minion.pathIndex].direction;
		if (minionDirection === "right"){
			var xDistance = minionX - bulletX + minion.speed*bulletTime/interval;
			var yDistance = minionY - bulletY;
		}
		else if (minionDirection === "left"){
			var xDistance = minionX - bulletX - minion.speed*bulletTime/interval;
			var yDistance = minionY - bulletY;
		}
		else if (minionDirection === "up"){
			var xDistance = minionX - bulletX ;
			var yDistance = minionY - bulletY- minion.speed*bulletTime/interval;
		}
		else if (minionDirection === "down"){
			var xDistance = minionX - bulletX ;
			var yDistance = minionY - bulletY + minion.speed*bulletTime/interval;
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
					return element._id != minion._id;
				});

				if (minion_wave.length === 0 && spawned_wave.length === 0) {
					$('.start_wave').css("visibility", "visible");
				}
				
				minion_selector.remove();
				if (minion.alive){
					minions_killed++;
					$('.minions_killed').text(minions_killed);
					gold += minion.gold;
					$('.player_gold').text(gold);
					minion.alive = false;
				}
			}
		});
	}
});

function profileBtnOnSubmit(event){
	event.preventDefault();
	console.log($(this));
	var d = $(this).serialize();
	let name = $('.card-title').text();
	let newName = $('[name=profile_name]').val();
	let newLink = $('[name=profile_link]').val();
	if(newName == "" || newName == undefined) {
		alert('Please enter a valid name');
		return;
	}
	console.log(newName + newLink);
	$('.toggle').toggle();
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