import { Ball } from "./GameObjects/Ball.js";
import { EatableClock } from "./GameObjects/EatableClock.js";
import { EatablePill } from "./GameObjects/EatablePill.js";
import { Enemy } from "./GameObjects/Enemy.js";
import { HUD } from "./GameObjects/HUD.js";
import { MovingEatable } from "./GameObjects/MovingEatable.js";
import { Player } from "./GameObjects/Player.js";
import { Wall } from "./GameObjects/Wall.js";
import { PacmanSound } from "./audioPlayer.js";
import { GamePopUp } from "./GameObjects/GamePopUp.js";
import { GetWallLayout, GetFreeIndexesArray, RemoveAndReturnRandomItemFromArray } from "./OtherFunctions.js";

// consts
const interval_time = 150;
const start_life = 5;
const enemies_positions = [
  [1, 1],
  [21, 21],
  [1, 21],
  [21, 1],
];
const enemies_color = [
  "#FF3100",
  "#00FCFF",
  "#FFA1CD",
  "#FFCC00",
];
const keysDown = {};
const audio_player = new PacmanSound();
const life_spawn_chench = 2;

// Arrows
let up_arrow;
let right_arrow;
let down_arrow;
let left_arrow;

// Game State Values
let interval;
let context;
let free_indexes = [];
let score = 0;
let life = start_life;
let start_time;
let time_elapsed;
let game_time;

// Game Objects
let board;
let player;
let walls = [];
let enemies = [];
let eatables = [];
let extra_eatables = [];
let eatable_clocks = [];
let hud;

window.StartGame = function (canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food, time) {
  Start(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food, time);
  // Start(canvas, 38, 39, 40, 37, "red", "green", "blue", 2, 50);
};

window.GameMuteToggle = function () {
  audio_player.MuteToggle();
};

function Start(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food, time) {
  // if (!((1 <= number_of_enemies && number_of_enemies <= 4) &&
  // (50 <= number_of_food && number_of_food <= 90) &&
  // (time >= 60))) {
  //   console.log("invalid inputs to the game!");
  //   return;
  // }

  if (interval != null) {
    Stop();
  }


  //alert("game started");
  board = [];
  player = null;
  walls = [];
  enemies = [];
  eatables = [];
  extra_eatables = [];
  eatable_clocks = [];
  hud = null;

  // Game Variabels
  context = canvas.getContext("2d");
  up_arrow = up;
  right_arrow = right;
  down_arrow = down;
  left_arrow = left;
  life = start_life;
  score = 0;
  game_time = time;
  start_time = new Date();
  time_elapsed = 0;
  ///

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
  free_indexes = GetFreeIndexesArray(board);
  let player_position = RemoveAndReturnRandomItemFromArray(free_indexes);
  player = new Player(player_position.x, player_position.y, walls);
  board[player_position.x][player_position.y] = 3;
  for (let i = 0; i < number_of_enemies; i++) {
    enemies.push(
      new Enemy(enemies_positions[i][0], enemies_positions[i][1], walls, player, board, enemies_color[i])
    );
  }
  let number_of_5_balls = number_of_food * 0.6;
  let number_of_15_balls = number_of_food * 0.3;
  let number_of_25_balls = number_of_food * 0.1;
  if (number_of_5_balls % 1 > number_of_15_balls % 1 && number_of_5_balls % 1 > number_of_25_balls % 1 ){
    number_of_5_balls += 1
  } else if (number_of_15_balls % 1 > number_of_5_balls % 1 && number_of_15_balls % 1 > number_of_25_balls % 1 ){
    number_of_15_balls += 1
  } else if (number_of_25_balls % 1 > number_of_5_balls % 1 && number_of_25_balls % 1 > number_of_15_balls % 1 ){
    number_of_25_balls += 1
  }
  number_of_5_balls = Math.floor(number_of_5_balls);
  number_of_15_balls = Math.floor(number_of_15_balls);
  number_of_25_balls = Math.floor(number_of_25_balls);
  for (let i = 0; i < number_of_5_balls; i++) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatables.push(new Ball(position.x, position.y, ball_5_color, 5));
  }
  for (let i = 0; i < number_of_15_balls; i++) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatables.push(new Ball(position.x, position.y, ball_15_color, 15));
  }
  for (let i = 0; i < number_of_25_balls; i++) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatables.push(new Ball(position.x, position.y, ball_25_color, 25));
  }
  extra_eatables.push(new MovingEatable(11, 11, walls));
  hud = new HUD(board[0].length, board.length);
  ///

  // key listeners
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.keyCode] = false;
    },
    false
  );
  ///

  interval = setInterval(GameLoop, interval_time);
  audio_player.Play("opening");
}

function Stop() {
  audio_player.Stop();
  window.clearInterval(interval);
}

function GameLoop() {
  if (life != 0 && time_elapsed < game_time && eatables.length != 0) {
    Tick();
    Collision();
    Render();
  } else {
    Stop();
    let message = "default!";
    if (life == 0) {
      message = "Loser!";
    } else if (time_elapsed >= game_time || eatables.length == 0) {
      if (score < 100) {
        message = `You are better then ${score} points!`;
      } else {
        message = "Winner!!!";
      }
    }
    new GamePopUp(message).Render(context);
  }
}

function Tick() {
  HandlePlayerMovement();
  HandleTime();
  eatables.forEach((eatable) => {
    eatable.Tick();
  });
  extra_eatables.forEach((extra_eatable) => {
    extra_eatable.Tick();
  });
  eatable_clocks.forEach((clock) => {
    clock.Tick();
  });
  enemies.forEach((enemy) => {
    enemy.Tick();
  });
  player.Tick();
}

function HandlePlayerMovement() {
  if (keysDown[up_arrow]) {
    player.Up();
  }
  if (keysDown[right_arrow]) {
    player.Right();
  }
  if (keysDown[down_arrow]) {
    player.Down();
  }
  if (keysDown[left_arrow]) {
    player.Left();
  }
}

function HandleTime() {
  time_elapsed = (new Date() - start_time) / 1000;

  let time = game_time - time_elapsed >= 0 ? game_time - time_elapsed : 0;
  if (time <= 15 && eatable_clocks.length == 0) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatable_clocks.push(new EatableClock(position.x, position.y));
  }
}

function Render() {
  canvas.width = canvas.width; //clean board
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  walls.forEach((wall) => {
    wall.Render(context);
  });
  eatables.forEach((eatable) => {
    eatable.Render(context);
  });
  extra_eatables.forEach((extra_eatable) => {
    extra_eatable.Render(context);
  });
  eatable_clocks.forEach((clock) => {
    clock.Render(context);
  });
  enemies.forEach((enemy) => {
    enemy.Render(context);
  });
  player.Render(context);

  let time = game_time - time_elapsed >= 0 ? game_time - time_elapsed : 0;
  hud.Render(context, score, life, time);
}

function Collision() {
  for (let i = 0; i < eatables.length; i++) {
    if (player.IsCollide(eatables[i])) {
      audio_player.Play("eat");
      score += eatables[i].points;
      eatables.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < extra_eatables.length; i++) {
    if (player.IsCollide(extra_eatables[i])) {
      audio_player.Play("eat_power_up");
      if (extra_eatables[i].eatable_type == "pill") {
        life += extra_eatables[i].life;
      } else if (extra_eatables[i].eatable_type == "moving") {
        score += extra_eatables[i].points;
      }
      extra_eatables.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < eatable_clocks.length; i++) {
    if (player.IsCollide(eatable_clocks[i])) {
      audio_player.Play("eat_clock");
      game_time += eatable_clocks[i].time;
      eatable_clocks.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    if (player.IsCollide(enemies[i])) {
      GhostCollisionHandler();
      break;
    }
  }

  function GhostCollisionHandler() {
    score -= 10;
    life -= 1;
    if (life > 0) {
      let free_indexes = GetFreeIndexesArray(board);
      let player_position = RemoveAndReturnRandomItemFromArray(free_indexes);
      player.x = player_position.x;
      player.y = player_position.y;
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].x = enemies_positions[i][0];
        enemies[i].y = enemies_positions[i][1];
      }
      if (Math.floor(Math.random() * life_spawn_chench) == 0) {
        let position = RemoveAndReturnRandomItemFromArray(free_indexes);
        extra_eatables.push(new EatablePill(position.x, position.y));
      }
    } else {
      audio_player.Play("die");
    }
  }
}
