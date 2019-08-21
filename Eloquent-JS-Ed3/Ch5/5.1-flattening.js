/*
    Instructions: 

    Use the reduce method in combination with the concat method to
    “flatten” an array of arrays into a single array that has all
    the elements of the original arrays.

    let arrays = [[1, 2, 3], [4, 5], [6]];
    // Your code here.
    // → [1, 2, 3, 4, 5, 6]

*/

var flattened = arrays.reduce(function(accumulator, currentValue) {
  return accumulator.concat(currentValue);
}, []);
console.log(flattened);

// Utilizing the arrow function
var flattenedArrow = arrays.reduce(
  (accumulator, currentValue) => accumulator.concat(currentValue),
  []
);
console.log(flattenedArrow);

// Book Solution
console.log(arrays.reduce((flat, current) => flat.concat(current), []));
