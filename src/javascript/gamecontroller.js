import { Player } from './player.js';
import { renderBoard } from './UI.js';

function createPlayers(player = 'user', computer = 'cpu') {
	const user = new Player(player);
	const cpu = new Player(computer);
	return { user, cpu };
}

export function populateBoards() {
	let players = createPlayers();
	let userBoard = players.user.game.board;
	let cpuBoard = players.cpu.game.board;

	players.user.game.addShip([0, 0], [4, 0], 5);
	players.user.game.addShip([5, 5], [8, 5], 4);
	players.user.game.addShip([3, 7], [3, 9], 3);
	players.user.game.addShip([7, 2], [9, 2], 3);
	players.user.game.addShip([1, 8], [1, 9], 2);
	renderBoard(userBoard);

	players.cpu.game.addShip([0, 0], [4, 0], 5);
	players.cpu.game.addShip([5, 5], [8, 5], 4);
	players.cpu.game.addShip([3, 7], [3, 9], 3);
	players.cpu.game.addShip([7, 2], [9, 2], 3);
	players.cpu.game.addShip([1, 8], [1, 9], 2);
	renderBoard(cpuBoard);
}
