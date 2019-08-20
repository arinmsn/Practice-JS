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
  let grid = cGrid;

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
    moveUp = move(curRow, curCol, grid, directions.UP);
    if (moveUp.canMove == true) {
      nextStep.push(moveUp);
    }

    moveDown = move(curRow, curCol, grid, directions.DOWN);
    if (moveDown.canMove == true) {
      nextStep.push(moveDown);
    }

    moveLeft = move(curRow, curCol, grid, directions.LEFT);
    if (moveLeft.canMove == true) {
      nextStep.push(moveLeft);
    }

    moveRight = move(curRow, curCol, grid, directions.RIGHT);
    if (moveRight.canMove == true) {
      nextStep.push(moveRight);
    }

    // Test to see if we have no where to go - Exit!
    if (nextStep.length == 0) {
      noExit = true;
      break;
    }

    // Sorting nextstep by min. distance
    nextStep.sort((a, b) => a.minDistance - b.minDistance);

    switch (nextStep[0].direction) {
      case directions.UP:
        // Move up and add to the step count
        stepCount++;
        curRow = curRow + 1;
        break;
      case directions.DOWN:
        // Move down and add to the step count
        stepCount++;
        curRow = curRow - 1;
        break;
      case directions.LEFT:
        // Move left and add to the step count
        stepCount++;
        curCol = curCol - 1;
        break;
      case directions.RIGHT:
        // Move right and add to step count
        stepCount++;
        curCol = curCol + 1;
        break;
    }

    // Marking the Squares on the page
    exitReached = markElements(curRow, curCol, prevRow, prevCol, grid);
  } while (exitReached == false || noExit == true);
  if (exitReached == true) {
    document.getElementById(
      "results"
    ).innerHTML = `Success! It took ${stepCount} step(s).`;
  }
  //   } else {
  //     document.getElementById("results").innerHTML = "Cannot find an Exit!"; ////--------------------
  //   }
}

// Solve the Zero Hour mazes. Find the start and run to the exit.
// We do not know where it ends, just where it starts.

function solveMazeZH() {
  // Current grid user selected
  let grid = cGrid;

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

  // Find the start column. Known: Row 0
  exitRow = grid.length - 1;
  startRow = 0;
  startCol = grid[startRow].findIndex(isPath);

  curCol = startCol;
  curRow = startRow;

  // Mark the start of the path
  grid[startRow][startCol] = colValues.PATH;
  var elementID = `${startRow}:${startCol}`;
  document.getElementById(elementID).setAttribute("blockValue", "step");

  //solve the maze by looking for the next best step
  do {
    let nextStep = [];
    let prevRow = curRow;
    let prevCol = curCol;

    moveUp = moveZH(curRow, curCol, grid, directions.UP);
    if (moveUp.canMove == true) {
      nextStep.push(moveUp);
    }

    moveDown = moveZH(curRow, curCol, grid, directions.DOWN);
    if (moveDown.canMove == true) {
      nextStep.push(moveDown);
    }

    moveLeft = moveZH(curRow, curCol, grid, directions.LEFT);
    if (moveLeft.canMove == true) {
      nextStep.push(moveLeft);
    }

    moveRight = moveZH(curRow, curCol, grid, directions.RIGHT);
    if (moveRight.canMove == true) {
      nextStep.push(moveRight);
    }

    // If we have no where to go, exit
    if (nextStep.length == 0) {
      noExit = true;
      break;
    }

    // Sort next step by the target value
    nextStep.sort(function(a, b) {
      if (a.colValue > b.colValue) {
        return 1;
      }
      if (a.colValue < b.colValue) {
        return -1;
      }
      return 0;
    });

    // Pick the element that is closest to the exit. Choose Up or Down first.
    switch (nextStep[0].direction) {
      case directions.UP:
        // Move up and add to step count
        stepCount++;
        curRow = curRow + 1;
        break;
      case directions.DOWN:
        // Move Down and add to step count
        stepCount++;
        curRow = curRow - 1;
        break;
      case directions.LEFT:
        // Move left and add to step count
        stepCount++;
        curCol = curCol - 1;
        break;
      case directions.RIGHT:
        // Move right and add to step count
        stepCount++;
        curCol = curCol + 1;
        break;
    }
    // Mark the sqaures on the page
    if (curRow == exitRow) {
      exitCol = curCol;
    }

    exitReached = markElements(curRow, curCol, prevRow, prevCol, grid);
  } while (exitReached == false || noExit == true);
  if (exitReached == true) {
    document.getElementById(
      "results"
    ).innerHTML = `Success! It took ${stepCount} step(s)`;
  }
}

function move(curRow, curCol, grid, direction) {
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
  if (
    targetRow > grid.length - 1 ||
    targetRow < 0 ||
    targetCol > grid[targetRow].length ||
    targetCol < 0
  ) {
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
      colValue: targetVal
    };
  } else if (targetVal == colValues.OPEN) {
    return {
      canMove: true,
      minDistance: GetMinDistance(targetRow, targetCol),
      direction: direction,
      colValue: targetVal
    };
  } else if (targetVal == colValues.WALL || targetVal == colValues.DEADEND) {
    // Testing wether or not a wall is deadend
    // 't' stands for wall; 'fx' = deadend
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: targetVal
    };
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
    };
  }
  // Default return - If things go wrong...
  return {
    canMove: false,
    minDistance: -1,
    direction: direction,
    colValue: colValues.WALL
  };
}

function moveZH(curRow, curCol, grid, direction) {
  var targetRow = curRow;
  var targetCol = curCol;
  var targetVal = "";
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

  //check for out bounds
  if (
    targetRow > grid.length - 1 ||
    targetRow < 0 ||
    targetCol > grid[targetRow].length ||
    targetCol < 0
  ) {
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: colValues.WALL
    };
  }

  //get the value of the square we are trying to move to
  targetVal = grid[targetRow][targetCol];

  if (targetRow == startRow && targetCol == startCol) {
    //we cannot move back to start.
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: colValues.WALL
    };
  } else if (targetVal == colValues.OPEN) {
    //test if we can move to the target square.'f' means no wall
    //calculate the distance to the exit
    return {
      canMove: true,
      minDistance: -1,
      direction: direction,
      colValue: targetVal
    };
  } else if (targetVal == colValues.WALL || targetVal == colValues.DEADEND) {
    //test for a wall or deadend; 't' means wall, 'fx' means deadend
    return {
      canMove: false,
      minDistance: -1,
      direction: direction,
      colValue: targetVal
    };
  } else if (targetVal == colValues.PATH) {
    //if you have to go backwards to a previous marked square
    //we need to mark the current square as a dead end ('fx')
    //'fp' means square has already been marked
    return {
      canMove: true,
      minDistance: -1,
      direction: direction,
      colValue: targetVal
    };
  }

  return {
    canMove: false,
    minDistance: -1,
    direction: direction,
    colValue: colValues.WALL
  };
}

// Gets the minDistance between target and exit
function GetMinDistance(targetRow, targetCol) {
  // Steps required from current position to the exit
  return Math.abs(exitRow - targetRow) + Math.abs(exitCol - targetCol);
}

// Check to see if target has been visited before. Mark it as a deadend.
// Marking the grid
function markElements(targetRow, targetCol, prevRow, prevCol, grid) {
  var elementID = "";
  // Mark the target that we have already traveled as 'deadend'
  if (grid[targetRow][targetCol] == colValues.PATH) {
    grid[prevRow][prevCol] = colValues.DEADEND;
    elementID = `${prevRow}:${prevCol}`;
    document.getElementById(elementID).setAttribute("blockValue", "deadend"); // Orange
  }

  elementID = `${targetRow}:${targetCol}`;
  document.getElementById(elementID).setAttribute("blockValue", "step"); // Cornflowerblue
  grid[targetRow][targetCol] = colValues.PATH;

  // Testing for exit
  if (targetRow == exitRow && tragetCol == exitCol) {
    return true;
  } else {
    return false;
  }
}

// Test for path in the array
function isPath(element) {
  return element == "f";
}
