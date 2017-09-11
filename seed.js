let db = require('./models');
let waveList = [];
waveList.push({
	wave: 1,
	minions: [
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/zombie.png", speed: 10, hp: 220, pathIndex: 0, alive: true, gold: 20}
	]
});
waveList.push({
	wave: 2,
	minions: [
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/car1.png", speed: 15, hp: 180, pathIndex: 0, alive: true, gold: 20},
	]
});
waveList.push({
	wave: 3,
	minions: [
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
		{image: "/imgs/green_fighter.png", speed: 20, hp: 250, pathIndex: 0, alive: true, gold: 20},
	]
});
waveList.push({
	wave: 4,
	minions: [
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
		{image: "/imgs/spaceship.png", speed: 18, hp: 320, pathIndex: 0, alive: true, gold: 25},
	]
});
waveList.push({
	wave: 5,
	minions: [
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/green_car.png", speed: 30, hp: 440, pathIndex: 0, alive: true, gold: 45},
	]
});
waveList.push({
	wave: 6,
	minions: [
		{image: "/imgs/zombie.png", speed: 10, hp: 550, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 10, hp: 550, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 10, hp: 550, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/spaceship.png", speed: 35, hp: 420, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/spaceship.png", speed: 35, hp: 420, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/spaceship.png", speed: 35, hp: 420, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/car1.png", speed: 32, hp: 400, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/car1.png", speed: 32, hp: 400, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/car1.png", speed: 32, hp: 400, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/car1.png", speed: 32, hp: 400, pathIndex: 0, alive: true, gold: 45},
	]
});
waveList.push({
	wave: 7,
	minions: [
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
		{image: "/imgs/zombie.png", speed: 25, hp: 500, pathIndex: 0, alive: true, gold: 45},
	]
});
waveList.push({
	wave: 8,
	minions: [
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/green_car.png", speed: 40, hp: 600, pathIndex: 0, alive: true, gold: 50},
	]
});
waveList.push({
	wave: 9,
	minions: [
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
		{image: "/imgs/spaceship.png", speed: 35, hp: 800, pathIndex: 0, alive: true, gold: 50},
	]
});
waveList.push({
	wave: 10,
	minions: [
		{image: "/imgs/zombie.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/zombie.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/car1.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/car1.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/spaceship.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/spaceship.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/green_car.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/green_car.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/green_car.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
		{image: "/imgs/green_car.png", speed: 35, hp: 1600, pathIndex: 0, alive: true, gold: 0},
	]
});
db.Wave.remove({}, function(err, waves){
	db.Wave.create(waveList, function(err, waves){
		console.log("seed minion succeed!");
		process.exit();
	})
});