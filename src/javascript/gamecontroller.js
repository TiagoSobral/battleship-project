import { Player } from './player.js';
import { renderBoard } from './UI.js';

function createPlayers(
	playerOneName = 'Player One',
	playerTwoName = 'Player Two'
) {
	const playerOne = new Player(playerOneName);
	const playerTwo = new Player(playerTwoName);
	return { playerOne, playerTwo };
}

export let players = createPlayers();
let numberOne = players.playerOne.game;
let numberTwo = players.playerTwo.game;

numberOne.addShip([0, 0], [4, 0], 5);
numberOne.addShip([5, 5], [8, 5], 4);
numberOne.addShip([3, 7], [3, 9], 3);
numberOne.addShip([7, 2], [9, 2], 3);
numberOne.addShip([1, 8], [1, 9], 2);

numberTwo.addShip([0, 0], [4, 0], 5);
numberTwo.addShip([5, 5], [8, 5], 4);
numberTwo.addShip([3, 7], [3, 9], 3);
numberTwo.addShip([7, 2], [9, 2], 3);
numberTwo.addShip([1, 8], [1, 9], 2);

export function populateBoard(player) {
	let playerBoard = player.game.board;
	let playerName = player.name;
	renderBoard(playerBoard, playerName);
}
