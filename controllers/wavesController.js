let db = require('../models');

function find(req,res) {
	db.Wave.findOne({wave: req.params.index}, function(err,wave){
		res.json(wave);
	});
}

module.exports = {
	find: find
}