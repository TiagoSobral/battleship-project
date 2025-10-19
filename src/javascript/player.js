import { gameBoard } from './gameboard.js';

export class Player {
	game = new gameBoard();
	constructor(name) {
		this.name = name;
	}
}
