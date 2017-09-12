// app.js
console.log("app js is loaded");

$(document).ready(function() {
	$('#myModal').modal({
		backdrop: 'static',
		keyboard: false,
	});

	// indicate tower stats on hover
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

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

  // Place tower at mouse click
  var tower = {
      id : "",
      col: "",
      row: "",
      image: "/imgs/tower_one.png",
      range: 150,
      dmg: 20,
      cost: 75,
  };
  var $tower_one = $('.tower_one');
  var $tower_two = $('.tower_two');
  var $tower_three = $('.tower_three');
  // Chnage tower type upon clicking icons on right
  $tower_one.css("background-color", "rgba(255,255,0,0.5)");
  $('.tower_one').on("click",function(){
    $tower_one.css("background-color", "rgba(255,255,0,0.5)");
    $tower_two.css("background-color", "transparent");
    $tower_three.css("background-color", "transparent");
    tower = {
          image: "/imgs/tower_one.png",
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
          image: "/imgs/tower_two.png",
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
          image: "/imgs/tower_three.png",
          range: 150,
          dmg: 30,
          cost: 125,
    };
  });

  // Drop tower on click
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
	// and upgrade level with each click
	$('.start_wave').on("click", function() {
		$('.start_wave').css("visibility", "hidden");
		$.ajax({
			method: "GET",
			url: "waves/"+waveCounter
		}).then(function(wave){
			minion_wave = wave.minions;
			waveCounter++;
		});
		// Continuously spawn minion and tower check if minion are in range
		minion_wave_intervalID = setInterval(spawnMinion, 1500);
		tower_intervalID = setInterval(towerResponse, 500);
	});


	// distance = speed x time
	// in our case, each box is 100px, or take 1sec to travel
	// distance to time ratio is 1: 15
	var minion_displacement =[
		// Fixed distance, time, direction for minions to travel
		// Each minions will travel at diff time for same distance
		// based on their speed
		{distance : 300, time : 3000, direction: "down"},
		{distance : 400, time : 4000, direction: "right"},
		{distance : 300, time : 3000, direction: "up"},
		{distance : 300, time : 3000, direction: "right"},
		// Going down from 18 to 68
		{distance : 600, time : 6000, direction: "down"},
		{distance : 800, time : 8000, direction: "left"},
		{distance : 200, time : 2000, direction: "down"},
		{distance : 900, time : 9000, direction: "right"}
	];

	// Create minion element and append to spawned_wave array
	function spawnMinion() {
		if (minion_wave.length == 0) {
			clearInterval(minion_wave_intervalID);
			return;}
		var minion = minion_wave.pop();
		$('#12').append(`<img src="${minion.image}" class="minion" id="m${minion._id}">`);
		$('#12').append(`<p class="hp" id="hp${minion._id}">${minion.hp}</p>`);
		spawned_wave.push(minion);
		move_minion(minion);
	};

	// hardcoded distance that minion move
	// Each minion travel time is proportional to their speed
	function move_minion(minion) {
		var minion_selector = $(`#m${minion._id}`);
		var hp_selector = $(`#hp${minion._id}`);

		// Move down 2 boxes
		minion_selector.animate({
			"top" : `+=${minion_displacement[0].distance}px`,
			}, Number(`${minion_displacement[0].time/minion.speed*10}`), 'linear', function(){
				// pathIndex for tower determine shooting direction
				// rotate to give better visual as minion change path
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(270deg)");
			});
		hp_selector.animate({
			"top": `+=${minion_displacement[0].distance}px`,
		}, Number(`${minion_displacement[0].time/minion.speed*10}`), 'linear');

		// Move right 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[1].distance}px`,
			}, Number(`${minion_displacement[1].time/minion.speed*10}`), 'linear', function(){
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(180deg)");
			});
		hp_selector.animate({
			"left": `+=${minion_displacement[1].distance}px`,
		}, Number(`${minion_displacement[1].time/minion.speed*10}`), 'linear');

		// Move up 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `-=${minion_displacement[2].distance}px`,
			}, Number(`${minion_displacement[2].time/minion.speed*10}`), 'linear', function(){
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(270deg)");
			});
		hp_selector.animate({
			"top": `-=${minion_displacement[2].distance}px`,
		}, Number(`${minion_displacement[2].time/minion.speed*10}`), 'linear');

		// Move right 3 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `+=${minion_displacement[3].distance}px`,
			}, Number(`${minion_displacement[3].time/minion.speed*10}`), 'linear', function(){
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(360deg)");
			});
		hp_selector.animate({
			"left": `+=${minion_displacement[3].distance}px`,
		}, Number(`${minion_displacement[3].time/minion.speed*10}`), 'linear');

		// Move down 5 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[4].distance}px`,
			}, Number(`${minion_displacement[4].time/minion.speed*10}`), 'linear', function(){
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(90deg)");
			});
		hp_selector.animate({
			"top": `+=${minion_displacement[4].distance}px`,
		}, Number(`${minion_displacement[4].time/minion.speed*10}`), 'linear');

		// Move left 7 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"left" : `-=${minion_displacement[5].distance}px`,
			}, Number(`${minion_displacement[5].time/minion.speed*10}`), 'linear', function(){
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(360deg)");
			});
		hp_selector.animate({
			"left": `-=${minion_displacement[5].distance}px`,
		}, Number(`${minion_displacement[5].time/minion.speed*10}`), 'linear');

		// Move down 2 boxes
		minion_selector.animate({
			// "margin-top": `+=${minionSpeed}px`
			"top" : `+=${minion_displacement[6].distance}px`,
			}, Number(`${minion_displacement[6].time/minion.speed*10}`), 'linear', function(){
				minion.pathIndex++;
				minion_selector.css("-webkit-transform", "rotate(270deg)");
			});
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
			// If minions ever reach the end, remove minion, lower player hp,
			// remove from spawned array, show start_wave btn, and update
			// the game state
			minion_selector.remove();
			hp_selector.remove();
			spawned_wave =spawned_wave.filter(function(element) {
				return element._id != minion._id;
			});
			if (minion_wave.length === 0 && spawned_wave.length === 0 && player_hp > 0) {
				$('.start_wave').css("visibility", "visible");
			}
			updateGameState();
		});
	}

	// Update player stats and stop all timer
	// display appropriate msg to player and save score to database
	// Currently, only save score when user has lost, not after
	// defending each wave.
	function updateGameState() {
		player_hp--;
		$('.player_health').text(player_hp);
		$player_hp.text(player_hp);
		if(player_hp === 0) {
			clearInterval( minion_wave_intervalID);
			clearInterval( move_minion_intervalID);
			clearInterval( tower_intervalID);
			alert(`Game Over! Your score is ${minions_killed}`);
			jQuery.fx.off = true;
			gameEnd = true;
			submitScore();
		}
	}

	// Update player score to database
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
				//+25 is half the minion size
				var minionX  = minion_selector.offset().left+25;
				var minionY = minion_selector.offset().top+25;
				$tower = $(`#${tower.row}${tower.col}`);
				//+50 is half the tower size
				var towerX = $tower.offset().left+50; 
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
					shoot_bullet(minion, tower);
				}
			});
		});
	}

	// minion is the minion obj, tower obj
	// shoot bullet based on distance between tower and minion and the direction
	// of the minion will be traveling to
	function shoot_bullet(minion, tower){
		var $tower = $(`#${tower.row}${tower.col}`);
		$tower.append(`<img src="/imgs/car1.png" class="bullet" id="b${tower.id}">`);
	
		var minion_selector = $(`#m${minion._id}`);
		var hp_selector = $(`#hp${minion._id}`);
		var tower_damage = tower.dmg;

		var bullet = $(`#b${tower.id}`);
		//15 = (minion size - bullet size)/2
		var minionX  = minion_selector.offset().left+15; 
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
				
				// update player stats
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

function displayErr(err){
	console.log(err);
}
