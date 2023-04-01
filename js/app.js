/* Pseudocode
1. Create ship objects to place in the Game
2. Store cached element references
3. Create 2 squares to help create battleship game functionality
/ Create interface screen with a button to select vertical or horizontal 
/ handle player click to place ship onto squares
/handle logic when player attempts placing ship in invalid location
 —- Handle logic of when placing piece on the edge
 —-- create functions for hit() miss() hitandSunk() or invalid placement
4.create both boards once functionality of the individual squares is correct
5. Load the game, initialize both boards to be empty, Game state will start with giving the user the option to place their ships with interface created in step 3 above, and then player 2 will after on the same interface


6. Both boards will then become blank, unable to see the ships.
7. Game state will be rendered to the user after each hit attempt
***Animations added for these: 
8.. Handle player click on each board to see if ship is hit
 -miss
 -hit
 -hit and sunk
 -invalid
- show only one board at a time, and switch after turn attempt
- Handle winner when all 5 ships are sunk
9. Create reset Functionality
10. Add Css styling to project
 */
/*-------------------------------- Constants --------------------------------*/
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
  hit(){
    this.hitCount++
    if (this.hitCount === this.length) {
      this.destroyed()
    }
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
const destroyerSoviet = new Ship('Soviet', 1)

/*---------------------------- Variables (state) ----------------------------*/
let board1
let board2
/*------------------------ Cached Element References ------------------------*/
let placePieceMessageEl = document.querySelector('#directionBtn')
const board1El = document.querySelector('.board')
const squareEls = document.getElementsByClassName('sqr')
let verticalBtn = document.querySelector('#Vertical')
let horizontalBtn = document.querySelector('#Horizonal')

/*----------------------------- Event Listeners -----------------------------*/
//squareEls.addEventListener('click' , placeShip)
verticalBtn.addEventListener('click' ,verticalOrHorizontal);
horizontalBtn.addEventListener('click' , verticalOrHorizontal);


/*-------------------------------- Functions --------------------------------*/
function render() {
  
}
function verticalOrHorizontal() {
  console.log("button works");
}
function placeShip(evt) {
  
}


//console.log(placePieceMessageEl.textContent);
// console.log(destroyerSoviet);
// console.log(destroyerSoviet.hit());
// console.log(destroyerSoviet)

// console.log(board1 + 'worked');
// console.log(verticalEl.textContent);
// console.log(squareEls);
// console.log('hello');

// console.log(squareEls.item(0));