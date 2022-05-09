import { Ball } from "./GameObjects/Ball.js";
import { Enemy } from "./GameObjects/Enemy.js";
import { HUD } from "./GameObjects/HUD.js";
import { Player } from "./GameObjects/Player.js";
import { Wall } from "./GameObjects/Wall.js";
import { GetWallLayout, GetFreeIndexesArray, RemoveAndReturnRandomItemFromArray } from "./OtherFunctions.js";
import { PacmanSound } from "./audioPlayer.js";

// consts
const start_life = 5;
const enemies_positions = [
  [1, 1],
  [21, 21],
  [1, 21],
  [21, 1],
];
const keysDown = {};

// Arrows
let up_arrow;
let right_arrow;
let down_arrow;
let left_arrow;

// Game State Values
let interval;
let context;
let score = 0;
let life = start_life;
let start_time;
let time_elapsed;
let game_time;
let audio_player;

// Game Objects
let board;
let player;
let walls = [];
let enemies = [];
let eatables = [];
let hud;

window.StartGame = function (canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food, time) {
  Start(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food, time);
  // Start(canvas, 38, 39, 40, 37, "red", "green", "blue", 2, 50);
};

function Start(canvas, up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food, time) {
  //alert("game started");
  board;
  player;
  walls = [];
  enemies = [];
  eatables = [];
  hud;

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
  audio_player = new PacmanSound();
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
  let free_indexes = GetFreeIndexesArray(board);
  let player_position = RemoveAndReturnRandomItemFromArray(free_indexes);
  player = new Player(player_position.x, player_position.y, board);
  board[player_position.x][player_position.y] = 3;
  for (let i = 0; i < number_of_enemies; i++) {
    enemies.push(
      new Enemy(enemies_positions[i][0], enemies_positions[i][1], board, player)
    );
  }
  for (let i = 0; i < number_of_food * 0.6; i++) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatables.push(new Ball(position.x, position.y, ball_5_color, 5));
  }
  for (let i = 0; i < number_of_food * 0.3; i++) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatables.push(new Ball(position.x, position.y, ball_15_color, 15));
  }
  for (let i = 0; i < number_of_food * 0.1; i++) {
    let position = RemoveAndReturnRandomItemFromArray(free_indexes);
    eatables.push(new Ball(position.x, position.y, ball_25_color, 25));
  }
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

  interval = setInterval(GameLoop, 250);
  audio_player.Play("opening");
}

function GameLoop() {
  if (life != 0 && time_elapsed < game_time) {
    Tick();
    Collision();
    Render();
  } else {
    window.clearInterval(interval);
    if (life == 0) {
      window.alert("Loser!");
    } else if (time_elapsed >= game_time) {
      if (score < 100) {
        window.alert(`You are better then ${score} points!`);
      } else {
        window.alert("Winner!!!");
      }
    }
  }
}

function Tick() {
  HandlePlayerMovement();
  HandleScore();
  HandleTime();
  eatables.forEach((eatable) => {
    eatable.Tick();
  });
  enemies.forEach((enemy) => {
    enemy.Tick();
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
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  walls.forEach((wall) => {
    wall.Render(context);
  });
  eatables.forEach((eatable) => {
    eatable.Render(context);
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
    if (player.IsColide(eatables[i])) {
      audio_player.Play("eat");
      score += eatables[i].points;
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
    } else {
      audio_player.Play("die");
    }
  }
}
