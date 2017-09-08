let express = require("express");
let app = express();
let bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
let controllers = require('./controllers');

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/main_page.html');
});

app.get('/gameboard.html', function (req, res) {
  res.sendFile(__dirname + '/views/gameboard.html');
});

// #############################
app.get('/:name/gameboard.html', function(req, res){
	res.render()
})
// #############################




app.get('/profile.html', function (req, res) {
  res.sendFile(__dirname + '/views/profile.html');
});

app.get('/users/:id', controllers.users.show);
app.get('/users/find/:name', controllers.users.find);
app.post('/users', controllers.users.create);
app.put('/users/:id', controllers.users.update);
app.delete('/users/:id', controllers.users.destroy);
app.post('/users/:id/scores', controllers.usersScores.create);
app.get('/users/:id/scores', controllers.usersScores.index);

app.listen(process.env.PORT || 3000, function() {
	console.log("Server started at 3000");
});