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
for (let i = 1; i <= 100; i++) {
  boardUSA.push(i)
}
let boardSoviet = []

for (let i = 1; i <= 100; i++) {
  boardSoviet.push(i)
}
let shipListUSA = [carrierUSA, battleshipUSA, cruiserUSA, submarineUSA, destroyerUSA]
let shipListSoviet = [carrierSoviet, battleshipSoviet, cruiserSoviet, submarineSoviet, destroyerSoviet]
let currentlist = shipListUSA
let currentBoard = boardUSA
let currentShip = shipListUSA[0]
let finished = false
let num
let vertOrHor = 'Vertical'
let placeDirection
let vertDirection = 'UpToDown'
let horzDirection = 'LeftToRight'
let currentShipIndex = 0
//console.log(testShip);
/*------------------------ Cached Element References ------------------------*/
let placePieceMessageEl = document.querySelector('#directionBtn')
let pieceSelectionMessageEl = document.querySelector('#PlacePiece')
const board1El = document.querySelector('.board')
const squareEls = document.getElementsByClassName('.square')
let verticalBtn = document.querySelector('#Vertical')
let horizontalBtn = document.querySelector('#Horizontal')
let gameBoard1 = document.querySelector('#board1Container')
let gameBoard2 = document.querySelector('#board2Container')
let placeCurrentShipMessageEl = document.querySelector('#PlacePiece')
/*----------------------------- Event Listeners -----------------------------*/
//squareEls.addEventListener('click' , placeShip)
document.addEventListener('DOMContentLoaded', init)
verticalBtn.addEventListener('click', updateNavBoard)
horizontalBtn.addEventListener('click', updateNavBoard)
gameBoard1.addEventListener('click', handleClick)




/*-------------------------------- Functions --------------------------------*/
console.log(currentShip);
//function initSetUp {
//
//}
function init(Event) {
  createBoard('USA')
  placeCurrentShipMessageEl.textContent = `Click square for ${currentShip.name} placement`

}
function switchShip() {
  if (currentShip.isPlaced === true) {
    currentShipIndex++
    currentShip = currentlist[currentShipIndex]
    console.log('currentShip: ' + currentShip.name);
    placeCurrentShipMessageEl.textContent = `Click square for ${currentShip.name} placement`
  }
}
function checkOverlap(num) {
  let helperArray = []
  let overlap = currentShip.length
  if ((placeDirection === 'Horizontal') && (horzDirection === 'LeftToRight')) {
    while (overlap != 0) {
      helperArray.push(currentBoard[num])
      //console.log(currentBoard[num]);
      num++
      overlap--
    }
    // console.log('helper' + helperArray);
    //console.log('boolean:' + helperArray.every((el) => el >0));
    if (!helperArray.every((el) => el > 0)) {
      console.log('WORKED');
      return true
    }
    return false
  }
  if ((placeDirection === 'Horizontal') && (horzDirection === 'RightToLeft')) {
    while (overlap != 0) {
      helperArray.push(currentBoard[num])
      num--
      overlap--
    }
    //console.log('helper' + helperArray);
    //console.log('boolean:' + helperArray.every((el) => el > 0 ));
    if (!helperArray.every((el) => el > 0)) {
      console.log('WORKED');
      return true
    }
    return false
  }
  if ((placeDirection === 'Vertical' && vertDirection === 'UpToDown')) {
    while (overlap != 0) {
      helperArray.push(currentBoard[num])
      num += 10
      overlap--
    }
    if (!helperArray.every((el) => el > 0)) {
      console.log('WORKED');
      return true
    }
    return false
  }
  if ((placeDirection === 'Vertical' && vertDirection === 'DownToUp')) {
    while (overlap != 0) {
      helperArray.push(currentBoard[num])
      num += 10
      overlap--
    }
    if (!helperArray.every((el) => el > 0)) {
      console.log('WORKED');
      return true
    }
    return false
  }
  return false
}



function renderShipsSetup() {
  //console.log(num);
  placeShip(num)

  //console.log(currentBoard.some((el) => el = Ship));
  switchShip()
  console.log(currentBoard);
  console.log(currentShip);
  allShipsPlacedCheck(currentlist)
  placementSwitchBoard(finished)
  if (finished === true) {
    resetNavBoard()
  }
  //console.log(currentBoard);
}
function handleClick(evt) {
  if (placePieceMessageEl.textContent === 'Choose Vertical or Horizontal') {
    return
  }
  if (finished === true) {
    return
  }
  const clicked = evt.target.id
  let isSquare = clicked.slice(0, 2)
  //console.log(isSquare);
  //checks if clicked on square
  if (isSquare != 'sq') {
    //console.log('not square');
    return
  }

  num = clicked.slice(2, 4)
  //console.log('num:' + num);
  renderShipsSetup()

}
function updateNavBoard(evt) {
  let clicked = evt.target.id
  if (clicked === 'Vertical') {
    placePieceMessageEl.textContent = 'Vertical'
    placeDirection = 'Vertical'
  }
  if (clicked === 'Horizontal') {
    placePieceMessageEl.textContent = 'Horizontal'
    placeDirection = 'Horizontal'
  }
  //horizontalBtn.remove()
  //verticalBtn.remove()

  //console.log("button works");

}
function placeShip(num) {
  horzDirection = 'LeftToRight'
  vertDirection = 'UpToDown'
  //console.log('placing')
  //console.log('num: '+num);
  //console.log('placeDirection: '+ placeDirection);
  num = parseInt(num, 10)
  let i = currentShip.length
  // console.log('square valid check:'+isSquareValid(num));
  //console.log('overlap valid check:'+checkOverlap(num));
  if (isSquareValid(num) === true && checkOverlap(num) === true) {
    console.log('not Valid');
    placeCurrentShipMessageEl.textContent = `Pick valid square for ${currentShip.name}`
    return
  }
  if ((placeDirection === 'Horizontal') && (horzDirection === 'LeftToRight')) {
    //console.log('checkingValid');
    while (i != 0) {
      currentBoard[num] = currentShip
      num++
      i--
      //console.log('ran');
      //console.log(currentBoard);
    }
  }
  if (placeDirection === 'Horizontal' && horzDirection === 'RightToLeft') {
    while (i != 0) {
      currentBoard[num] = currentShip
      num--
      i--
      //console.log('running');
      //console.log(currentBoard);
    }
  }
  if (placeDirection === 'Vertical' && vertDirection === 'UpToDown') {
    while (i != 0) {
      console.log('sprinting');
      currentBoard[num] = currentShip
      num += 10
      console.log(num);
      i--
      console.log(currentBoard);
    }
  }
  if (placeDirection === 'Vertical' && vertDirection === 'DownToUp') {
    while (i != 0) {
      console.log('sprinter');
      currentBoard[num] = currentShip
      num -= 10
      console.log(num);
      i--
      console.log(currentBoard);
    }
  }
  console.log(currentBoard);
  currentShip.isPlaced = true
  console.log('Place ship works');
  //console.log(currentBoard);
}
function isSquareValid(num) {
  //horzDirection need update
  //vertDirection need update
  //checkOverlap(num)
  let check = currentShip.length
  newNum = num % 10
  if (placeDirection === 'Horizontal' && horzDirection === 'LeftToRight') {
    if ((num < 100) && newNum + check <= 10) {
      console.log('isValid');
      console.log('horzDir: ' + horzDirection);
      return true
    }
  }
  horzDirection = 'RightToLeft'
  if (placeDirection === 'Horizontal' && horzDirection === 'RightToLeft') {
    if (num < 100 && newNum - check >= 1) {
      //console.log('isValid');
      //console.log('horzDir: ' + horzDirection);
      return true
    }
  }
  if (placeDirection === 'Vertical' && vertDirection === 'UpToDown') {
    console.log('check1');
    if (num < 100 && num + check * 10 <= 100) {
      //console.log('isValid');
      // console.log('vertDir: ' + vertDirection);
      return true
    }
  }
  vertDirection = 'DownToUp'

  if (placeDirection === 'Vertical' && vertDirection === 'DownToUp') {
    if (num < 100 && num - check * 10 > 0) {
      // console.log('isValid');
      // console.log('vertDir: ' + vertDirection);
      return true
    }
  }

  return false
}
function allShipsPlacedCheck(currentlist) {
  finished = currentlist.every(function (onBoard) {
    //console.log(finished);
    return onBoard.isPlaced
  })

  //currentlist = shipListSoviet
  console.log('All ships Checked: ' + finished);
}
function placementSwitchBoard(finished) {
  if (finished === false) {
    return
  }
  //console.log(currentBoard);
  if (currentBoard === boardUSA) {
    currentBoard = boardSoviet
    console.log('board Switched:' + currentBoard);
    console.log('1st list: ' + currentlist);
    currentlist = shipListSoviet

    console.log('list switched: ' + currentlist);
  }
}
function resetNavBoard() {
  //placePieceMessageEl.add()
  //horizontalBtn.add()
  //verticalBtn.add()
  finished = false
  placePieceMessageEl.textContent = 'Choose Vertical or Horizontal'
  console.log('nav reset');

}

function playerTurn() {
  return
}
//Need logic for if valid square is clicked for placement

//create Boards

function createBoard(nation) {
  const gameBoardRow = document.createElement('div')
  gameBoardRow.classList.add(`game-board`)
  gameBoardRow.style.backgroundColor = 'blue'
  gameBoardRow.id = nation
  //create 100 squares
  for (let i = 1; i < 101; i++) {

    gameBoard1.append(gameBoardRow)
    document.createElement('div')
    const square = document.createElement('div')
    square.classList.add('square')
    square.id = `sq${i}`
    gameBoardRow.append(square)
  }
}

//createBoard('Soviet')