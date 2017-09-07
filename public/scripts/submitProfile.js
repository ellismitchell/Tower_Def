// profile.js
console.log("profile js is loaded");

$(document).ready(function() {

	$('.profile_form').on("submit", function(event){
		event.preventDefault();
		var name = $(this).serialize();
		$.ajax({
			method: "POST",
			url: "/users",
			data: name,
			success: handleSuccess
		})
	})

	function handleSuccess(new_user){
		//
		
	}

});