const grid1 = [
  ["f", "f", "f", "f"],
  ["t", "t", "f", "t"],
  ["f", "f", "f", "f"],
  ["f", "f", "f", "f"]
];

const grid2 = [
  ["f", "f", "f", "f", "f"],
  ["t", "t", "f", "t", "f"],
  ["f", "f", "f", "f", "f"],
  ["f", "t", "f", "f", "f"]
];

const grid3 = [
  ["t", "f", "t", "t", "t"],
  ["f", "f", "t", "t", "t"],
  ["f", "t", "f", "f", "f"],
  ["f", "f", "f", "t", "f"],
  ["t", "t", "t", "f", "f"],
  ["t", "t", "t", "f", "t"]
];

const grid4 = [
  ["t", "t", "t", "t", "f"],
  ["f", "f", "f", "t", "f"],
  ["f", "t", "f", "t", "f"],
  ["f", "t", "f", "t", "f"],
  ["f", "t", "f", "f", "f"],
  ["f", "t", "t", "t", "t"]
];

const grid5 = [
  ["t", "f", "t", "t", "t"],
  ["t", "f", "f", "f", "f"],
  ["t", "t", "t", "t", "f"],
  ["f", "f", "f", "t", "f"],
  ["f", "t", "f", "f", "f"],
  ["f", "t", "t", "t", "t"]
];

// Boolean global variable - current grid that's selected
cGrid = [];

// Render rows and columns for a grid
function displayGrid(grid, title) {
  let resultsHTML = "";
  cGrid = grid;
  // Change title based on which grid user has selected
  document.getElementById("gridTitle").innerHTML = title;
  // Set color of the grid based on value of title of grid
  // We have a 'default' color tag in html code
  if (title.includes("void")) {
    document.getElementById("gridTitle").setAttribute("colorValue", "void");
  } else if (title.includes("arc")) {
    document.getElementById("gridTitle").setAttribute("colorValue", "arc");
  } else if (title.includes("solar")) {
    document.getElementById("gridTitle").setAttribute("colorValue", "solar");
  } else if (title.includes("gridTitle")) {
    document
      // Fallback 'default' value
      .getElementById("gridTitle")
      .setAttribute("colorValue", "default");
  }

  // Loop through and inverse the grid
  // Top row is position '0'; we want it to be on bottom
  for (irow = cGrid.length - 1; irow >= 0; irow--) {
    let rowVal = "";
    let blockVal = "";
    let colVal = "";
    // To ensure that each column has a unique name
    let name = "";
    // Loop through columns
    for (icol = 0; icol < cGrid[irow].length; icol++) {
      // 4 choices for blockVal
      // Deadend, Area we can walk, Area we have walked, & Wall
      blockVal = cGrid[irow][icol];
      switch (cGrid[irow][icol].toLowerCase()) {
        case "t":
          blockVal = "wall";
          break;
        case "f":
          blockVal = "path";
          break;
        case "fp": // If we have walked there already
          blockVal = "path";
          // Reset Grid value
          cGrid[irow][icol] = "f";
          break;
        case "fx": // Dead end
          blockVal = "path";
          cGrid[irow][icol] = "f";
          break;
      }
      colVal = cGrid[irow][icol];
      name = `${irow}:${icol}`;
      rowVal += renderColumn(colVal, blockVal, name);
    }
    resultsHTML += renderRow(rowVal);
  }
  document.getElementById("gridDisplay").innerHTML = resultsHTML;
}

// Template fn to render grid columns
function renderColumn(colVal, blockVal, name) {
  return `<td id="${name}" blockvalue="${blockVal}" class="gridStyle">
                ${colVal}
            </td>`;
}

function renderRow(rowVal) {
  return `<tr h-100>
                ${rowVal}
            </tr>`;
}
