import { Ship } from './ships.js';

describe('Ships', () => {
	it('Returns Object', () => {
		expect(new Ship(5)).toEqual({ length: 5, timesHit: 0, sunk: false });
	});

	it('Hits Ship', () => {
		let destroyer = new Ship(5);
		destroyer.hit();
		expect(destroyer).toMatchObject({ timesHit: 1 });
	});

	it('Is Sunk', () => {
		let destroyer = new Ship(2);
		destroyer.hit();
		destroyer.hit();
		expect(destroyer.isSunk()).toBe(true);
	});
});
