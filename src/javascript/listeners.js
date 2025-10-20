import { wasClicked } from './UI.js';

export function boardListener(playerObject) {
	const allSquares = document.querySelectorAll('.gameboard li');
	allSquares.forEach((element) => {
		element.addEventListener('click', () => {
			wasClicked(element, playerObject);
		});
	});
}
