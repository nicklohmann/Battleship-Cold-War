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
    if (this.nation === 'USA') {
      USACount--
      checkWinner()
    }
    if (this.nation === 'Soviet') {
      SOVCount--
      checkWinner()
    }
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
let shipListUSA = [carrierUSA, battleshipUSA, cruiserUSA, submarineUSA, destroyerUSA]
let shipListSoviet = [carrierSoviet, battleshipSoviet, cruiserSoviet, submarineSoviet, destroyerSoviet]
let allShipsList = [carrierUSA, battleshipUSA, cruiserUSA, submarineUSA, destroyerUSA, carrierSoviet, battleshipSoviet, cruiserSoviet, submarineSoviet, destroyerSoviet]
let currentlist
let currentBoard
let currentShip
let finished = false
let num
let nation = 'USA'
let vertOrHor = 'Vertical'
let placeDirection
let vertDirection = 'UpToDown'
let horzDirection = 'LeftToRight'
let currentShipIndex = 0
let booleanSetUpComplete = false
let USACount = 5
let SOVCount = 5
let shipHit
let boardCounter = 0
const sovMemoryArray = []
const usaMemoryArray = []
let clicked
/*------------------------ Cached Element References ------------------------*/
let placePieceMessageEl = document.querySelector('#directionBtn')
let pieceSelectionMessageEl = document.querySelector('#PlacePiece')
let hitMissMessageEl = document.querySelector('#HitMiss')
const board1El = document.querySelector('.board')
let verticalBtn = document.querySelector('#Vertical')
let horizontalBtn = document.querySelector('#Horizontal')
let resetBtn = document.querySelector('#Reset')
let gameBoard1 = document.querySelector('#board1Container')
let gameBoard2 = document.querySelector('#board2Container')
let placeCurrentShipMessageEl = document.querySelector('#PlacePiece')
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', init)
verticalBtn.addEventListener('click', updateNavBoard)
horizontalBtn.addEventListener('click', updateNavBoard)
gameBoard1.addEventListener('click', handleClick)
gameBoard2.addEventListener('click', handleClick)
gameBoard1.addEventListener('click', sovAttack)
gameBoard2.addEventListener('click', usaAttack)
resetBtn.addEventListener('click', reset)
/*-------------------------------- Functions -------------------------------*/
//---------------------------------------Set-Up-Phase-------------------------------//
function init(Event) {
  nation = 'USA'
  createBoard(nation)
  initBoards()
  horizontalBtn.style.visibility = 'visible';
  verticalBtn.style.visibility = 'visible';
  gameBoard1.style.visibility = 'visible'
  currentShipIndex = 0
  currentlist = shipListUSA
  currentBoard = boardUSA
  currentShip = shipListUSA[0]
  placePieceMessageEl.textContent = 'Choose Vertical or Horizontal'
  placeCurrentShipMessageEl.textContent = ` `
  hitMissMessageEl.textContent = ' '
}
function initBoards() {
  for (let i = 1; i <= 100; i++) {
    boardUSA.push(i)
  }
  for (let i = 1; i <= 100; i++) {
    boardSoviet.push(i)
  }
}
function switchShip(booleanComplete) {
  if (booleanComplete === true) {
    return
  }
  if (currentShip.isPlaced === true) {
    currentShipIndex++
    currentShip = currentlist[currentShipIndex]
    placeCurrentShipMessageEl.textContent = `Click square for ${currentShip.name} placement`
  }
}
function checkOverlap(num) {
  let helperArray = []
  let overlap = currentShip.length
  if ((placeDirection === 'Horizontal') && (horzDirection === 'LeftToRight')) {
    while (overlap != 0) {
      helperArray.push(currentBoard[num])
      num++
      overlap--
    }
    if (!helperArray.every((el) => el > 0)) {
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
    if (!helperArray.every((el) => el > 0)) {
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
      return true
    }
    return false
  }
  return false
}
function renderShipsSetup() {
  placeShip(num)
  allShipsPlacedCheck(currentlist)
  switchShip(finished)
  placementSwitchBoard(finished)
  console.log(finished);
  console.log(nation);
  if (finished === true && nation === 'USA') {
    console.log('reset');
    resetNavBoard()
  }
  checkEndOfSetup()
  if (booleanSetUpComplete === true) {
    enterGameNav()
  }
}
function handleClick(evt) {
  if (placePieceMessageEl.textContent === 'Choose Vertical or Horizontal') {
    return
  }
  if (finished === true) {
    return
  }
  clicked = evt.target.id
  let isSquare = clicked.slice(0, 5)
  if (isSquare != `${nation}sq`) {
    return
  }
  evt.target
  num = clicked.slice(5)
  if (booleanSetUpComplete === false) {
    renderShipsSetup()
  }
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
  placeCurrentShipMessageEl.textContent = `Click square for ${currentShip.name} placement`
}
function placeShip(num) {
 // console.log("ran:" + clicked)
  horzDirection = 'LeftToRight'
  vertDirection = 'UpToDown'
  num = parseInt(num, 10)
  let i = currentShip.length
  if (isSquareValid(num) === true && checkOverlap(num) === true) {
    placeCurrentShipMessageEl.textContent = `Pick valid square for ${currentShip.name}`
    return
  }
  if ((placeDirection === 'Horizontal') && (horzDirection === 'LeftToRight')) {
    while (i != 0) {
      currentBoard[num] = currentShip
      num++
      i--
  
    }
  }
  if (placeDirection === 'Horizontal' && horzDirection === 'RightToLeft') {
    while (i != 0) {
      currentBoard[num] = currentShip
      num--
      i--
    
    }
  }
  if (placeDirection === 'Vertical' && vertDirection === 'UpToDown') {
    while (i != 0) {
      currentBoard[num] = currentShip
      num += 10
      i--
    }
  }
  if (placeDirection === 'Vertical' && vertDirection === 'DownToUp') {
    while (i != 0) {
      currentBoard[num] = currentShip
      num -= 10
      i--
    }
  }
  //console.log(currentBoard);
  currentShip.isPlaced = true
}
function isSquareValid(num) {
  let check = currentShip.length
  newNum = num % 10
  if (placeDirection === 'Horizontal' && horzDirection === 'LeftToRight') {
    if ((num < 100) && newNum + check <= 10) {
      return true
    }
  }
  horzDirection = 'RightToLeft'
  if (placeDirection === 'Horizontal' && horzDirection === 'RightToLeft') {
    if (num < 100 && newNum - check >= 1) {
      return true
    }
  }
  if (placeDirection === 'Vertical' && vertDirection === 'UpToDown') {
    if (num < 100 && num + check * 10 <= 100) {
      return true
    }
  }
  vertDirection = 'DownToUp'
  if (placeDirection === 'Vertical' && vertDirection === 'DownToUp') {
    if (num < 100 && num - check * 10 > 0) {
      return true
    }
  }
  return false
}
function allShipsPlacedCheck(currentlist) {
  finished = currentlist.every(function (onBoard) {
    return onBoard.isPlaced
  })
}
function placementSwitchBoard(finished) {
  if (finished === false) {
    return
  }
  if (currentBoard === boardUSA) {
    currentBoard = boardSoviet
    currentlist = shipListSoviet
    currentShip = currentlist[0]
    currentShipIndex = 0
  }
}
function resetNavBoard() {
  placePieceMessageEl.textContent = 'Choose Vertical or Horizontal'
  placeCurrentShipMessageEl.textContent = `Click square for ${currentShip.name} placement`
  finished = false
  nation = 'SOV'
  console.log(boardCounter);
  if (boardCounter === 0) {
    createBoard(nation)
    boardCounter++
  }
  gameBoard1.style.visibility = 'hidden'

}
function playerTurn() {
  return
}
function createBoard(nation) {
  if (nation === 'USA') {
    const gameBoardRow = document.createElement('div')
    gameBoardRow.classList.add(`game-board`)
    gameBoardRow.style.backgroundColor = 'blue'
    gameBoardRow.id = nation
    for (let i = 1; i < 101; i++) {
      gameBoard1.append(gameBoardRow)
      const square = document.createElement('div')
      square.classList.add('square')
      square.id = `${nation}sq${i}`
      gameBoardRow.append(square)
    }
  }
  if (nation === 'SOV') {
    const nextGameBoardRow = document.createElement('div')
    nextGameBoardRow.classList.add(`game-board`)
    nextGameBoardRow.style.backgroundColor = 'gold'
    nextGameBoardRow.id = nation
    for (let i = 1; i < 101; i++) {
      gameBoard2.append(nextGameBoardRow)
      const square = document.createElement('div')
      square.classList.add('square')
      square.id = `${nation}sq${i}`
      nextGameBoardRow.append(square)
    }
  }
}
function checkEndOfSetup() {
  if (destroyerSoviet.isPlaced === true) {
    booleanSetUpComplete = true
  }
}
//-------------------------------Gameplay-Phase-------------------------------//
function enterGameNav() {
  gameBoard1.style.visibility = 'visible'
  nation = 'USSR'
  placePieceMessageEl.textContent = `${nation}'s turn to attack! Click square on enemy board.`
  horizontalBtn.style.visibility = 'hidden';
  verticalBtn.style.visibility = 'hidden';
  pieceSelectionMessageEl.textContent = `You need to sink ${USACount} more ships!`
  return
}
function sovAttack(evt) {
  if (checkWinner() === true) {
    return
  }
  if (!booleanSetUpComplete) {
    return
  }
  if (nation != 'USSR') {
    return
  }
  const atkClick = evt.target.id
  let enemySquare = atkClick.slice(0, 5)
  let atk = atkClick.slice(5)
  let memory = atk
  if (checkIfPrevAtk(sovMemoryArray, memory) === true) {
    createAtkErrorMessage()
    return
  }
  if (enemySquare != 'USAsq') {
    return
  }
  shipHit = boardUSA[atk].name
  if (shipHit === undefined) {
    evt.target.style.backgroundColor = 'white'
    evt.target.textContent = ''
    evt.target.style.color = ''
    hitMissMessageEl.textContent = `Miss!`
    switchTurn()
    return
  }
  helperCheckEachShipNameUSA(shipHit)
  evt.target.style.backgroundColor = 'black'
  evt.target.textContent = 'X'
  evt.target.style.color = 'red'
  hitMissMessageEl.textContent = `Hit!`
  pieceSelectionMessageEl.textContent = `You hit the enemy ${shipHit}`
  sovMemoryArray.push(memory)
  checkWinner()
  switchTurn()
  return
}
function usaAttack(evt) {
  if (checkWinner() === true) {
    return
  }
  if (!booleanSetUpComplete) {
    return
  }
  if (nation != 'USA') {
    return
  }
  const atkClick = evt.target.id
  let enemySquare = atkClick.slice(0, 5)
  let atk = atkClick.slice(5)
  let memory = atk
  if (checkIfPrevAtk(usaMemoryArray, memory) === true) {
    createAtkErrorMessage()
    return
  }
  if (enemySquare != 'SOVsq') {
    return
  }
  shipHit = boardSoviet[atk].name
  if (shipHit === undefined) {
    evt.target.style.backgroundColor = 'white'
    hitMissMessageEl.textContent = `Miss!`
    switchTurn()
    return
  }
  helperCheckEachShipNameSoviet(shipHit)
  evt.target.style.backgroundColor = 'black'
  evt.target.textContent = 'X'
  evt.target.style.color = 'red'
  hitMissMessageEl.textContent = `Hit!`
  pieceSelectionMessageEl.textContent = `You hit the enemy ${shipHit}`
  usaMemoryArray.push(memory)
  switchTurn()
  return
}
function checkIfPrevAtk(arr, val) {
  return arr.some((arrVal) => val === arrVal);
}
function switchTurn() {
  if (nation === 'USSR') {
    nation = 'USA'
    renderTurns()
    return
  }
  nation = 'USSR'
  renderTurns()
  return
}
function createAtkErrorMessage() {
  pieceSelectionMessageEl.textContent = `Cant attack that square again!`
}


function renderTurns() {
  placePieceMessageEl.textContent = `${nation}'s turn to attack! Click square on enemy board.`
  if (nation === 'USSR') {
    pieceSelectionMessageEl.textContent = `You need to sink ${USACount} more ships!`
  }
  if (nation === 'USA') {
    pieceSelectionMessageEl.textContent = `You need to sink ${SOVCount} more ships!`
  }
}
function checkWinner() {
  if (SOVCount === 0) {
    hitMissMessageEl.textContent = `All of USSR's Ships are Sunk!`
    placePieceMessageEl.textContent = `USA WINS!!!`
    pieceSelectionMessageEl.textContent = ``
    placeCurrentShipMessageEl.textContent = ``
    return true
  }
  if (USACount === 0) {
    hitMissMessageEl.textContent = `All of USA's Ships are Sunk!`
    placePieceMessageEl.textContent = `USSR WINS!!!`
    pieceSelectionMessageEl.textContent = ``
    placeCurrentShipMessageEl.textContent = ``
    return true
  }
  return false
}
//-------------------------------Helper-Methods-------------------------------//
function helperCheckEachShipNameSoviet() {
  if (shipHit === 'carrier') {
    carrierSoviet.hit()
    return
  } else if (shipHit === 'battleship') {
    battleshipSoviet.hit()
    return
  } else if (shipHit === 'cruiser') {
    cruiserSoviet.hit()
    return
  } else if (shipHit === 'submarine') {
    submarineSoviet.hit()
    return
  } else if (shipHit === 'destroyer') {
    destroyerSoviet.hit()
  } else
    return
}
function helperCheckEachShipNameUSA() {
  if (shipHit === 'carrier') {
    carrierUSA.hit()
  } else if (shipHit === 'battleship') {
    battleshipUSA.hit()
  } else if (shipHit === 'cruiser') {
    cruiserUSA.hit()
  } else if (shipHit === 'submarine') {
    submarineUSA.hit()
  } else if (shipHit === 'destroyer') {
    destroyerUSA.hit()
  }
  else
    return
}
//-------------------------------Reset-Functionality-------------------------------//
function reset(evt) {
  nation = 'USA'
  //gameBoard2.style.visibility = 'hidden'
  boardSoviet = []
  boardUSA = []
  boardCounter = 0
  finished = false;
  booleanSetUpComplete = false
  placeCurrentShipMessageEl.textContent = ` `
  resetShips()
  resetBoards()
  init()
}
function resetShips() {
  allShipsList.forEach(element => {
    element.hitCount = 0;
    element.isPlaced = false
    element.isSunk = false
  });
}

function resetBoards(){
  gameBoard1.innerHTML = ""
  gameBoard2.innerHTML = ""
  return
}
