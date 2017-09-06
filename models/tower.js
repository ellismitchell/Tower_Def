let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TowerSchema = new Schema({
	name: String,
	damage: Number,
	range: Number,
	x: Number,
	y: Number
});

module.exports = mongoose.model('Tower', TowerSchema);