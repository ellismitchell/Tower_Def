let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MinionSchema = new Schema({
	name: String,
	health: Number,
	speed: Number,
	x: Number,
	y: Number
});

module.exports = mongoose.model('Minion', MinionSchema);