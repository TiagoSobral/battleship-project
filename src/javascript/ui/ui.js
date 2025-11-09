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
	createDragShips,
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
		rowElm.setAttribute('data-row', `${row}`);
		boardElm.appendChild(rowElm);

		for (let col = 0; col < playerBoard[row].length; col++) {
			let contents = playerBoard[row][col];
			const colElm = document.createElement('li');
			colElm.setAttribute('class', `col`);
			colElm.setAttribute('data-col', `${col}`);
			rowElm.appendChild(colElm);
			populateSquareInfo(contents, colElm);
		}
	}
}

function populateSquareInfo(square, element) {
	if (typeof square.value == 'object') {
		element.setAttribute('ship', '');
	} else if (square.value == 'X') {
		element.setAttribute('miss', '');
	} else {
		element.textContent = square.value;
	}
	if (square.hit == true) {
		element.setAttribute('hit', '');
	}
}

export function renderBothBoards(playerObject) {
	renderBoard(playerObject.playerOne);
	renderBoard(playerObject.playerTwo);
}

export function playRound(playerObject, opponent, coordinates) {
	let nextOpponent;
	let nextNameInfo;
	if (opponent == 'player-one') {
		playerObject.playerOne.game.receiveAttack(coordinates);
		nextOpponent = playerObject.playerTwo.name;
		nextNameInfo = 'Player One';
	} else {
		playerObject.playerTwo.game.receiveAttack(coordinates);
		nextOpponent = playerObject.playerOne.name;
		nextNameInfo = 'Player Two';
	}

	removeBoard();
	renderBothBoards(playerObject);
	let endGame = isGameOver(playerObject);
	if (endGame.gameOver) {
		endGameActions(endGame.winner);
	} else if (opponent == 'cpu') {
		cpuPlays(playerObject);
		setPlayerInfoText(`Drop you bomb, Player One`);
	} else {
		hideBoatsOpponentBoard(nextOpponent);
		boardListener(playerObject, nextOpponent);
		setPlayerInfoText(`Drop you bomb, ${nextNameInfo}`);
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
	if (isOver.gameOver) {
		return endGameActions('cpu');
	}
	hideBoatsOpponentBoard('cpu');
	boardListener(playerObject, 'cpu');
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
	createDragShips('player-one');
	dragDropAction(players);
}

function returnToMainMenu() {
	cleanMainElement();
	menuSelection();
	menuSelectionListener();
}

export function hideBoatsOpponentBoard(player) {
	const board = document.querySelector(`.${player}`);
	board.setAttribute('opponent', '');
}

/* 
things to add:
- every li that has a ship should have a class called ship for styling and
removing the B or S from the board and when hit it can change color or add emoji.
*/
