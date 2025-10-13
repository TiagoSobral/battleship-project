import { gameBoard } from './gameboard.js';

describe('Game Board', () => {
	let newBoard = new gameBoard();
	it('Has 10x10 Board', () => {
		let length = newBoard.board.every((row) => row.length == 10);
		expect(length).toBe(true);
		expect(newBoard.board.length).toBe(10);
		for (let i = 0; i < newBoard.board.length; i++) {
			newBoard.board[i].every((column) => expect(column).toEqual({ value: '' }));
		}
	});

	it('Adds ship horizontally', () => {
		newBoard.addShip([0, 0], [0, 5], 5);
		for (let i = 0; i < 5; i++) {
			expect(newBoard.board[0][i].value).toEqual({
				length: 5,
				timesHit: 0,
				sunk: false,
			});
		}
	});

	it('Adds ship vertically', () => {
		newBoard.addShip([1, 0], [5, 0], 5);
		for (let i = 0; i < 5; i++) {
			expect(newBoard.board[1 + i][0].value).toEqual({
				length: 5,
				timesHit: 0,
				sunk: false,
			});
		}
	});
});
