var is_valid;

function check_details() {
    is_valid = true;
    var username = $("#F_username").val();
    var password = $("#F_password").val();
    var repeat_password = $("#F_repeat_password").val();
    var first_name = $("#F_firstName").val();
    var last_name = $("#F_lastName").val();
    var email = $("#F_email").val();
    var date = $("#F_date").val();
    check_empty_fields_func(username, password, repeat_password, first_name, last_name, email, date);
    if(!is_valid)
        return;
    general_check(password, new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/),"This password is invalid:" + "\n" + "-Password must be at least 6 characters" + "\n" +
    "-Password must contain both letters and numbers");
    check_repeat_password(password, repeat_password);
    general_check(first_name, new RegExp(/^[a-zA-Z]*$/), "your firstname is invalid - you can use only alphabetic letters");
    general_check(last_name, new RegExp(/^[a-zA-Z]*$/),  "your lastname is invalid - you can use only alphabetic letters");
    general_check(email, new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/), "This email is invalid!, please choose other valid email address :)");
    check_username(username);
    if (is_valid) {

        var new_user = {
            username: username,
            password: password,
            firstName: first_name,
            lastName: last_name,
            email: email,
            birthdate: date
        };
        window.localStorage.setItem(username, JSON.stringify(new_user));
        curr_user = new_user;
        $("#welcome_div").hide();
        $("#register_div").hide();
        $("#login_div").show();
        $("#settings_div").hide();
        $("#about_div").hide();
        $("#settings_div").hide();
        $("#game_div").hide();
    }
}

function check_empty_fields_func(username, password, repeat_password, first_name, last_name, email, date) {
    if (username === '' || password === '' || repeat_password === '' || first_name === '' || last_name === '' || email === '' || date === '') {
        alert("all fields must be filled!");
        is_valid = false;
    }
}

function general_check(password, pattern, aler) {
    if (pattern.test(password) == false) {
        alert(aler);
        is_valid = false;
    }
}

function check_repeat_password(password, repeat_password) {
    if (repeat_password != password) {
        alert("your repeated password dosent match your first password.");
        is_valid = false;
    }
}


function check_username(username) {

    if(window.localStorage.getItem(username)){
        alert("This username allready exists!, please choose another username :)");
        is_valid = false;
    }
}

function login() {

    var is_user_found = false;
    var username = $("#login_username").val();
    var password = $("#login_pass").val();


    let u = JSON.parse(window.localStorage.getItem(username));
    if(u){
        if (u.password == password) {
            is_user_found = true;
            curr_user = u;
        }

    }

    if (is_user_found == true) {
        $("#one").hide();
        $("#two").show(); 
        $("#welcome_div").hide();
        $("#register_div").hide();
        $("#login_div").hide();
        $("#settings_div").hide();
        $("#about_div").hide();
        $("#settings_div").show();
        $("#game_div").hide();
    } else {
        alert("Your username or password are incorrect! please try again :)");
    }
}

function random_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function get_random_color() {
    var color_letters = '0123456789ABCDEF';
    var hashtag = '#';
    for (var i = 0; i <= 5; i++) {
        hashtag += color_letters[Math.floor(Math.random() * 16)];
    }
    return hashtag;
}

function random_settings() {
    document.getElementById("pac_dots_num_settings").value = random_num(50, 90);
    document.getElementById("5_color").value = get_random_color();
    document.getElementById("15_color").value = get_random_color();
    document.getElementById("25_color").value = get_random_color();
    document.getElementById("time_setting").value = Math.floor(Math.random() * 100 + 61);
    document.getElementById("monster_setting").value = random_num(1, 4);
}


function check_settings() {
    var pac_dots_num = $("#pac_dots_num_settings").val();
    var time_sec = $("#time_setting").val();
    var monsters_num = $("#monster_setting").val();

    if (pac_dots_num == '' || pac_dots_num < 50 || pac_dots_num > 90) {
        alert("Pac dots input is invalid - choose a number between 50-90.");
        return false;
    } else if (time_sec == '' || time_sec < 60) {
        alert("Time input is invalid - choose a number more than 60.");
        return false;
    } else if (monsters_num == '' || monsters_num < 1 || monsters_num >= 5) {
        alert("Monsters num input is invalid - choose a number between 1-4.");
        return false;
    } else
        return true;
}

function go_to_settings(){
    let arr = ["#welcome_div", "#register_div", "#login_div", "#settings_div", "#about_div", "#game_div"];
        arr.forEach(element => {
            if (element == "#settings_div") $(element).show();
            else $(element).hide();
        });
    $(paceman_img).show();
    $(names).show();
    $(function() {
        $("header").show();
        $("content").show()
    });
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

}



