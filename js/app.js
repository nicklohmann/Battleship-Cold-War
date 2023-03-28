/* Pseudocode:
1. Create ship objects to place in the Game
2. Store cached element references
3. Load the game, initialize both boards to be empty, Game state will start with giving the user the option to place his ships, and then player 2 will after
4. Handle player click to place each individual ship on the respective board
5. Both boards will then become blank, unable to see the ships.

6. Game state will be rendered to the user after each hit attempt

7. Handle player click on each board to see if ship is hit
 - Handle winner

8. Create reset Functionality
 */

const carrier1 = {isSunk: false, hitCount: 0 , length:5}
const battleship1 = {isSunk: false, hitCount: 0 , length:4}
const cruiser1 = {isSunk: false, hitCount: 0 , length:3}
const submarine1 = {isSunk: false, hitCount: 0 , length:3}
const destroyer1 = {isSunk: false, hitCount: 0 , length:2}
const carrier2 = {isSunk: false, hitCount: 0 , length:5}
const battleship2 = {isSunk: false, hitCount: 0 , length:4}
const cruiser2 = {isSunk: false, hitCount: 0 , length:3}
const submarine2 = {isSunk: false, hitCount: 0 , length:3}
const destroyer2 = {isSunk: false, hitCount: 0 , length:2}