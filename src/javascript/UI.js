export function renderBoard(playerBoard) {
	const gameBoard = document.querySelector('.gameboard');
	const boardElm = document.createElement('div');
	gameBoard.appendChild(boardElm);
	for (let row = 0; row < playerBoard.length; row++) {
		const rowElm = document.createElement('ul');
		rowElm.setAttribute('class', `row`);
		boardElm.appendChild(rowElm);

		for (let col = 0; col < playerBoard[row].length; col++) {
			const colElm = document.createElement('li');
			colElm.setAttribute('class', `col`);
			colElm.setAttribute('data-row', `${row}`);
			colElm.setAttribute('data-col', `${col}`);
			rowElm.appendChild(colElm);
			let contents = playerBoard[row][col].value;
			if (typeof contents == 'object') {
				colElm.textContent = 'B';
				continue;
			}
			colElm.textContent = contents;
		}
	}
}
