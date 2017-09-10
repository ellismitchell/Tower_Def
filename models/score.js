let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ScoreSchema = new Schema({
	score: { type: Number, default: 0},
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Score', ScoreSchema);