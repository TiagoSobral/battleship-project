import { Player } from '../players/player.js';
import { randomizeNumber } from '../ui/ui.js';

export function createPlayers(playerTwoName = 'cpu') {
	const playerOne = new Player('player-one');
	const playerTwo = new Player(playerTwoName);
	return { playerOne, playerTwo };
}

export function randomizeBoatsPosition(playerObject, player = 'cpu') {
	let playerGameBoard = playerObject.playerOne.game;
	if (player != 'player-one') {
		playerGameBoard = playerObject.playerTwo.game;
	}
	let typesOfShip = [5, 4, 3, 3, 2];
	while (typesOfShip.length != 0) {
		try {
			let startCord = [randomizeNumber(), randomizeNumber()];
			let plays = possibleShipPositions(startCord, typesOfShip[0]);
			let trialPlay = plays[randomizeNumber(plays.length, 0)];
			playerGameBoard.addShip(startCord, trialPlay, typesOfShip[0]);
		} catch (error) {
			continue;
		}
		typesOfShip.splice(0, 1);
	}
}

function possibleShipPositions(startCord, shipLength) {
	let [startRow, startCol] = startCord;
	let plays = [
		[startRow + shipLength - 1, startCol],
		[startRow, startCol + shipLength - 1],
	];
	for (let i = 0; i < plays.length; i++) {
		let [row, col] = plays[i];
		if (row > 9 || row < 0 || col > 9 || col < 0) {
			plays.splice(i, 1);
			i--;
		}
	}
	return plays;
}
