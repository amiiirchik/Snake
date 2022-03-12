"use strict";

let game;   //Луп игры

function GameStartSoloPlayer1() {

	let canvas = document.getElementById('canvas');
	console.log(canvas);
	let context = canvas.getContext('2d');
	let score_p = document.getElementById('score-player1');

	let bg = new Image();
	bg.src = "../img/bg.jpg";
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
		if (e.keyCode == 37 && flag != 'right') {
			flag = 'left';
		} else if (e.keyCode == 38 && flag != 'down') {
			flag = 'up';
		} else if (e.keyCode == 39 && flag != 'left') {
			flag = 'right';
		} else if (e.keyCode == 40 && flag != 'up') {
			flag = 'down';
		}
	}

	function TailReset(head, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (head.x == arr[i].x && head.y == arr[i].y) {
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
			context.fillStyle = "red";
			context.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
		}

		score_p.innerHTML = score;           //Очки

		let snakeHeadX = snake[0].x;
		let snakeHeadY = snake[0].y;

		// При поедании яблока
		if (snakeHeadX == apple.x && snakeHeadY == apple.y) {
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
			 

		
		} else snake.pop();



		// При поедании банана
		if (snakeHeadX == banana.x && snakeHeadY == banana.y) {
			date.setSeconds(seconds + 5);
			banana = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		// При поедании камня
		if (snakeHeadX == stone.x && snakeHeadY == stone.y) {
			TakeDmg(5);

			stone = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (snakeHeadX == stone2.x && snakeHeadY == stone2.y) {
			TakeDmg(5);

			stone2 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (snakeHeadX == stone3.x && snakeHeadY == stone3.y) {
			TakeDmg(5);

			stone3 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (snakeHeadX == stone4.x && snakeHeadY == stone4.y) {
			TakeDmg(5);

			stone4 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (score < 0) {
			RestartGame();
		}

		// Движение
		if (flag == 'left') snakeHeadX -= cellSize;
		if (flag == 'right') snakeHeadX += cellSize;
		if (flag == 'up') snakeHeadY -= cellSize;
		if (flag == 'down') snakeHeadY += cellSize;

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

	// Функций дамага
	function TakeDmg(damage){
		score -= damage;
		snake.splice(snake.length - damage, damage);
	}


	function RestartGame() {
		alert(`Вы проиграли. Очков: ${score}`);
		clearInterval(game);
		score_p.textContent = '';
		score_p.textContent = 'Вы проиграли';
		reload_interval();
	}

	//Проверка на выход из поля


//Перезагружает страницу спустя n-время;
	function reload_interval() {
		setTimeout(()=>{ location.reload(); }, 4000);
	}

	game = setInterval(Game, 100);
}