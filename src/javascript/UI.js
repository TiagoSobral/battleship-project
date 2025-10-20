import { populateBoard } from './gamecontroller.js';
import { boardListener } from './listeners.js';

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

export function wasClicked(DomElement, playerObject) {
	debugger;
	let row = DomElement.dataset.row;
	let col = DomElement.dataset.col;
	let coordinates = [row, col];
	let grandParentElm = DomElement.parentElement.parentElement;
	if (grandParentElm.classList.contains('player-one')) {
		playerObject.playerOne.game.receiveAttack(coordinates);
	} else {
		playerObject.playerTwo.game.receiveAttack(coordinates);
	}
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
