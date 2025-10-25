import '../css/style.css';
import '../css/board.css';
import '../css/reset.css';
import {
	populateBoard,
	players,
	randomizeBoatsPosition,
} from './controller/gamecontroller.js';
import { boardListener } from './ui/ui.js';

randomizeBoatsPosition(players);
randomizeBoatsPosition(players, 'player-one');

populateBoard(players.playerOne);
populateBoard(players.playerTwo);

boardListener(players);

/* 
1-  the first thing that shows is the selection of players:
	- vs computer
	- vs player 2

2 - place the ships:
	- randomize
	- drag and drop

3 - start playing by clicking on square:
	- have the computer being slower to see its play in slow mo.
	- adversary board should not display boats only
	- own board should display boats.

4 - game ends when all ships are sunk:
	- show winning message
	- show buttons for new game & replay.

5 - possible but not mandatory:
	- flipping boards when player changes
	- improve the computer AI


*/
