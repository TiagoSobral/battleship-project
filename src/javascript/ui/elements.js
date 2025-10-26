export function menuSelection() {
	const main = document.querySelector('main');
	const menu = document.createElement('section');
	const vsComputer = document.createElement('button');
	const vsPlayer = document.createElement('button');
	menu.setAttribute('class', 'selection-menu');
	vsComputer.setAttribute('class', 'vs-computer');
	vsComputer.textContent = 'VS Computer';
	vsComputer.value = 'cpu';
	vsPlayer.setAttribute('class', 'vs-player');
	vsPlayer.textContent = 'VS Player';
	vsPlayer.value = 'player-two';
	main.appendChild(menu);
	menu.append(vsComputer, vsPlayer);
}

export function cleanMainElement() {
	const mainElements = document.querySelectorAll('main > *');
	for (let element of mainElements) {
		element.remove();
	}
}

export function gameElements() {
	const main = document.querySelector('main');
	const gameSection = document.createElement('section');
	const playerInfo = document.createElement('div');
	const gameBoard = document.createElement('div');
	const buttonSection = document.createElement('div');
	gameSection.setAttribute('class', 'game-section');
	playerInfo.setAttribute('class', 'player-info');
	gameBoard.setAttribute('class', 'gameboard');
	buttonSection.setAttribute('class', 'button-section');
	main.appendChild(gameSection);
	gameSection.append(playerInfo, gameBoard, buttonSection);
}

export function setPlayerInfoText(text) {
	const playerInfo = document.querySelector('.player-info');
	playerInfo.textContent = text;
}

export function shipPlacementBtns() {
	const btnSection = document.querySelector('.button-section');
	const startGameBtn = document.createElement('button');
	const randomizeBtn = document.createElement('button');
	startGameBtn.classList.add('start-game');
	startGameBtn.textContent = 'Play Game';
	randomizeBtn.classList.add('randomize-button');
	randomizeBtn.textContent = 'Randomize';
	btnSection.append(startGameBtn, randomizeBtn);
}
