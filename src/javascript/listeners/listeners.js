import { createPlayers } from '../controller/gamecontroller';
import {
	cleanMainElement,
	gameElements,
	setPlayerInfoText,
	shipPlacementBtns,
} from '../ui/elements';
import { cpuPlays, removeElements, renderBoard } from '../ui/ui';

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
			debugger;
			let opponent = element.value;
			let players = createPlayers(opponent);
			cleanMainElement();
			gameElements();
			renderBoard(players.playerOne.game.board, 'player-one');
			setPlayerInfoText('Place your ships!');
			shipPlacementBtns();
		});
	});
}
