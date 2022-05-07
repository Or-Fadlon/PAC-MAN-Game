var all_users;
var curr_user;

$(document).ready(function () {
  $("#welcome_label").click(function () {
    $("#welcome_div").show();
    $("#register_div").hide();
    $("#login_div").hide();
    $("#settings_div").hide();
    $("#about_div").hide();
    $("#game_div").hide();
  });

  $("#register_button").click(function () {
    $("#welcome_div").hide();
    $("#register_div").show();
    $("#login_div").hide();
    $("#settings_div").hide();
    $("#about_div").hide();
    $("#game_div").hide();
  });

  $("#register_label").click(function () {
    $("#welcome_div").hide();
    $("#register_div").show();
    $("#login_div").hide();
    $("#settings_div").hide();
    $("#about_div").hide();
    $("#game_div").hide();
  });

  $("#login_label").click(function () {
    $("#welcome_div").hide();
    $("#register_div").hide();
    $("#login_div").show();
    $("#settings_div").hide();
    $("#about_div").hide();
    $("#game_div").hide();
  });

  $("#login_button").click(function () {
    $("#welcome_div").hide();
    $("#register_div").hide();
    $("#login_div").show();
    $("#settings_div").hide();
    $("#about_div").hide();
    $("#game_div").hide();
  });

  $("#start_game_button").click(function () {
    if (!check_settings()) return;
    $("#welcome_div").hide();
    $("#register_div").hide();
    $("#login_div").hide();
    $("#settings_div").hide();
    $("#about_div").hide();
    $("#game_div").show();

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