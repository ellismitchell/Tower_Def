let db = require('./models');
let waveList = [];
waveList.push({
	wave: 1,
	minions: [
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 30}
	]
});
waveList.push({
	wave: 2,
	minions: [
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
		{image: "/imgs/car1.png", speed: 30, hp: 150, pathIndex: 0, alive: true, gold: 30},
	]
});
waveList.push({
	wave: 3,
	minions: [
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
		{image: "/imgs/green_fighter.png", speed: 40, hp: 175, pathIndex: 0, alive: true, gold: 35},
	]
});
waveList.push({
	wave: 4,
	minions: [
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/spaceship.png", speed: 35, hp: 200, pathIndex: 0, alive: true, gold: 40},
	]
});
waveList.push({
	wave: 5,
	minions: [
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 35, hp: 300, pathIndex: 0, alive: true, gold: 45},
	]
});
db.Wave.remove({}, function(err, waves){
	db.Wave.create(waveList, function(err, waves){
		console.log("seed minion succeed!");
		process.exit();
	})
});