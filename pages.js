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
        $("#settings_div").hide();;
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

    // $("#start_game_button").click(function () {
    //     $("#welcome_div").hide();
    //     $("#register_div").hide();
    //     $("#login_div").hide();
    //     $("#settings_div").hide();
    //     $("#about_div").hide();
    //     $("#game_div").show();
    // });
    
    var new_user = {username:"k", password:"k", firstName: "k", lastName: "k", email: "k@k.com", birthdate: "22/02/2022" };
    all_users = new Array(new_user);


});