import {
	createPlayers,
	randomizeBoatsPosition,
} from '../controller/gamecontroller';
import {
	cleanMainElement,
	createBtn,
	gameElements,
	removeBtns,
	setPlayerInfoText,
} from '../ui/elements';
import { renderBoard, removeBoard } from '../ui/ui.js';

export function boardListener(playerObject, DomBoard = 'player-two') {
	const allSquares = document.querySelectorAll(`.${DomBoard} li`);
	allSquares.forEach((element) => {
		element.addEventListener('click', () => {
			playRound(playerObject, element);
		});
	});
}

export function menuSelectionListener() {
	const menuBtns = document.querySelectorAll('.selection-menu > *');
	menuBtns.forEach((element) => {
		element.addEventListener('click', () => {
			let players = createPlayers(element.value);
			cleanMainElement();
			gameElements();
			renderBoard(players.playerOne);
			setPlayerInfoText('Place your ships!');
			createBtn('Randomize', 'randomize-button', 'player-one');
			randomizeBtnListener(players);
		});
	});
}

function randomizeBtnListener(playerObject) {
	const randomizeBtn = document.querySelector('.randomize-button');
	randomizeBtn.addEventListener('click', () => {
		let player = randomizeBtn.classList[1];
		removeBoard();
		randomizeBoatsPosition(playerObject, player);
		if (player == 'player-one') {
			renderBoard(playerObject.playerOne);
		} else {
			renderBoard(playerObject.playerTwo);
		}
		removeBtns();
		createBtn('Confirm', 'confirm-button', player);
		confirmBtnListener(playerObject);
	});
}

function confirmBtnListener(playerObject) {
	const confirmBtn = document.querySelector('.confirm-button');
	let currentPlayer = confirmBtn.classList[1];
	confirmBtn.addEventListener('click', () => {
		// debugger;
		let player = confirmBtn.classList[1];
		removeBoard();
		removeBtns();
		renderBoard(playerObject.playerTwo);
		if (playerObject.playerTwo.name == 'cpu') {
			randomizeBoatsPosition(playerObject, player);
			renderBoard(playerObject.playerTwo);
			boardListener(playerObject);
			return;
		} else if (currentPlayer == 'player-one') {
			createBtn('Randomize', 'randomize-button', 'player-two');
			randomizeBtnListener(playerObject);
		} else {
			// removeBtns();
			// removeBoard();
			renderBoard(playerObject.playerTwo);
			createBtn('Confirm', 'confirm-button', player);
			confirmBtnListener(playerObject);
		}
	});
}

/*  Problem: 
	the last confirmation doubles the grid instead of clearing the old one */
