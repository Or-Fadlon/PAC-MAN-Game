var all_users;
var curr_user;

$(document).ready(function () {
    $("#welcome_label").click(() => ShowDiv("#welcome_div"));
    $("#register_button").click(() => ShowDiv("#register_div"));
    $("#register_label").click(() => ShowDiv("#register_div"));
    $("#login_label").click(() => ShowDiv("#login_div"));
    $("#login_button").click(() => ShowDiv("#login_div"));
    $("#start_game_button").click(function () {
        if (!check_settings()) return;
        ShowDiv("#game_div");
        let up = assign_keyboard("up");
        let down = assign_keyboard("down");
        let left = assign_keyboard("left")
        let right = assign_keyboard("right")
        let ball_5_color = $("#5_color").val();
        let ball_15_color = $("#15_color").val();
        let ball_25_color = $("#25_color").val();
        let number_of_enemies = $("#monster_setting").val();
        let number_of_food = $("#pac_dots_num_settings").val();
        let time = $("#time_setting").val();

        window.StartGame(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food);
    });

    function ShowDiv(name) {
        let arr = ["#welcome_div", "#register_div", "#login_div", "#settings_div", "#about_div", "#game_div"];
        arr.forEach(element => {
            if (element == name) $(element).show();
            else $(element).hide();
        });
        if(name!= "#game_div"){
            document.getElementById("login_username").value = "";
            document.getElementById("login_pass").value = "";
            document.getElementById("up_button").value = "";
            document.getElementById("down_button").value = "";
            document.getElementById("left_button").value = "";
            document.getElementById("right_button").value = "";
            document.getElementById("pac_dots_num_settings").value = 50;
            document.getElementById("5_color").value = "#FF726f";
            document.getElementById("15_color").value = "#88C0D3";
            document.getElementById("25_color").value = "#51C251";
            document.getElementById("time_setting").value = 60;
            document.getElementById("monster_setting").value = 1;
            document.getElementById("F_username").value = "";
            document.getElementById("F_password").value = "";
            document.getElementById("F_repeat_password").value = "";
            document.getElementById("F_firstName").value = "";
            document.getElementById("F_lastName").value = "";
            document.getElementById("F_email").value = "";
            document.getElementById("F_date").value = "";
        }
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


function assign_keyboard(diraction){
    if(diraction=="up"){
        if($("#up_button").val()=='')
            return 38;
        else
            return getKeyCode($("#up_button").val());
    }
    if(diraction=="down"){
        if($("#down_button").val()=='')
            return 40;
        else
            return getKeyCode($("#down_button").val());
    }
    if(diraction=="left"){
        if($("#left_button").val()=='')
            return 37;
        else
            return getKeyCode($("#left_button").val());
    }
    if(diraction=="right"){
        if($("#right_button").val()=='')
            return 39;
        else
            return getKeyCode($("#right_button").val());
    }
}


function getKeyCode(char) {
    var keyCode = char.charCodeAt(0);
    if(keyCode > 90) {  // 90 is keyCode for 'z'
      return keyCode - 32;
    }
    return keyCode;
  }