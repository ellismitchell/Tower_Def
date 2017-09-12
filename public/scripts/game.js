$(document).ready(function() {
  function createGameboardRow(x,y){
    return (`
        <div class="column" id="${x}${y}">
        </div>
    `);
  }

  function createGameboard(maps) {
    var $board = $('.board');
    var board_size = 9;
    var row = "";
    // Hardcoded the gameboard grids
    for(var i = 1; i <= board_size; i ++){
      row+=`<div class="row row_${i}">`;
      for(var j= 1; j<=board_size; j++){
        row += createGameboardRow(i,j);
      }
      row +=`</div>`; 
    }
    $board.append(row);
  }

  function styleTiles() {
    // Adding path class to these divs so they cant build towers on top
    // var numsOfTilesThatNeedBkgd = [];
    $('#12,#22,#32,#42,#43,#44,#45,#46,#36,#26,#16,#17,#18,#19,#29,#39,#49,#59,#69, #79,#78,#77,#76, #75,#74 ,#73 ,#72,#71, #81, #91, #91,#92,#93,#94,#95,#96,#97,#98,#99,#910').addClass("path");
    // Hardcoding css images...
    // Top left gameboard middle blocks
    $('#14, #24').css("background-image", "url('/imgs/main_tile.png");
    $('#14, #24').css("background-size", "cover");
    //left side is path for these divs..
    $('#13,#23,#37,#47').css("background-image", "url('/imgs/right_tile.png'");
    $('#13,#23,#37,#47').css("background-size", "cover");
    // //right side is path for these divs..
    $(' #11,#21,#31,#41,#15,#25,#38,#48,#58').css("background-image", "url('/imgs/left_tile.png'");
    $(' #11,#21,#31,#41,#15,#25,#38,#48,#58').css("background-size", "cover");
    // //top black ...
    $('#52,#53,#54,#55,#56').css("background-image", "url('/imgs/bot_tile.png'");
    $('#52,#53,#54,#55,#56').css("background-size", "cover");
    // // bottom black...
    $('#34,#61,#62,#63,#64,#65,#66,#67').css("background-image", "url('/imgs/top_tile.png'");
    $('#34,#61,#62,#63,#64,#65,#66,#67').css("background-size", "cover");
    // // top bot black...
    $('#83,#84,#85,#86,#87,#88,#89,#82').css("background-image", "url('/imgs/main_tile.png'");
    $('#83,#84,#85,#86,#87,#88,#89,#82').css("background-size", "cover");
    // // corners..... black
    $('#33').css("background-image", "url('/imgs/bot_left_tile.png'");
    $('#33').css("background-size", "cover");
    // // roundblack...
    $('#51').css("background-image", "url('/imgs/left_bot_round_tile.png')");
    $('#51').css("background-size", "cover");
    $('#57').css("background-image", "url('/imgs/right_bot_round_tile.png')");
    $('#57').css("background-size", "cover");
    $('#35,#68').css("background-image", "url('/imgs/bot_right_tile.png')");
    $('#35,#68').css("background-size", "cover");
    $('#28').css("background-image", "url('/imgs/top_right_tile.png')");
    $('#28').css("background-size", "cover");
    $('#27').css("background-image", "url('/imgs/top_left_tile.png')");
    $('#27').css("background-size", "cover");
    $('#12').css("background-image", "url('/imgs/door_tile.png')");
    $('#12').css("background-size", "cover");
    $('.row').eq(8).css("border-right", "none");
    // Princess!
    $('#99').css("background-image", "url('/imgs/princess.png')");
    $('#99').css("background-size", "cover");
  }

  function indicatePlaceableTile() {
    $('.column').hover(
      function() {
        if($(this).hasClass("path") == false) {
          $(this).append(`<div class="can_build"></div>`);
        }
      }, function(){
          $(this).find("div:last").remove();
        }
    );
  }
  
  createGameboard();
  styleTiles();
  indicatePlaceableTile();
});