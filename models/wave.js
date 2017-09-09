let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Minion = require('./minion');

let WaveSchema = new Schema({
	wave: Number,
	minions: [Minion.schema]
});

module.exports = mongoose.model('Wave', WaveSchema);