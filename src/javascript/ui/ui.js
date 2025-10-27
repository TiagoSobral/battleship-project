import { boardListener } from '../listeners/listeners.js';

export function renderBoard(player) {
	let playerBoard = player.game.board;
	const gameBoard = document.querySelector('.gameboard');
	const boardElm = document.createElement('div');
	boardElm.setAttribute('class', `${player.name}`);
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

export function playRound(playerObject, DomElement) {
	let row = DomElement.dataset.row;
	let col = DomElement.dataset.col;
	let coordinates = [row, col];
	playerObject.playerTwo.game.receiveAttack(coordinates);
	cpuPlays(playerObject);
	removeBoard();
	renderBoard(playerObject.playerOne);
	renderBoard(playerObject.playerTwo);
	if (isGameOver(playerObject) != true) {
		boardListener(playerObject);
	} else {
		// add reset button or new game that starts everything over again.
		// perhaps a new game or the same players and a new round
	}
}

export function removeBoard() {
	const boards = document.querySelectorAll('.gameboard div');
	boards.forEach((board) => {
		board.remove();
	});
}

export function cpuPlays(playerObject) {
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

export function randomizeNumber(max = 10, min = 1) {
	/* same with cpuPlays, the minimum has to be 1 cause the DOM has no 0 */
	return Math.floor(
		Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
	);
}

function isGameOver(playerObject) {
	let playerOneBoatsAreSunk = playerObject.playerOne.game.allSunk();
	let playerTwoBoatsAreSunk = playerObject.playerTwo.game.allSunk();
	const gameStatusElm = document.querySelector('.player-info');
	let gameIsOver = false;
	if (playerOneBoatsAreSunk == 'Game Over!') {
		gameStatusElm.textContent = `${playerOneBoatsAreSunk} ${playerObject.playerTwo.name} Won!`;
		return (gameIsOver = true);
	} else if (playerTwoBoatsAreSunk == 'Game Over!') {
		gameStatusElm.textContent = `${playerTwoBoatsAreSunk} ${playerObject.playerOne.name} Won!`;
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
