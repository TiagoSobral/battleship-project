import { Ship } from './ships.js';

export class gameBoard {
	board = createBoard();

	addShip(startCord, endCord, boatSize) {
		let [startX, startY] = startCord;
		let board = this.board;
		let queue = [board[startX][startY]];
		let direction = boatDirection(startCord, endCord);
		for (let i = 1; i <= boatSize; i++) {
			squareUsed(queue[0]);
			queue[0].value = new Ship(5);
			if (direction == 'horizontal') {
				queue.push(board[startX][startY + i]);
			} else {
				queue.push(board[startX + i][startY]);
			}
			queue.splice(0, 1);
		}
	}
}

function createBoard() {
	let board = [];
	for (let i = 0; i < 10; i++) {
		let row = [];
		board.push(row);
		for (let j = 0; j < 10; j++) {
			let column = { value: '' };
			board[i].push(column);
		}
	}
	return board;
}

function boatDirection(startCord, endCord) {
	let [startX] = startCord;
	let [endX] = endCord;

	if (startX == endX) return 'horizontal';
	return 'vertical';
}

function squareUsed(square) {
	if (square.value != '')
		throw new Error('Invalid Play, some squares or a square is being used!');
}
