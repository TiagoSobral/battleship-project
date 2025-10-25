import { Ship } from './ships.js';

export class gameBoard {
	board = createBoard();
	#boats = [];

	addShip(startCord, endCord, boatSize) {
		invalidInput(startCord, endCord, boatSize);
		let newShip = new Ship(boatSize);
		let [startX, startY] = startCord;
		let board = this.board;
		let queue = [board[startX][startY]];
		let direction = boatDirection(startCord, endCord);
		while (queue.length != 0) {
			squareUsed(queue[0]);
			queue[0].value = newShip;
			if (JSON.stringify([startX, startY]) != JSON.stringify(endCord)) {
				if (direction == 'horizontal') {
					startY = startY + 1;
					queue.push(board[startX][startY]);
				} else {
					startX = startX + 1;
					queue.push(board[startX][startY]);
				}
			}
			queue.splice(0, 1);
		}
		this.#boats.push(newShip);
	}

	receiveAttack(coordinates) {
		let [row, column] = coordinates;
		let squareHit = this.board[row][column];
		if (typeof squareHit.value == 'object') {
			squareHit.value.hit();
			squareHit.hit = true;
		} else {
			squareHit.value = 'X';
		}
	}

	allSunk() {
		let isGameOver = this.#boats.every((val) => val.isSunk() == true);
		if (isGameOver) return 'Game Over!';
		return isGameOver;
	}
}

function createBoard() {
	let board = [];
	for (let i = 0; i < 10; i++) {
		let row = [];
		board.push(row);
		for (let j = 0; j < 10; j++) {
			let column = { value: '', hit: false };
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
