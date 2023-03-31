/* Pseudocode:
1. Create ship objects to place in the Game
2. Store cached element references
3. Load the game, initialize both boards to be empty, Game state will start with giving the user the option to place their ships, and then player 2 will after
4. Handle player click to place each individual ship on the respective board
5. Both boards will then become blank, unable to see the ships.

6. Game state will be rendered to the user after each hit attempt
 -miss
 -hit
 -invalid
7. Handle player click on each board to see if ship is hit
- Handle winner

8. Create reset Functionality
 */
let board

class ship {
  constructor(nation, length) {
    this.hitCount = 0
    this.isSunk = false
    this.nation = nation
    this.length = length
  }
  sunk() {
    this.isSunk = true
  }
}
const carrierUSA = new ship('USA', 5)
const battleshipUSA = new ship('USA', 4)
const cruiserUSA = new ship('USA', 3)
const submarineUSA = new ship('USA', 3)
const destroyerUSA = new ship('USA', 2)
const carrierSoviet = new ship('Soviet', 5)
const battleshipSoviet = new ship('Soviet', 4)
const cruiserSoviet = new ship('Soviet', 3)
const submarineSoviet = new ship('Soviet', 3)
const destroyerSoviet = new ship('Soviet', 2)

