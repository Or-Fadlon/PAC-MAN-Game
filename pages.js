var all_users;
var curr_user;

$(document).ready(function () {
  $("#welcome_label").click(function () {
    ShowDiv("#welcome_div");
  });

  $("#register_button").click(function () {
    ShowDiv("#register_div")
  });

  $("#register_label").click(function () {
    ShowDiv("#register_div");
  });

  $("#login_label").click(function () {
    ShowDiv("#login_div");
  });

  $("#login_button").click(function () {
    ShowDiv("#login_div");
  });

  $("#start_game_button").click(function () {
    if (!check_settings()) return;
    ShowDiv("#game_div");

    // let up = $("#up_button").val();
    // let right = $("#right_button").val();
    // let down = $("#down_button").val();
    // let left = $("#left_button").val();

    //TODO: add register keys logic!
    let up = 38;
    let right = 39;
    let down = 40;
    let left = 37;
    
    let ball_5_color = $("#5_color").val();
    let ball_15_color = $("#15_color").val();
    let ball_25_color = $("#25_color").val();
    let number_of_enemies = $("#monster_setting").val();
    let number_of_food = $("#pac_dots_num_settings").val();
    let time = $("#time_setting").val();

    window.StartGame(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food);
  });

  function ShowDiv(name){
    let arr = ["#welcome_div", "#register_div", "#login_div", "#settings_div", "#about_div", "#game_div"];
    arr.forEach(element => {
          if (element == name) $(element).show();
          else $(element).hide();
      });
  }

  var new_user = {
    username: "k",
    password: "k",
    firstName: "k",
    lastName: "k",
    email: "k@k.com",
    birthdate: "22/02/2022",
  };
  all_users = new Array(new_user);
});