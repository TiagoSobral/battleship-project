import { Ship } from '../ships/ships.js';

export class gameBoard {
	board = createBoard();
	#boats = [];

	addShip(startCord, endCord, boatSize) {
		invalidInput(startCord, endCord, boatSize);
		let newShip = new Ship(boatSize);
		let squares = path(startCord, endCord, boatSize);
		squareUsed(squares, this.board);
		squares.forEach((square) => {
			let row = square[0];
			let col = square[1];
			this.board[row][col].value = newShip;
		});
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

	clearBoard() {
		this.board = createBoard();
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

function squareUsed(path, board) {
	path.forEach((coordinate) => {
		let row = coordinate[0];
		let col = coordinate[1];
		let square = board[row][col].value;
		if (typeof square == 'object') {
			throw new Error('Invalid Play, some squares or a square is being used!');
		}
	});
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

function path(startCord, endCord, boatSize) {
	let queue = [startCord];
	let path = [];
	while (queue.length != 0 && path.length < boatSize) {
		let [sRow, sCol] = startCord;
		let [eRow, eCol] = endCord;
		let [currRow, currCol] = queue[0];
		path.push(queue[0]);
		if (sRow < eRow) queue.push([currRow + 1, currCol]);
		if (sCol < eCol) queue.push([currRow, currCol + 1]);
		queue.splice(0, 1);
	}
	return path;
}
