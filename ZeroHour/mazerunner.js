const directions = {
  UP: "up",
  LEFT: "left",
  RIGHT: "right",
  DOWN: "down"
};

const colValues = {
  WALL: "t",
  OPEN: "f",
  PATH: "fp",
  DEADEND: "fx"
};

// Setup the start and exit
var startRow = 0;
var startCol = 0;
var exitRow = 3;
var exitCol = 0;

function solveMaze() {
  // Current grid user selected
  var grid = cGrid;

  // Current Row and Column
  var curRow = 0;
  var curCol = 0;

  // Last Row and Col - Have we traveled here before?
  var prevRow = 0;
  var prevCol = 0;
  var stepCount = 0;
  // No more moves left - need to exit.
  var exitReached = false;
  var noExit = false;
  var minDistance = -1;
  var nextDirection;
  var moveUp = {};
  var moveLeft = {};
  var moveRight = {};
  var moveDown = {};

  // Marking the start of the grid - Space is marked as 'fp' and color blue
  grid[startRow][startCol] = colValues.PATH;
  var elementID = `${startRow}:${startCol}`;
  document.getElementById(elementID).setAttribute("blockValue", "step");
}
