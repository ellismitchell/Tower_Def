let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Score = require('./score');

let UserSchema = new Schema ({
	name: String,
	profileImage: String,
	scores: [Score.schema]
});

module.exports = mongoose.model('User', UserSchema);