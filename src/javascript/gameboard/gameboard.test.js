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
		newBoard.addShip([0, 0], [0, 4], 5);
		for (let i = 0; i < 5; i++) {
			expect(newBoard.board[0][0 + i].value).toEqual({
				length: 5,
				timesHit: 0,
				sunk: false,
			});
		}
	});

	it('Adds ship vertically', () => {
		newBoard.addShip([7, 2], [9, 2], 3);
		for (let i = 0; i < 3; i++) {
			expect(newBoard.board[7 + i][2].value).toEqual({
				length: 3,
				timesHit: 0,
				sunk: false,
			});
		}
	});

	it("Doesn't allow used squares", () => {
		expect(() => newBoard.addShip([0, 0], [3, 0], 3)).toThrow();
	});

	it("Doesn't accept wrong input", () => {
		// checks if throws error out of bounds & if coordinates don't match ship size
		expect(() => newBoard.addShip([1, 0], [6, 0], 6)).toThrow();
		expect(() => newBoard.addShip([8, 0], [10, 0], 2)).toThrow();
		expect(() => newBoard.addShip([7, 0], [9, 0], 1)).toThrow();
	});

	it('Hits a ship', () => {
		newBoard.receiveAttack([0, 0]);
		expect(newBoard.board[0][0].value.timesHit).toBe(1);
		// checks if the the squares that belong to the ship record the hit.
		expect(newBoard.board[0][4].value.timesHit).toBe(1);
	});

	it('Hits water and records', () => {
		newBoard.receiveAttack([9, 9]);
		expect(newBoard.board[9][9].value).toBe('X');
	});

	it('Game Over', () => {
		for (let i = 1; i <= 4; i++) {
			newBoard.receiveAttack([0, 0 + i]);
		}
		for (let i = 0; i < 3; i++) {
			newBoard.receiveAttack([7 + i, 2]);
		}
		/* the last hit on the last boat standing should return Game Over */
		expect(newBoard.allSunk()).toBe('Game Over!');
	});
});

/* Note to self:
- cannot have duplicates, so i need to test if there are duplicates

info: to guarantee the test checks, i need to add two boats with similar coordinates 
and if the values change it means the it didn't have into consideration the boat that was
already there.


- perhaps add a second board and record if my play was a hit or a miss.
*/
