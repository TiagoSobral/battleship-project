import { Player } from './player.js';

describe('Player', () => {
	it('Has a type', () => {
		expect(new Player('realPlayer')).toHaveProperty('type');
	});

	it('Has a board', () => {
		let newPlayer = new Player('realPlayer');
		expect(typeof newPlayer.game).toBe('object');
	});
});
