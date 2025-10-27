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

export function createBtn(name, attributeOne, attributeTwo) {
	const btnSection = document.querySelector('.button-section');
	const newBtn = document.createElement('button');
	newBtn.classList.add(attributeOne);
	newBtn.classList.add(attributeTwo);
	newBtn.textContent = name;
	btnSection.append(newBtn);
}

export function removeBtns() {
	const btnSection = document.querySelectorAll('.button-section > *');
	for (let btn of btnSection) {
		btn.remove();
	}
}
