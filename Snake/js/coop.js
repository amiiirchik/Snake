'use strict';

function GameStartCoopPlayers() {

	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');
	let score_p1 = document.querySelector('#score-player1');
	let score_p2 = document.querySelector('#score-player2');

	let bg = new Image();
	bg.src = "../img/bg.jpg";
	let foodApple = new Image();
	foodApple.src = "../img/apple.png";
	let foodBanana = new Image();
	foodBanana.src = "../img/banana.png";
	let debuff_stone = new Image();
	debuff_stone.src = "../img/stone.png";
	let debuff_stone2 = new Image();
	debuff_stone2.src = "../img/stone.png";
	let buff_divide = new Image();
	buff_divide.src = "../img/divided.png";

	let player1_score = 1,
		player2_score = 1,
		cellSize = 32,
		gameInterval = 100,
		flag;


	// score_p2.classList.remove('none');

// Спавн яблока
	let apple = {
		x: RandomNum(1, 30) * cellSize,
		y: RandomNum(1, 25) * cellSize
	}

	let divide = {
		x: RandomNum(1, 2) * cellSize,
		y: RandomNum(1, 2) * cellSize
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

	let snake = [];

	snake[0] = {           //Голова змеи
		x: 3 * cellSize,
		y: 7 * cellSize
	};

	let snake2 = [];

	snake2[0] = {           //Голова змеи2
		x: 10 * cellSize,
		y: 12 * cellSize
	};

	let snakeHeadX = snake[0].x;
	let snakeHeadY = snake[0].y;
	let snake2HeadX = snake2[0].x;
	let snake2HeadY = snake2[0].y;

	document.addEventListener('keydown', control);
	document.addEventListener('keydown', control2);


	snakeHeadX += cellSize;
	snake2HeadX += cellSize;

// Кнопки первой змеи
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

// Кнопки второй змеи
	let flag2;

	function control2(e2) {
		if (e2.keyCode == 65 && flag2 != 'right') {
			flag2 = 'left';
		} else if (e2.keyCode == 68 && flag2 != 'left') {
			flag2 = 'right';
		} else if (e2.keyCode == 87 && flag2 != 'down') {
			flag2 = 'up';
		} else if (e2.keyCode == 83 && flag2 != 'up') {
			flag2 = 'down';
		}
	}

	function Game() {
		context.drawImage(bg, 0, 0);
		context.drawImage(foodApple, apple.x, apple.y);
		context.drawImage(foodBanana, banana.x, banana.y);
		context.drawImage(debuff_stone, stone.x, stone.y);
		context.drawImage(debuff_stone, stone2.x, stone2.y);

		for (let i = 0; i < snake.length; i++) {
			context.fillStyle = "red";
			context.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
		}
		score_p1.innerHTML = `Первый игрок: ${player1_score}`;
		score_p2.innerHTML = `Второй игрок: ${player2_score}`;

		// При поедании яблока
		if (snakeHeadX == apple.x && snakeHeadY == apple.y) {
			player1_score++;
			apple = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}


			fetch('http://snake/ajax.php',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8' 
				},
				body: JSON.stringify({
					user: p_player1.textContent,
					entity: {
						type: 'Apple',
						coords: {
							x: apple.x,
							y: apple.y
						}
					}
				})
			})

		} else snake.pop();

		setInterval(()=>{
			fetch('http://snake/ajax.php')
			.then(response => response.json())
			.then(json => console.log(json))
		}, 1000)

		// При поедании банана
		if (snakeHeadX == banana.x && snakeHeadY == banana.y) {
			//+ 5 секунд
			banana = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		// При поедании камня
		if (snakeHeadX == stone.x && snakeHeadY == stone.y) {
			player1_score -= 5;
			snake.splice(1, 5);
			stone = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (snakeHeadX == stone2.x && snakeHeadY == stone2.y) {
			player1_score -= 5;
			snake.splice(1, 5);
			stone2 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
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


		// Вторая змейка

		let context2 = canvas.getContext('2d');


		for (let i = 0; i < snake2.length; i++) {
			context2.fillStyle = "green";
			context2.fillRect(snake2[i].x, snake2[i].y, cellSize, cellSize);
		}

		if (snake.length == 10 || snake2.length == 10) {
			context.drawImage(buff_divide, divide.x, divide.y);
		}

		if (snakeHeadX == divide.x && snakeHeadY == divide.y) {
			player1_score -= 2;
			player2_score /= 2;
			// context.clearRect(buff_divide, divide.x, divide.y);
		}

		if (snake2HeadX == divide.x && snake2HeadY == divide.y) {
			player2_score -= 2;
			player1_score /= 2;
			// context.clearRect(buff_divide, divide.x, divide.y);
		}

		// При поедании яблока
		if (snake2HeadX == apple.x && snake2HeadY == apple.y) {
			player2_score++;
			apple = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}

			fetch('http://snake/ajax.php')
			.then((response) => {
				return response;
			})
			.then((data) => {
				console.log(p_player2.textContent + ' съел яблоко!');
			})

		} else snake2.pop();

		// При поедании банана
		if (snake2HeadX == banana.x && snake2HeadY == banana.y) {
			//+ 5 секунд
			banana = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		// При поедании камня
		if (snake2HeadX == stone.x && snake2HeadY == stone.y) {
			player2_score -= 5;
			snake2.splice(1, 5);
			stone = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (snake2HeadX == stone2.x && snake2HeadY == stone2.y) {
			player2_score -= 5;
			snake2.splice(1, 5);
			stone2 = {
				x: RandomNum(1, 30) * cellSize,
				y: RandomNum(1, 25) * cellSize
			}
		}

		if (player1_score <= 0) {
			alert(`Игрок ${x} победил со счетом ${player2_score}!`);
			RestartGame();
		} else if (player2_score <= 0) {
			alert(`Игрок ${x} победил со счетом ${player1_score}!`);
			RestartGame();
		}

		if (snake2HeadX == snakeHeadX && snake2HeadY == snakeHeadY) {
			if (player1_score > player2_score) {
				alert(`Игрок ${x} победил со счетом ${player1_score}!`);
				RestartGame();
			}
			if (player2_score > player1_score) {
				alert(`Игрок ${x} победил со счетом ${player2_score}!`);
				RestartGame();
			}
		}

		// Движение второй змейки
		if (flag2 == 'left') snake2HeadX -= cellSize;
		if (flag2 == 'right') snake2HeadX += cellSize;
		if (flag2 == 'up') snake2HeadY -= cellSize;
		if (flag2 == 'down') snake2HeadY += cellSize;

		let newHead2 = {
			x: snake2HeadX,
			y: snake2HeadY
		}

		TailReset(newHead2, snake2);
		snake2.unshift(newHead2);
	}

	function RandomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

// Кнопка заново
	function RestartGame() {
		clearInterval(game);
		reload_interval()
	}

// Проверка на съедание хвоста
	function TailReset(head, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (head.x == arr[i].x && head.y == arr[i].y) {
				RestartGame();
			}
		}
	}


	//Перезагружает страницу спустя n-время;
	function reload_interval() {
		setTimeout(function () {
			location.reload();
		}, 4000);
	}


	let game = setInterval(Game, 100);
}