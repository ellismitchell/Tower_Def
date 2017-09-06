let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ScoreSchema = new Schema({
	score: Number,
	date: Date
});

module.exports = mongoose.model('Score', ScoreSchema);