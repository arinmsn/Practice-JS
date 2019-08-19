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

  // Solve the maze
  do {
    let nextStep = [];
    let prevRow = curRow;
    let prevCol = curCol;
    // Test for our moves
    moveUP = move(curRow, curCol, grid, directions.UP);

  } while (exitReached == false || noExit == true);
  if (exitReached == true) {
    document.getElementById(
      "results"
    ).innerHTML = `Success! It took ${stepCount} step(s).`;
  } else {
    document.getElementById("results").innerHTML = "Cannot find an Exit!";
  }
}

move(curRow, curCol, grid, direction) {
    var targetRow = curRow;
    var targetCol = curCol;
    var targetVal = "";
    // Can we move there?
    var canMove = false;
    var minDistance = -1;

    switch (direction) {
        case directions.UP:
            targetRow = curRow + 1;
            break;
        case directions.LEFT:
            targetCol = curCol - 1;
            break;
        case directions.RIGHT:
            targetCol = curCol + 1;
            break;
        case directions.DOWN:
            targetRow = curRow - 1;
            break;
    }

    // Check wether or not we are out of bounds
    if (targetRow > grid.length - 1 || targetRow < 0 || targetCol > grid[targetRow].length || targetCol < 0){
        return {
            canMove: false,
            minDistance: -1,
            direction: direction,
            colValue: colValues.WALL
        };
    }

    // Get the value of the square user is trying to go to
    targetVal = grid[targetRow][targetCol];

    if (targetRow == startRow && targetCol == startCol) {
        // We cannot move back to the start position.
        return {
            canMove: false,
            minDistance: -1,
            direction: direction,
            colValue: colValues.WALL
        };
    } else if (targetVal == colValues.WALL || targetVal == colValues.DEADEND) {
        // Testing wether or not a wall is deadend
        // 't' stands for wall; 'fx' = deadend
        return {
            canMove: false,
            minDistance: -1,
            direction: direction,
            colValue: targetVal
        }
    } else if (targetVal == colValues.PATH) {
        /*  
            if you have to go backwards to a previous marked square
            we need to mark the current square as deadend ('fx')
            'fp' stands for 'already marked square'
        */
       return {
           canMove: true,
           minDistance: GetMinDistance(targetRow, targetCol),
           direction: direction,
           colValue: targetVal
       }
    }
    // Default return - If things go wrong...
    return {
        canMove: false,
        minDistance: -1,
        direction: direction,
        colValue: colValues.WALL
    }
}

