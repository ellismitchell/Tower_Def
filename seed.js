let db = require('./models');
let waveList = [];
waveList.push({
	wave: 1,
	minions: [
		{image: "/imgs/fighter.png", speed: 30, hp: 100, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/fighter.png", speed: 30, hp: 100, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/fighter.png", speed: 30, hp: 100, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/fighter.png", speed: 30, hp: 100, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/fighter.png", speed: 30, hp: 100, pathIndex: 0, alive: true, gold: 25}
	]
});
waveList.push({
	wave: 2,
	minions: [
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
		{image: "/imgs/car1.png", speed: 40, hp: 150, pathIndex: 0, alive: true, gold: 40},
	]
});
waveList.push({
	wave: 3,
	minions: [
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_fighter.png", speed: 50, hp: 250, pathIndex: 0, alive: true, gold: 45},
	]
});
db.Wave.remove({}, function(err, waves){
	db.Wave.create(waveList, function(err, waves){
		process.exit();
	})
});