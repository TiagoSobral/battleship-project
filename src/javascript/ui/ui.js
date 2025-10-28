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
					colElm.setAttribute('ship', '');
				}
				continue;
			}
			colElm.textContent = contents.value;
		}
	}
}

export function dropBomb(playerObject, opponent, coordinates) {
	if (opponent == 'cpu' || opponent == 'player-two') {
		playerObject.playerTwo.game.receiveAttack(coordinates);
	} else {
		playerObject.playerOne.game.receiveAttack(coordinates);
	}
	removeBoard();
	renderBoard(playerObject.playerOne);
	renderBoard(playerObject.playerTwo);
}

export function removeBoard() {
	const boards = document.querySelectorAll('.gameboard div');
	boards.forEach((board) => {
		board.remove();
	});
}

export function cpuPlays(playerObject) {
	let opponent = playerObject.playerOne.game;
	let opponentBoard = opponent.board;
	let row = randomizeNumber();
	let col = randomizeNumber();
	while (
		opponentBoard[row][col].value == 'X' ||
		opponentBoard[row][col].hit == true
	) {
		row = randomizeNumber();
		col = randomizeNumber();
	}
	opponent.receiveAttack([row, col]);
	removeBoard();
	renderBoard(playerObject.playerOne);
	renderBoard(playerObject.playerTwo);
}

export function randomizeNumber(max = 10, min = 1) {
	/* same with cpuPlays, the minimum has to be 1 cause the DOM has no 0 */
	return Math.floor(
		Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
	);
}

export function isGameOver(playerObject, opponent) {
	let opponentBoatsAreSunk;
	if (opponent == 'cpu' || opponent == 'player-two') {
		opponentBoatsAreSunk = playerObject.playerTwo.game.allSunk();
	} else {
		opponentBoatsAreSunk = playerObject.playerOne.game.allSunk();
	}
	if (opponentBoatsAreSunk == 'Game Over!') {
		return true;
	} else {
		return false;
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
