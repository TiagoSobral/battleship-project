import { createPlayers } from '../controller/gamecontroller.js';
import {
	customListener,
	menuSelectionListener,
	randomizeBtnListener,
	boardListener,
} from '../listeners/listeners.js';
import {
	cleanMainElement,
	createBtn,
	gameElements,
	menuSelection,
	setPlayerInfoText,
} from './elements.js';

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

export function renderBothBoards(playerObject) {
	renderBoard(playerObject.playerOne);
	renderBoard(playerObject.playerTwo);
}

export function playRound(playerObject, opponent, coordinates) {
	let nextPlayer;
	if (opponent == 'player-two' || opponent == 'cpu') {
		playerObject.playerTwo.game.receiveAttack(coordinates);
		nextPlayer = playerObject.playerOne.name;
		// boardListener(playerObject, 'player-one');
	} else {
		playerObject.playerOne.game.receiveAttack(coordinates);
		nextPlayer = playerObject.playerTwo.name;
		// boardListener(playerObject, 'player-two');
	}
	removeBoard();
	renderBothBoards(playerObject);
	let endGame = isGameOver(playerObject, opponent);
	if (endGame.gameOver) {
		endGameActions(endGame.winner);
	} else if (opponent != 'cpu') {
		boardListener(playerObject, nextPlayer);
	} else {
		cpuPlays(playerObject);
	}
}

export function removeBoard() {
	const boards = document.querySelectorAll('.gameboard div');
	boards.forEach((board) => {
		board.remove();
	});
}

export function cpuPlays(playerObject) {
	// debugger;
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
	renderBothBoards(playerObject);
	let isOver = isGameOver(playerObject, 'player-one');
	if (!isOver.gameOver) {
		boardListener(playerObject, 'cpu');
	} else {
		return endGameActions('cpu');
	}
}

export function randomizeNumber(max = 10, min = 1) {
	/* same with cpuPlays, the minimum has to be 1 cause the DOM has no 0 */
	return Math.floor(
		Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
	);
}

export function isGameOver(playerObject) {
	let winner;
	let playerOneSunk = playerObject.playerOne.game.allSunk();
	let playerTwoSunk = playerObject.playerTwo.game.allSunk();
	let gameOver = false;

	if (playerOneSunk == 'Game Over!') {
		winner = playerObject.playerTwo.name;
		gameOver = true;
	} else if (playerTwoSunk == 'Game Over!') {
		winner = playerObject.playerOne.name;
		gameOver = true;
	}

	return { gameOver, winner };
}

export function endGameActions(winner) {
	const playerInfo = document.querySelector('.player-info');
	if (winner == 'cpu') {
		playerInfo.textContent = "You've been beaten by a Computer";
	} else if (winner == 'player-two') {
		playerInfo.textContent = 'Player Two has Won the Game!';
	} else {
		playerInfo.textContent = 'Player One has Won the Game!';
	}
	createBtn('Play Again!', 'play-again', 'end-game');
	createBtn('Main Menu!', 'main-menu', 'end-game');
	customListener('play-again', () => playAgain(winner));
	customListener('main-menu', () => returnToMainMenu());
}

function playAgain(opponent) {
	let players = createPlayers(opponent);
	cleanMainElement();
	gameElements();
	renderBoard(players.playerOne);
	setPlayerInfoText(`Place your ships, Player One!`);
	createBtn('Randomize', 'randomize-button', 'player-one');
	randomizeBtnListener(players);
}

function returnToMainMenu() {
	cleanMainElement();
	menuSelection();
	menuSelectionListener();
}

/* 
things to add:
- every li that has a ship should have a class called ship for styling and
removing the B or S from the board and when hit it can change color or add emoji.
*/
