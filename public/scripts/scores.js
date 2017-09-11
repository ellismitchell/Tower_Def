// scores.js

console.log("score js is loaded");

$(document).ready(function() {

	// Render all scores when page is loaded or when its called
	renderAllScores();

	var $table = $('.table');
	var $tbody = $('.table>tbody');
	function renderAllScores(){
		if($tbody != undefined){$table.empty();}
		$.ajax({
			method: "GET",
			url: "/users/showAll",
		}).then(function(users){
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
			
			//for each user, sort their score array from high to low
			users.forEach(function(user){
				user.scores = user.scores.sort(function(s1,s2){
					return s2.score - s1.score;
				});
			});
			// Of all users, sort their rank base on their high score
			users.sort(function(p1,p2){
				return p2.scores[0].score - p1.scores[0].score;
			});
			// Finally append sorted entry into table from each's best high score to low
			users.forEach(function(user){
				$tbody.append(templateScores(user));
			});
		});
	}

	// Perform search and render appropriate result.
	$('.search-user').on("submit", function(e){
		e.preventDefault();
		var name = $('[name=user]').val();
		$.ajax({
			method: "GET",
			url : "/users/find/" + name
		}).then(function(user){
			// filter if not empty
			if(user !== null ){
				user.scores = user.scores.sort(function(s1,s2){
					return s2.score - s1.score;
				});
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

	// The back button
	$('main').on("click", ".show_scores", function(){
		$('.err_msg').remove();
		renderAllScores();
	});


});

// table entry
function templateScores(user){

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
