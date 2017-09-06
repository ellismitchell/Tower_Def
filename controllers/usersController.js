let db = require('../models');

function show(req, res) {
	db.User.findById(req.params.id, function(err, user){
		res.json(user);
	});
}

function create(req, res) {
	db.User.create(req.body, function(err, user){
		res.json(user);
	});
}

function destroy(req, res) {
	db.User.findByIdAndRemove(req.params.id, function(err, user){
	});
}

function update(req, res) {
	db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
		res.json(user);
	});
}

module.exports = {
	show: show,
	create: create,
	destroy: destroy,
	update: update
}