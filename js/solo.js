"use strict";

let scoreWindowContainer = document.getElementById('scoreWindowContainer');
let returnMainMenuButton = document.getElementById('returnMainMenuButton');
let retryButton = document.getElementById('retryButton');
let playerRecord = document.getElementById('playerRecord');
let playerScore = document.getElementById('playerScore');
let record = 0;

function GameStartSoloPlayer1()
{
	retryButton.removeEventListener('click', GameStartSoloPlayer1);
	scoreWindowContainer.classList.add('hidden');
	// document.location.reload();

	let mainGameMenuContainer = document.getElementById('mainGameMenuContainer');
	mainGameMenuContainer.classList.add('hidden');
	let canvas = document.getElementById('canvas');
	let GameField = document.getElementById('GameField');
	GameField.classList.remove('hidden');
	selectDifficultyMenu.classList.add('hidden');
	mainGameMenuContainer.classList.add('hidden');
	gameTimer();
	console.log(canvas);
	let context = canvas.getContext('2d');
	let score_p = document.getElementById('playerScore1');

	let bg = new Image();
	bg.src = "../img/bg.jpg";
// let bg = new Image(); bg.src = "../bg.jpg";
	let foodApple = new Image();
	foodApple.src = "../img/apple.png";
	let foodBanana = new Image();
	foodBanana.src = "../img/banana.png";
	let debuff_stone = new Image();
	debuff_stone.setAttribute('src', '../img/stone.png')
	let debuff_stone2 = new Image();
	debuff_stone2.src = "../img/stone.png";
	let debuff_stone3 = new Image();
	debuff_stone3.src = "../img/stone.png";
	let debuff_stone4 = new Image();
	debuff_stone4.src = "../img/stone.png";


	let score = 0,
		cellSize = 32,
		gameInterval = 100,
		flag;

// Спавн яблока
	let apple = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

// Спавн банана
	let banana = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

// Спавн камня
	let stone = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

	let stone2 = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

	let stone3 = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

	let stone4 = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

	let snake = [];

	snake[0] = {           //Голова змеи
		x: 3 * cellSize,
		y: 7 * cellSize
	};

	document.addEventListener('keydown', control);

	function control(e) {
		if (e.keyCode === 37 && flag !== 'right') {
			flag = 'left';
		} else if (e.keyCode === 38 && flag !== 'down') {
			flag = 'up';
		} else if (e.keyCode === 39 && flag !== 'left') {
			flag = 'right';
		} else if (e.keyCode === 40 && flag !== 'up') {
			flag = 'down';
		}
	}

	function TailReset(head, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (head.x === arr[i].x && head.y === arr[i].y) {
				RestartGame();
			}
		}
	}

	function Game() {
		context.drawImage(bg, 0, 0);
		context.drawImage(foodApple, apple.x, apple.y);
		context.drawImage(foodBanana, banana.x, banana.y);
		context.drawImage(debuff_stone, stone.x, stone.y);
		context.drawImage(debuff_stone2, stone2.x, stone2.y);
		context.drawImage(debuff_stone3, stone3.x, stone3.y)
		context.drawImage(debuff_stone4, stone4.x, stone4.y);


		for (let i = 0; i < snake.length; i++) {
			context.fillStyle = "#005565";
			context.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
		}
		score_p.innerHTML = `СЧЁТ: ${score}`;                       //Очки

		let snakeHeadX = snake[0].x;
		let snakeHeadY = snake[0].y;

		// При поедании яблока
		if (snakeHeadX === apple.x && snakeHeadY === apple.y) {
			record++;
			score++;
			apple = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
			stone = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
			stone2 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
			stone3 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
			stone4 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
			fetch()
		} else snake.pop();

		// При поедании банана
		if (snakeHeadX === banana.x && snakeHeadY === banana.y) {
			//+ 5 секунд
			banana = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		// При поедании камня
		if (snakeHeadX === stone.x && snakeHeadY === stone.y) {
			score -= 5;
			stone = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
			snake.splice(snake.length - 5,5);
			console.log(snake.length);
		}

		if (snakeHeadX === stone2.x && snakeHeadY === stone2.y) {
			score -= 5;
			stone2 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (snakeHeadX === stone3.x && snakeHeadY === stone3.y) {
			score -= 5;
			stone3 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}


		if (score < 0) {
			RestartGame();
		}

		// Движение
		if (flag === 'left') snakeHeadX -= cellSize;
		if (flag === 'right') snakeHeadX += cellSize;
		if (flag === 'up') snakeHeadY -= cellSize;
		if (flag === 'down') snakeHeadY += cellSize;

		let newHead = {
			x: snakeHeadX,
			y: snakeHeadY
		}

		TailReset(newHead, snake);
		snake.unshift(newHead);
	}

	function RandomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}


	function RestartGame() {
		clearInterval(game);
		playerRecord.textContent = 'ВАШ РЕКОРД: ' + record;
		playerScore.textContent = 'ВАШ СЧЁТ: ' + record;
		scoreWindowContainer.classList.remove('hidden');
		// score_p.textContent = '';
		// score_p.textContent = 'ИГРА ОКОНЧЕНА!';
		// let reloadGame = setTimeout(ReloadInterval, 5000);
		retryButton.addEventListener('click', GameStartSoloPlayer1);
		returnMainMenuButton.addEventListener('click', Reload);
		//function again()
		//{
		//	  clearTimeout(reloadGame);
		//}
		// document.body.appendChild(retryButton);
	}


//Перезагружает страницу спустя n-время;
	function Reload()
	{
		location.reload();
	}
	let game = setInterval(Game, 100);
}