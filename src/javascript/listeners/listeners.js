import {
	createPlayers,
	randomizeBoatsPosition,
} from '../controller/gamecontroller';
import {
	cleanMainElement,
	createBtn,
	createDragShips,
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
			let row = element.parentElement.dataset.row;
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
			// debugger;
			let players = createPlayers(element.value);
			cleanMainElement();
			gameElements();
			renderBoard(players.playerOne);
			setPlayerInfoText(`Place your ships, Player One!`);
			createBtn('Randomize', 'randomize-button', 'player-one');
			randomizeBtnListener(players);
			dragDropAction(players, 'player-one');
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
		createBtn('Randomize', 'randomize-button', player);
		confirmBtnListener(playerObject);
		randomizeBtnListener(playerObject);
	});
}

function confirmBtnListener(playerObject) {
	const confirmBtn = document.querySelector('.confirm-button');
	confirmBtn.addEventListener('click', () => {
		let opponent = playerObject.playerTwo;
		removeBoard();
		removeBtns();
		if (opponent.name == 'cpu') {
			randomizeBoatsPosition(playerObject);
			renderBothBoards(playerObject);
			boardListener(playerObject, opponent.name);
		} else {
			confirmBtnActionForRealPlayers(playerObject, confirmBtn);
		}
	});
}

function confirmBtnActionForRealPlayers(playerObject, confirmBtnElement) {
	let currentPlayer = confirmBtnElement.classList[1];
	if (currentPlayer == 'player-one') {
		renderBoard(playerObject.playerTwo);
		setPlayerInfoText(`Place your ships, Player Two!`);
		createBtn('Randomize', 'randomize-button', 'player-two');
		randomizeBtnListener(playerObject);
		dragDropAction(playerObject, 'player-two');
	} else {
		renderBothBoards(playerObject);
		boardListener(playerObject, 'player-two');
	}
}

export function customListener(element, callback) {
	const domElement = document.querySelector(`.${element}`);
	domElement.addEventListener('click', callback);
}

function dragDropAction(playerObject, currentPlayer) {
	// helper function for readability within listener
	createDragShips(currentPlayer);
	dragStartListener();
	hoverDragDropListener();
	dragDropListener(playerObject);
	clickDraggableShipsListener();
}

export function dragStartListener() {
	const dragDropSection = document.querySelector('.drag-drop-section');
	const ships = dragDropSection.querySelectorAll('ul');
	for (let ship of ships) {
		ship.addEventListener('dragstart', (event) => {
			let shipSize = event.target.childElementCount;
			dragDropSection.setAttribute('data-dragging', `${shipSize}`);
			// the data that is set to be passed on will be the size of the ship
			event.dataTransfer.setData('text/plain', shipSize);
		});
	}
}

export function hoverDragDropListener() {
	// changes colors when hover to give impression of selection
	const boardSquares = document.querySelectorAll('.gameboard li');
	for (let li of boardSquares) {
		li.addEventListener('dragenter', () => {
			colorSiblings('#39779d86', li);
		});
		li.addEventListener('dragleave', () => {
			colorSiblings('#cad9e3', li);
		});
	}
}

export function dragDropListener(playerObject) {
	const boardSquares = document.querySelectorAll('.gameboard li');
	for (let li of boardSquares) {
		li.addEventListener('dragover', (event) => {
			event.preventDefault();
		});
		li.addEventListener('drop', (event) => {
			event.preventDefault();
			let player = event.target.parentElement.parentElement.className;
			let shipSize = Number(event.dataTransfer.getData('text/plain'));
			dropAction(playerObject, player, shipSize, li);
			updateElemAfterDrop(shipSize);
			actionAfterShipsDropped(playerObject);
		});
	}
}

function colorSiblings(colorCode, element) {
	// helper function to change square colors to be used for dragenter and dragleave
	const dragDropSection = document.querySelector('.drag-drop-section');
	/* because dragenter and dragleave cannot access data-store, once a ship is activated
	by dragstart that parent div gets a data-dragging = size of the ship */
	let size = dragDropSection.dataset.dragging;
	for (let i = 0; i < size; i++) {
		element.style.backgroundColor = colorCode;
		element = element.nextElementSibling;
	}
}

function dropAction(playerObject, player, dataTransferred, element) {
	// function to perform actions once ship is dropped.
	let arrayOfSquares = [];
	for (let i = 0; i < dataTransferred; i++) {
		arrayOfSquares.push(element);
		element = element.nextElementSibling;
	}
	let [startSquare] = arrayOfSquares;
	let endSquare = arrayOfSquares[arrayOfSquares.length - 1];
	// map here is used because dataset from the element returns a string.
	let startCord = [
		startSquare.parentElement.dataset.row,
		startSquare.dataset.col,
	].map((val) => Number(val));
	let endCord = [endSquare.parentElement.dataset.row, endSquare.dataset.col].map(
		(val) => Number(val)
	);
	if (player == 'player-one') {
		return playerObject.playerOne.game.addShip(
			startCord,
			endCord,
			dataTransferred
		);
	}
	playerObject.playerTwo.game.addShip(startCord, endCord, dataTransferred);
}

function updateElemAfterDrop(data) {
	// debugger;
	// removes the ship from the drag area and removes the randomize button so it can't be used.
	const shipElement = document.querySelector(`[length="${data}"]`);
	const randomizeBtn = document.querySelector('.randomize-button');
	shipElement.remove();
	if (randomizeBtn != null) randomizeBtn.remove();
}

function actionAfterShipsDropped(playerObject) {
	const dragSection = document.querySelector('.drag-drop-section');
	const shipsElement = dragSection.querySelectorAll('ul');
	if (shipsElement.length == 0) {
		createBtn('Confirm', 'confirm-button', dragSection.dataset.player);
		confirmBtnListener(playerObject);
		dragSection.remove();
	}
}

function clickDraggableShipsListener() {
	const shipsElm = document.querySelectorAll('.drag-drop-section ul');
	for (let ship of shipsElm) {
		ship.addEventListener('click', () => {
			let position = ship.className;
			if (position == 'horizontal') {
				ship.className = 'vertical';
			} else {
				ship.className = 'horizontal';
			}
		});
	}
}
