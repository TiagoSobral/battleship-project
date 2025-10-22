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
	debugger;
	let row = DomElement.dataset.row;
	let col = DomElement.dataset.col;
	let coordinates = [row, col];
	playerObject.playerTwo.game.receiveAttack(coordinates);
	cpuPlays(playerObject);
	removeElements();
	populateBoard(playerObject.playerOne);
	populateBoard(playerObject.playerTwo);
	boardListener(playerObject);
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
	let square = document.querySelector(
		`.player-one > .row:nth-child(${row}) > .col:nth-child(${col}) `
	);
	while (square.textContent == 'X' && square.classList.contains('hit')) {
		row = randomizeNumber();
		col = randomizeNumber();
	}
	opponent.receiveAttack([row, col]);
}

function randomizeNumber() {
	return Math.round(Math.random() * (10 - 0) + 0);
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
