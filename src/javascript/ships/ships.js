/* PSEUDO CODE

RULES 
1 - have 4 boards 10x10 (2 each player) (1 is for its own boats & other the plays made)
1.1 - the board is identified by letter and number or two numbers (like knight travails)
2 - set the boats on the board (cannot be diagonal or occupy a square that has been used)
3 - have players
4 - play
4.1 - choose a square in the board, if the player has a boat there continue until you miss
4.2 - whenever you hit a boat surrounding squares get darker to give you an idea where
the rest of the boat is. (you need to know what type of boat was hit and if it was destroyed what type)
4.3 - the plays you made are saved in the board and you can't play the same squares again.
5 - Opponent plays 
6 - when a player hits all boats he is the winner, there are no draws
*/

export class Ship {
	timesHit = 0;
	sunk = false;
	constructor(length) {
		this.length = length;
	}

	hit() {
		this.timesHit += 1;
	}

	isSunk() {
		if (this.timesHit === this.length) return (this.sunk = true);
		return this.sunk;
	}
}
