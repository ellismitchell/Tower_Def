let db = require('./models');

db.User.remove({}, function(err, users){
	if (err){
		return console.log("Error:", err);
	}
	console.log("Deleted all users" + users);
		  process.exit(); // we're all done! Exit the program.
});