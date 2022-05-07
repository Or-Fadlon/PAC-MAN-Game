import {Ball} from "./GameObjects/Ball.js";
import {Enemy} from "./GameObjects/Enemy.js";
import {Player} from "./GameObjects/Player.js";
import {Wall} from "./GameObjects/Wall.js";
import {GetWallLayout, GetFreeIndexesArray, RemoveAndReturnRandomItemFromArray} from "./OtherFunctions.js";

// Game State Values
var interval;
var context;
var score = 0;
var start_time;
var time_elapsed;
var game_state = false;
const keysDown = {};
var up_arrow;
var right_arrow;
var down_arrow;
var left_arrow;

// Game Objects
var enemies_positions = [[1, 1], [21, 21], [1, 21], [21, 1]];
var board;
var player;
var walls = [];
var enemies = [];
var eatables = [];


window.StartGame = function (canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food) {
    Start(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food);
    // Start(canvas, 38, 39, 40, 37, "red", "green", "blue", 2, 50);
}


function Start(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food) {
    alert("game started");
    context = canvas.getContext("2d");
    // arrows
    up_arrow = up;
    right_arrow = right;
    down_arrow = down;
    left_arrow = left;

    // Game Objects
    board = GetWallLayout();
    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == 1) {
                walls.push(new Wall(j, i));
            }
        }
    }
    for (let i = 0; i < number_of_enemies; i++) {
        board[enemies_positions[i][0]][enemies_positions[i][1]] = 2;
    }
    let free_indexes = GetFreeIndexesArray(board);
    let player_position = RemoveAndReturnRandomItemFromArray(free_indexes);
    player = new Player(player_position.x, player_position.y, board);
    board[player_position.x][player_position.y] = 3;
    for (let i = 0; i < number_of_enemies; i++) {
        enemies.push(new Enemy(enemies_positions[i][0], enemies_positions[i][1], board, player));
    }
    for (let i = 0; i < number_of_food * 0.6; i++) {
        let position = RemoveAndReturnRandomItemFromArray(free_indexes);
        eatables.push(new Ball(position.x, position.y, ball_5_color, 5))
    }
    for (let i = 0; i < number_of_food * 0.3; i++) {
        let position = RemoveAndReturnRandomItemFromArray(free_indexes);
        eatables.push(new Ball(position.x, position.y, ball_15_color, 15))
    }
    for (let i = 0; i < number_of_food * 0.1; i++) {
        let position = RemoveAndReturnRandomItemFromArray(free_indexes);
        eatables.push(new Ball(position.x, position.y, ball_25_color, 25))
    }

    score = 0;
    start_time = new Date();
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);

    game_state = true;

    interval = setInterval(GameLoop, 250);
}

function GameLoop() {
    if (game_state) {
        Tick();
        Collision();
        Render();
    } else {
        window.clearInterval(interval);
        if (score == 50) {
            window.alert("Game completed");
        }
    }
}

function Tick() {
    HandlePlayerMovement();
    HandleScore();
    HandleTime();
    eatables.forEach(eatable => {
        eatable.Tick()
    });
    enemies.forEach(enemy => {
        enemy.Tick()
    });
    player.Tick();
}

function HandlePlayerMovement() {
    player.stop();
    if (keysDown[up_arrow]) {
        player.up();
    }
    if (keysDown[right_arrow]) {
        player.right();
    }
    if (keysDown[down_arrow]) {
        player.down();
    }
    if (keysDown[left_arrow]) {
        player.left();
    }
}

function HandleScore() {
// TODO: add logic
}

function HandleTime() {
    time_elapsed = (new Date() - start_time) / 1000;
}

function Render() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    walls.forEach(wall => {
        wall.Render(context)
    });
    eatables.forEach(eatable => {
        eatable.Render(context)
    });
    enemies.forEach(enemy => {
        enemy.Render(context)
    });
    player.Render(context);
}

function Collision() {
    for (let i = 0; i < eatables.length; i++) {
        if (player.IsColide(eatables[i])) {
            score += eatables[i].points
            eatables.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        if (player.IsColide(enemies[i])) {
            GhostCollisionHandler();
            break;
        }
    }

    function GhostCollisionHandler() {
        let free_indexes = GetFreeIndexesArray(board);
        let player_position = RemoveAndReturnRandomItemFromArray(free_indexes);
        player.x = player_position.x;
        player.y = player_position.y;
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].x = enemies_positions[i][0];
            enemies[i].y = enemies_positions[i][1];
        }

        score -= 10;
    }
}
