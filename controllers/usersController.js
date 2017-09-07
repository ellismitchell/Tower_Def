let db = require('../models');

function show(req, res) {
	db.User.findById(req.params.id, function(err, user){
		res.json(user);
	});
}

function create(req, res) {
	console.log(req.body);
	console.log("In server?");
	var new_user = new db.User({
		name: req.body.profile_name,
		profileImage: req.body.profile_link,
	})
	console.log(new_user);
	new_user.save(function(err, user){
		if(err) return handleError(err);
		res.json(user);
	});

	// db.User.create(req.body, function(err, user){
	// 	console.log(req.body);
	// 	res.redirect('/:user_id/profile.html');
	// });
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