let db = require('./models');
let waveList = [];
waveList.push({
	wave: 1,
	minions: [
		{image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true},
		{image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true},
		{image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true},
		{image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true},
		{image: "/imgs/car1.jpg", speed: 20, hp: 100, pathIndex: 0, alive: true}
	]
});
db.Wave.remove({}, function(err, waves){
	db.Wave.create(waveList, function(err, waves){
		process.exit();
	})
});