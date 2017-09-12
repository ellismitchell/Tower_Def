$(document).ready(function() {
  function findUsernameAfterSubmit() {
    $('.user-submit').click(function(){
      let name = $('[name=username]').val();
      $.ajax({
        method: "GET",
        url: `/users/find/${name}`,
        success: handleUser
      });
    });
  }

  function renderProfile(user){
    $('.show_profile').html( `  
      <div class="card" >
          <img class="card-img-top" src=${user.profileImage} alt="Broken Img Link =(">
          <div class="card-body">
            <h4 class="card-title">${user.name}</h4>
          </div>  
      </div>`
    );
  }

  function handleUser(data){
    var same_name = $('[name=username]').val();
    if (data === null) {
      // $('input').toggle();
      $('.modal-title').html(`<h3>Do you have a profile image link?</h3>`);
      $('.modal-body').html('<input type="url" name="image-link" >');
      $('.modal-footer').html(`<button type="button" class="image-submit btn btn-dark">Play!</button>`);
      $('.image-submit').click(function(){

        if($('[name=image-link]').val() == null || $('[name=image-link]').val() == undefined || $('[name=image-link]').val() =="") {
          var img_link = "https://maxcdn.icons8.com/Share/icon/ultraviolet/Users//guest1600.png";
        }else {
          var img_link = $('[name=image-link]').val();
        }

        $.ajax({
          method: 'POST',
          url: '/users',
          data: {profile_name: same_name, profile_link: img_link},
          
        }).then(function(user){
          $('#myModal').modal('hide');
          renderProfile(user);
        })
      });
    }else {
      $('#myModal').modal('hide');
      renderProfile(data);
    }
  }

  function displayProfileEditForm(event){
    let name = $('.card-title').text();
    let link = $('.card-img-top').attr('src');
    $('.toggle').toggle();
    $('[name=profile_name]').val(name);
    $('[name=profile_link]').val(link);
  }

  function onEditProfileSubmit(event){
    event.preventDefault();
    var d = $(this).serialize();
    let name = $('.card-title').text();
    let link = $('.card-img-top').attr('src');
    let currLink = $('[name=profile_link]').val();

    // prefill old link if user doesnt left the field blank
    if(currLink == "" || currLink == undefined || currLink == null){
      link = "https://maxcdn.icons8.com/Share/icon/ultraviolet/Users//guest1600.png";
      $('[name=profile_link]').val(link);
    }
    let newName = $('[name=profile_name]').val();
    let newLink = $('[name=profile_link]').val();
    // clear out input fields after submit
    $('.toggle').toggle();
      $.ajax({
        method: "PUT",
        url: "/users/"+ name,
        data: {
          name: newName,
          link: newLink
        },
      }).then(function(user){
        console.log("returned user is ", user);
        renderProfile(user);
      });
  }

  function deleteProfile(){
    console.log("trying to delete");
    $.ajax({
      method: "DELETE",
      url: `/users/${$('.card-title').text()}`
    })
    .then(function(){
      location.reload();
    });
  }

  findUsernameAfterSubmit();
  $('.edit-btn').on("click", displayProfileEditForm);
  $('.profile_form').on("submit", onEditProfileSubmit);
  $('.delete-btn').on("click", deleteProfile);
});