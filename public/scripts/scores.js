// scores.js

console.log("score js is loaded");

$(document).ready(function() {

	// Render all scores when page is loaded
	renderAllScores();

	var $table = $('.table');
	var $tbody = $('.table>tbody');
	function renderAllScores(){
		if($tbody != undefined){$table.empty();}
		$.ajax({
			method: "GET",
			url: "/users/showAll",
		}).then(function(users){
			console.log(users);
			$table.append(`
				<thead class="thead-inverse">
					<tr>
						<th> </th>
						<th>Player</th>
						<th>Scores</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
				`)
			$tbody = $('.table>tbody');
			users.forEach(function(user){
				$tbody.append(templateScores(user));
			});
		});
	}

	$('.search-user').on("submit", function(e){
		e.preventDefault();
		var name = $('[name=user]').val();
		$.ajax({
			method: "GET",
			url : "/users/find/" + name
		}).then(function(user){
			// filter if not empty
			if(user !== null ){
				$tbody.html(templateScores(user));
			}else if (user === null){
				$table.empty();
				$table.append(`<div class="err_msg"><p>There are no matched results =(</p> </div>`);
			}
			//append a go back button
			$table.append(`
				<button type="button" class="err_msg show_scores btn btn-dark">Back</button>
				`)
		});
	});

	$('main').on("click", ".show_scores", function(){
		$('.err_msg').remove();
		renderAllScores();
	});


});

// collapse and table
function templateScores(user){

	user.scores.sort(function(a,b){
		return b.score - a.score;
	})
	console.log(user);
	var highScore = user.scores[0].score;
	var date = user.scores[0].date;

	return `
	    <tr>
	      <th scope="row"><img src="${user.profileImage}" alt="Profile Pic"></th>
	      <td>${user.name}</td>
	      <td>${highScore}</td>
	      <td>${date}</td>
	    </tr>
	`;
}
