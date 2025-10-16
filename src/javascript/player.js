import { gameBoard } from './gameboard.js';

export class Player {
	game = new gameBoard();
	constructor(type) {
		this.type = type;
	}
}
