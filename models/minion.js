let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MinionSchema = new Schema({
	image: String,
	hp: Number,
	speed: Number,
	pathIndex: Number,
	alive: Boolean
});

module.exports = mongoose.model('Minion', MinionSchema);