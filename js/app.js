/* Pseudocode:
1. Create ship objects to place in the Game
2. Store cached element references
3. Load the game, initialize both boards to be empty, Game state will start with giving the user the option to place their ships, and then player 2 will after
4. Handle player click to place each individual ship on the respective board
5. Both boards will then become blank, unable to see the ships.
6. Game state will be rendered to the user after each hit attempt
 -miss
 -hit
 -hit and sunk
 -invalid
7. Handle player click on each board to see if ship is hit
- Handle winner when all 5 ships are sunk
8. Create reset Functionality
 */
let board
class Ship {
  constructor(nation, length) {
    this.hitCount = 0
    this.isSunk = false
    this.nation = nation
    this.length = length
  }
  destroyed() {
    this.isSunk = true
    console.log('sunk');
  }
}
const carrierUSA = new Ship('USA', 5)
const battleshipUSA = new Ship('USA', 4)
const cruiserUSA = new Ship('USA', 3)
const submarineUSA = new Ship('USA', 3)
const destroyerUSA = new Ship('USA', 2)
const carrierSoviet = new Ship('Soviet', 5)
const battleshipSoviet = new Ship('Soviet', 4)
const cruiserSoviet = new Ship('Soviet', 3)
const submarineSoviet = new Ship('Soviet', 3)
const destroyerSoviet = new Ship('Soviet', 2)




