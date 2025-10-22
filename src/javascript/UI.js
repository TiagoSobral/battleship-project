import { populateBoard } from './gamecontroller.js';

export function renderBoard(playerBoard, currentPlayer) {
	const gameBoard = document.querySelector('.gameboard');
	const boardElm = document.createElement('div');
	boardElm.setAttribute('class', `${currentPlayer}`);
	gameBoard.appendChild(boardElm);
	for (let row = 0; row < playerBoard.length; row++) {
		const rowElm = document.createElement('ul');
		rowElm.setAttribute('class', `row`);
		boardElm.appendChild(rowElm);

		for (let col = 0; col < playerBoard[row].length; col++) {
			let contents = playerBoard[row][col];
			const colElm = document.createElement('li');
			colElm.setAttribute('class', `col`);
			colElm.setAttribute('data-row', `${row}`);
			colElm.setAttribute('data-col', `${col}`);
			rowElm.appendChild(colElm);
			if (typeof contents.value == 'object') {
				if (contents.hit == true) {
					colElm.setAttribute('hit', '');
				} else {
					colElm.textContent = 'B';
				}
				continue;
			}
			colElm.textContent = contents.value;
		}
	}
}

export function boardListener(playerObject, DomBoard = 'player-two') {
	const allSquares = document.querySelectorAll(`.${DomBoard} li`);
	allSquares.forEach((element) => {
		element.addEventListener('click', () => {
			playRound(playerObject, element);
		});
	});
}

export function playRound(playerObject, DomElement) {
	let row = DomElement.dataset.row;
	let col = DomElement.dataset.col;
	let coordinates = [row, col];
	playerObject.playerTwo.game.receiveAttack(coordinates);
	cpuPlays(playerObject);
	removeElements();
	populateBoard(playerObject.playerOne);
	populateBoard(playerObject.playerTwo);
	if (isGameOver(playerObject) != true) {
		boardListener(playerObject);
	}
}

function removeElements() {
	const boards = document.querySelectorAll('.gameboard div');
	boards.forEach((board) => {
		board.remove();
	});
}

function cpuPlays(playerObject) {
	let opponent = playerObject.playerOne.game;
	let row = randomizeNumber();
	let col = randomizeNumber();
	/* the query selector has a +1 since the DOM doesn't have a 0 
	 but the arrays have*/
	let square = document.querySelector(
		`.player-one > .row:nth-child(${row + 1}) > .col:nth-child(${col + 1}) `
	);
	while (square.textContent == 'X' || square.classList.contains('hit')) {
		row = randomizeNumber();
		col = randomizeNumber();
	}
	opponent.receiveAttack([row, col]);
}

function randomizeNumber() {
	/* same with cpuPlays, the minimum has to be 1 cause the DOM has no 0 */
	return Math.floor(
		Math.random() * (Math.floor(10) - Math.ceil(1)) + Math.ceil(1)
	);
}

function isGameOver(playerObject) {
	let playerOneBoatsAreSunk = playerObject.playerOne.game.allSunk();
	let cpuBoatsAreSunk = playerObject.playerTwo.game.allSunk();
	const gameStatusElm = document.querySelector('.player-indication');
	let gameIsOver = false;
	if (playerOneBoatsAreSunk == 'Game Over!') {
		gameStatusElm.textContent = `${playerOneBoatsAreSunk} ${playerObject.playerTwo.name} Won!`;
		return (gameIsOver = true);
	} else if (cpuBoatsAreSunk == 'Game Over!') {
		gameStatusElm.textContent = `${cpuBoatsAreSunk} ${playerObject.playerOne.name} Won!`;
		return (gameIsOver = true);
	} else {
		return gameIsOver;
	}
}

/* 
things to add:
- every li that has a ship should have a class called ship for styling and
removing the B or S from the board and when hit it can change color or add emoji.
*/

/* 
code for a second player
	let playerName = DomElement.parentElement.parentElement.classList[0];
	let sibling;
	if (playerName == 'player-one') {
		playerObject.playerOne.game.receiveAttack(coordinates);
		sibling = 'player-two';
	} else {
		playerObject.playerTwo.game.receiveAttack(coordinates);
		sibling = 'player-one';
	} 
*/
