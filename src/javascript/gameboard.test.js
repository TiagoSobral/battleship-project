import { gameBoard } from './gameboard.js';

describe('Game Board', () => {
	it('Has 10x10 Board', () => {
		let newBoard = new gameBoard();
		let length = newBoard.board.every((row) => row.length == 10);
		expect(length).toBe(true);
		expect(newBoard.board.length).toBe(10);

		for (let i = 0; i < newBoard.board.length; i++) {
			newBoard.board[i].every((column) => expect(column).toEqual({ value: '' }));
		}
	});
});
