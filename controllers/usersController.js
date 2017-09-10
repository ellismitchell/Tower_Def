let db = require('../models');

function show(req, res) {
	db.User.findById(req.params.id, function(err, user){
		res.json(user);
	});
}

function showAll(req, res) {
	// -1 MEANS DESCENDING
	// db.Score.findOne({name: NEWDUDE}, null, {sort: {score: -1}}, function(err, users) {
	//  res.json(users);});
	db.User.find({}, function(err, users){
		res.json(users);
	});
}

function find(req,res){
	console.log('finding');
	db.User.findOne({name: req.params.name},function(err,user){
		if (err)
			console.log(err);
		console.log(user);
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
	db.User.findOneAndRemove({name: req.params.name}, function(err, user){
		res.json(user);
	});
}

function update(req, res) {
	db.User.findOne({name: req.params.name}, function(err, user){
		user.name = req.body.name;
		user.profileImage = req.body.link;
		user.save();
		res.json(user);
		console.log(user);
	})
	// db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
	// 	res.json(user);
	// });
}

module.exports = {
	show: show,
	create: create,
	destroy: destroy,
	update: update,
	find: find,
	showAll: showAll,
}