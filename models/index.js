let mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/tower-def", {useMongoClient: true});

module.exports.User = require('./user.js');
module.exports.Score = require('./score.js');
module.exports.Wave = require('./wave.js');