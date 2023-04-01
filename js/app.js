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
  constructor(nation, length, name) {
    this.hitCount = 0
    this.isSunk = false
    this.nation = nation
    this.length = length
    this.name = name
    this.isPlaced = false
  }
  destroyed() {
    this.isSunk = true
    console.log('sunk');
  }
  hit() {
    this.hitCount++
    if (this.hitCount === this.length) {
      this.destroyed()
    }
  }
}
const carrierUSA = new Ship('USA', 5, 'carrier')
const battleshipUSA = new Ship('USA', 4, 'battleship')
const cruiserUSA = new Ship('USA', 3, 'cruiser')
const submarineUSA = new Ship('USA', 3, 'submarine')
const destroyerUSA = new Ship('USA', 2, 'destroyer')
const carrierSoviet = new Ship('Soviet', 5, 'carrier')
const battleshipSoviet = new Ship('Soviet', 4, 'battleship')
const cruiserSoviet = new Ship('Soviet', 3, 'cruiser')
const submarineSoviet = new Ship('Soviet', 3, 'submarine')
const destroyerSoviet = new Ship('Soviet', 2, 'destroyer')
const testShip = new Ship('USA', 1, 'test')
const testShip2 = new Ship('USA', 1, 'test')


/*---------------------------- Variables (state) ----------------------------*/
let boardUSA = []
let boardSoviet = []
let shipListUSA = []
let shipListSoviet = []
let testBoard = []
let testBoard2 = [0]
let shipListTest = [testShip]
let shipListTest2 = [testShip]
let currentShip = testShip
let currentlist = shipListTest
let currentBoard = testBoard
let finished = false
let num
let vertOrHor = 'Vertical'
//console.log(testShip);
/*------------------------ Cached Element References ------------------------*/
let placePieceMessageEl = document.querySelector('#directionBtn')
const board1El = document.querySelector('.board')
const squareEls = document.getElementsByClassName('.sqr')
let verticalBtn = document.querySelector('#Vertical')
let horizontalBtn = document.querySelector('#Horizontal')

/*----------------------------- Event Listeners -----------------------------*/
//squareEls.addEventListener('click' , placeShip)
verticalBtn.addEventListener('click', updateNavBoard)
horizontalBtn.addEventListener('click', updateNavBoard)
document.addEventListener('click' , handleClick)




/*-------------------------------- Functions --------------------------------*/
shipListUSA.push(carrierUSA),
shipListUSA.push(battleshipUSA)
shipListUSA.push(cruiserUSA)
shipListUSA.push(submarineUSA)
shipListUSA.push(destroyerUSA)

shipListSoviet.push(carrierSoviet)
shipListSoviet.push(battleshipSoviet)
shipListSoviet.push(cruiserSoviet)
shipListSoviet.push(submarineSoviet)
shipListSoviet.push(destroyerSoviet)

//function initSetUp {
//
//}

function renderShipsSetup() {
  //console.log(num);
  handleClick(evt)
  updateNavBoard()
  
}
function handleClick(evt) {
  if (placePieceMessageEl.textContent === 'Choose Vertical or Horizontal') {
    return
  }
  if (isSquareValid() === false) {
    return
  }
  const clicked = evt.target.id
  let isSquare = clicked.slice(3,6)
  console.log(isSquare);
  //checks if clicked on square
  if (isSquare != 'sqr') {
    console.log('not square');
    return
  }
  console.log(finished);
  if (finished === true) {
    return
  }
  num = clicked[0]
  placeShip(num)
  allShipsPlacedCheck(currentlist)
  placementSwitchBoard(finished)
  resetNavBoard()
  
}
function updateNavBoard(evt) {
  let clicked = evt.target.id
  if (clicked === 'Vertical'){
    placePieceMessageEl.textContent = 'Vertical'
  }
  if (clicked === 'Horizontal') {
    placePieceMessageEl.textContent = 'Horizontal'
  }
  //horizontalBtn.remove()
  //verticalBtn.remove()

  //console.log("button works");

}
function placeShip() {
  currentBoard[num] = currentShip
  currentShip.isPlaced = true
  console.log('Place ship works');
  console.log(currentBoard);

}
function isSquareValid(){
  return true
}
function allShipsPlacedCheck(currentlist) {
  finished = currentlist.every(function (onBoard) {
    //console.log(finished);
    return onBoard.isPlaced
  })

  //currentlist = shipListSoviet
  console.log('All ships Checked: '+ finished);
}
function placementSwitchBoard(finished) {
  if (finished === false) {
    return
  }
  //console.log(currentBoard);
  if (currentBoard === testBoard) {
    currentBoard = testBoard2
    console.log('board Switched:' + currentBoard);
  }
}
function resetNavBoard() {
  if (finished === false) {
    return
  }
  //placePieceMessageEl.add()
  //horizontalBtn.add()
  //verticalBtn.add()
  placePieceMessageEl.textContent = 'Choose Vertical or Horizontal'
  console.log('nav reset');

}

//Need logic for if valid square is clicked for placement