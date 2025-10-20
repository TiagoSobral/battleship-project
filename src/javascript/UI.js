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
			const colElm = document.createElement('li');
			colElm.setAttribute('class', `col`);
			colElm.setAttribute('data-row', `${row}`);
			colElm.setAttribute('data-col', `${col}`);
			rowElm.appendChild(colElm);
			let contents = playerBoard[row][col].value;
			if (typeof contents == 'object') {
				colElm.textContent = 'B';
				continue;
			}
			colElm.textContent = contents;
		}
	}
}

export function boardListener(playerObject, DomBoard = 'player-two') {
	const allSquares = document.querySelectorAll(`.${DomBoard} li`);
	allSquares.forEach((element) => {
		element.addEventListener('click', () => {
			wasClicked(playerObject, element);
		});
	});
}

export function wasClicked(playerObject, DomElement) {
	let row = DomElement.dataset.row;
	let col = DomElement.dataset.col;
	let coordinates = [row, col];
	let playerName = DomElement.parentElement.parentElement.classList[0];
	let sibling;
	if (playerName == 'player-one') {
		playerObject.playerOne.game.receiveAttack(coordinates);
		sibling = 'player-two';
	} else {
		playerObject.playerTwo.game.receiveAttack(coordinates);
		sibling = 'player-one';
	}
	removeElements();
	populateBoard(playerObject.playerOne);
	populateBoard(playerObject.playerTwo);
	boardListener(playerObject, sibling);
}

function removeElements() {
	const boards = document.querySelectorAll('.gameboard div');
	boards.forEach((board) => {
		board.remove();
	});
}
