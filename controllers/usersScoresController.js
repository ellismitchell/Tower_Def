let db = require('../models');

function index(req, res) {
	db.Score.find({}, function (err, allScores){
		res.json(allScores);
	});
}

function create(req, res) {
	db.User.findById(req.params.id, function(err,user){
		let newScore = new db.Score(req.body);
		user.scores.push(newScore);
		user.save(function(err,savedUser){
			res.json(newScore);
		})
	})
}

module.exports = {
	index: index,
	create: create
}