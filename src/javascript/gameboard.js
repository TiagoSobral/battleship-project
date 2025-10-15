import { Ship } from './ships.js';

export class gameBoard {
	board = createBoard();

	addShip(startCord, endCord, boatSize) {
		invalidInput(startCord, endCord, boatSize);
		let newShip = new Ship(5);
		let [startX, startY] = startCord;
		let board = this.board;
		let queue = [board[startX][startY]];
		let direction = boatDirection(startCord, endCord);
		for (let i = 1; i <= boatSize; i++) {
			squareUsed(queue[0]);
			queue[0].value = newShip;
			if (direction == 'horizontal') {
				queue.push(board[startX][startY + i]);
			} else {
				queue.push(board[startX + i][startY]);
			}
			queue.splice(0, 1);
		}
	}

	receiveAttack(coordinates) {
		let [row, column] = coordinates;
		let squareHit = this.board[row][column];
		if (typeof squareHit.value == 'object') return squareHit.value.hit();
		return (squareHit.value = 'X');
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

function invalidInput(startCord, endCord, boatSize) {
	let coords = startCord.concat(endCord);
	let [startRow, startCol, endRow, endCol] = coords;
	let rowLength = endRow - startRow;
	let colLength = endCol - startCol;
	let outOfReach = coords.some((val) => val < 0 || val > 9);
	if (
		outOfReach ||
		boatSize > 5 ||
		boatSize < 0 ||
		rowLength > boatSize ||
		colLength > boatSize
	)
		throw new Error('Wrong input! Try Again!');
}
