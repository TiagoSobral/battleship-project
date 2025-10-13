export class gameBoard {
	board = createBoard();
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
