import { Ball } from "./GameObjects/Ball";
import { Eatable } from "./GameObjects/Eatable";
import { Enemy } from "./GameObjects/Enemy";
import { GameObject } from "./GameObjects/GameObject";
import { Moveable } from "./GameObjects/Moveable";
import { Player } from "./GameObjects/Player";
import { Wall } from "./GameObjects/Wall";
import { GetWallLayout, GetFreeIndexesArray, RemoveAndReturnRandomItemFromArray} from "./OtherFunctions.js";

// enum for objects
const ball_5_points = 1;
const ball_15_points = 2;
const ball_25_points = 3;
const wall = 4;
const pacman = 5;

// board
const board_width = 23;
const board_height = 23;

// arrows
var up_arrow;
var right_arrow;
var down_arrow;
var left_arrow;

// Game Objects
var player;
var walls = [];
var enemies = [];
var eatables = [];

// key down dict
const keysDown = {};

// game_state
var game_state = false;

var enemies_positions = [[1, 1],[21,21],[1,21],[21,1]];
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

$(document).ready(function() {
	context = canvas.getContext("2d");
	start();
});

function Start(up, right, down, left, ball_5_color, ball_15_color, ball_25_color, number_of_enemies, number_of_food)
{
	// arrows
	up_arrow = up;
	right_arrow = right;
	down_arrow = down;
	left_arrow = left;

	// Game Objects
	board = GetWallLayout();
	for (let i = 0; i < board[0].length; i++) {
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] == 1){
				walls.push(new Wall(i, j));
			}
		}
	}
	board[player_x, player_y] = 1;
	for (let i = 0; i < number_of_enemies; i++)
	{
		enemies.push(new Enemy(enemies_positions[i][0], enemies_positions[i][1]));
		board[enemies_positions[i][0], enemies_positions[i][1]] = 1;
	}
	let free_indexes = GetFreeIndexesArray(board);
	let player_position = RemoveAndReturnRandomItemFromArray(free_indexes);
	player = new Player(player_position.x, player_position.y);
	for (let i = 0; i < number_of_food*0.6; i++)
	{
	let position = RemoveAndReturnRandomItemFromArray(free_indexes);
	eatables.push(new Ball(position.x, position.y, ball_5_color, 5))
	}
	for (let i = 0; i < number_of_food*0.3; i++)
	{
	let position = RemoveAndReturnRandomItemFromArray(free_indexes);
	eatables.push(new Ball(position.x, position.y, ball_15_color, 15))
	}
	for (let i = 0; i < number_of_food*0.1; i++)
	{
	let position = RemoveAndReturnRandomItemFromArray(free_indexes);
	eatables.push(new Ball(position.x, position.y, ball_25_color, 25))
	}

	score = 0;
	start_time = new Date();
	addEventListener("keydown", function(e) { keysDown[e.keyCode] = true; }, false );
	addEventListener("keyup", function(e) { keysDown[e.keyCode] = false; }, false );

	game_state = true;

	interval = setInterval(GameLoop, 250);
}

function GameLoop() {
	if (game_state){
		Tick();
		Render();
		Collision();
	} else {
		window.clearInterval(interval);
		if (score == 50)
		{
			window.alert("Game completed");
		}
	}
}

function Tick()
{
	board[shape.i][shape.j] = 0;
	let x = GetKeyPressed();
	if (x == "up")
	{
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4)
		{
			shape.j--;
		}
	}
	if (x == 2)
	{
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4)
		{
			shape.j++;
		}
	}
	if (x == 3)
	{
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4)
		{
			shape.i--;
		}
	}
	if (x == 4)
	{
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4)
		{
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1)
	{
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10)
	{
		pac_color = "green";
	}
}

function GetKeyPressed() {
	if (keysDown[up_arrow]) {return "up";}
	if (keysDown[right_arrow]) {return "right";}
	if (keysDown[down_arrow]) {return "down";}
	if (keysDown[left_arrow]) {return "left";}
}

function Render() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < board_height; i++)
	{
		for (var j = 0; j < board_width; j++)
		{
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == pacman) //draw pacman
			{ 
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = "yellow"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == wall)
			{
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[i][j] == ball_5_points)
			{
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			}
			else if (board[i][j] == ball_15_points)
			{
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();
			}
			else if (board[i][j] == ball_25_points)
			{
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();
			}
		}
	}
}
