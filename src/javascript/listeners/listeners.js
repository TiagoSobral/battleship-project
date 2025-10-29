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
import {
	renderBoard,
	removeBoard,
	renderBothBoards,
	playRound,
} from '../ui/ui.js';

export function boardListener(playerObject, opponent = 'player-two') {
	const allSquares = document.querySelectorAll(`.${opponent} li`);
	allSquares.forEach((element) => {
		element.addEventListener('click', () => {
			let row = element.dataset.row;
			let col = element.dataset.col;
			let coordinates = [row, col];
			playRound(playerObject, opponent, coordinates);
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
			setPlayerInfoText(`Place your ships, Player One!`);
			createBtn('Randomize', 'randomize-button', 'player-one');
			randomizeBtnListener(players);
		});
	});
}

export function randomizeBtnListener(playerObject) {
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
		let opponent = playerObject.playerTwo;
		removeBoard();
		removeBtns();
		if (opponent.name == 'cpu') {
			randomizeBoatsPosition(playerObject);
			renderBothBoards(playerObject);
			boardListener(playerObject, opponent.name);
		} else {
			if (currentPlayer == 'player-one') {
				setPlayerInfoText(`Place your ships, Player Two!`);
				createBtn('Randomize', 'randomize-button', 'player-two');
				randomizeBtnListener(playerObject);
			} else {
				renderBoard(playerObject.playerOne);
			}
			renderBoard(opponent);
			boardListener(playerObject, 'player-two');
		}
	});
}

export function customListener(element, callback) {
	const domElement = document.querySelector(`.${element}`);
	domElement.addEventListener('click', callback);
}

/* need to figure out a way to cover the opponents boats and the current player boats
are visible.

also check condition for two players there is a mistake when calling cpuPlays, it needs to have a condition
*/

/*  COMMIT: PLAYING AGAINST TWO REAL PLAYERS WORKS

THINGS TO CHECK: 
- end game
- perhaps create a function such as game or playRound again to handle the code without ifs
- drag and drop tomorrow
- buttons to restart game
- cpu plays should check if cpu won
*/
