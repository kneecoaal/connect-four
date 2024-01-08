/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const ROWS = 7;
const COLS = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[x][y])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[x][y])
 */

function makeBoard() {
  // complete*TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let x = 0; x < ROWS; x++) {
    board.push([]);
    for (let y = 0; y < COLS; y++) {
      board[x][y] = 0;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // complete* TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  const htmlBoard = document.getElementById("board");

  // complete*TODO: add comment for this code
  // Creating row of column tops and making it clickable
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < ROWS; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // complete*TODO: add comment for this code
  // Creating cells in the board representing position of each piece
  for (let y = 0; y < COLS; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < ROWS; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  // complete*TODO: write the real version of this, rather than always returning 0
  // Find the first available row from the bottom in the specified column
  for (let y = COLS - 1; y >= 0; y--) {
    if (board[x][y] === 0) {
      return y;
    }
  }
  // If the column is full, return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(x, y) {
  // complete*TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.setAttribute("class", `p${currPlayer}`);
  const cell = document.getElementById(`${x}-${y}`);
  cell.appendChild(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // complete*TODO: pop up alert message
  alert(msg);
  const board = document.getElementById("board");
  board.remove();
  const game = document.getElementById("game");
  let table = document.createElement("board");
  table.setAttribute("id", "board");
  game.appendChild(table);

  makeBoard();
  makeHtmlBoard();
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);

  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // complete*TODO: add line to update in-memory board
  placeInTable(x, y);
  board[x][y] = currPlayer;

  // switch players
  // complete*TODO: switch currPlayer 1 <-> 2

  if (currPlayer == 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // complete*TODO: check if all cells in board are filled; if so call, call endGame
  let isBoardFull = true;
  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      if (board[x][y] == 0) {
        isBoardFull = false;
      }
    }
  }
  if (isBoardFull == true) {
    endGame("It's a tie!");
  }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (x, y) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 && y < COLS && x >= 0 && x < ROWS && board[x][y] === currPlayer
    );
  }

  // complete*TODO: read and understand this code. Add comments to help you.
  // Winning combinations of four pieces
  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      const horiz = [
        [x, y],
        [x, y + 1],
        [x, y + 2],
        [x, y + 3],
      ];

      const vert = [
        [x, y],
        [x + 1, y],
        [x + 2, y],
        [x + 3, y],
      ];
      const diagDR = [
        [x, y],
        [x + 1, y + 1],
        [x + 2, y + 2],
        [x + 3, y + 3],
      ];
      const diagDL = [
        [x, y],
        [x + 1, y - 1],
        [x + 2, y - 2],
        [x + 3, y - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
