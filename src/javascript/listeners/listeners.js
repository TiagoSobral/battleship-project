import {
	createPlayers,
	populateBoard,
	randomizeBoatsPosition,
} from '../controller/gamecontroller';
import {
	cleanMainElement,
	createBtn,
	gameElements,
	removeBtns,
	setPlayerInfoText,
} from '../ui/elements';
import { cpuPlays, removeBoard, removeElements, renderBoard } from '../ui/ui';

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
			renderBoard(players.playerOne.game.board, 'player-one');
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
			populateBoard(playerObject.playerOne);
		} else {
			populateBoard(playerObject.playerOne);
		}
		removeBtns();
		createBtn('Confirm', 'confirm-button', player);
	});
}
