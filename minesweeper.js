document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

function createBoard (matrix) {
  for (var i = 0; i < matrix; i++) {
    for (var l = 0; l < matrix; l++) {
      board.cells.push ({
        row: i,
        col: l,
        isMine: Boolean(Math.round(Math.random() >= 0.8)),
        isMarked: false,
        hidden: true
      })
    }
  }

}

function startGame () {

  createBoard (6);

  document.addEventListener("click", checkForWin);

  document.addEventListener("contextmenu", checkForWin);

  // Don't remove this function call: it makes the game work!
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  };
  
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  var win = [];
  
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].isMarked === true || board.cells[i].isMine === false && board.cells[i].hidden === false) {
      win++
    } if (win == board.cells.length) {
    lib.displayMessage('You win!')
    }
  };
  // // You can use this function call to declare a winner (once you've
  // // detected that they've won, that is!)
  
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);

  var count = [];

  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count++;
    };
  };

  return count;
}