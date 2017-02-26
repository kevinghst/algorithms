function bisectSquares(one, two){
  let oneCenter = [(one[0][0] + one[1][0])/2, (one[0][1] + one[1][1])/2];
  let twoCenter = [(two[0][0] + two[1][0])/2, (two[0][1] + two[1][1])/2];

  let xCoords = [one[0][0], one[1][0], two[0][0], two[1][0]];
  let yCoords = [one[0][1], one[1][1], two[0][1], two[1][1]];

  if (oneCenter[0] === twoCenter[0]) {
    return [[oneCenter[0], Math.min(...yCoords)], [oneCenter[0], Math.max(...yCoords)]];
  }

  if (oneCenter[1] === twoCenter[1]) {
    return [[Math.min(...xCoords), oneCenter[1]], [Math.max(...xCoords), oneCenter[1]]];
  }
}



console.log(bisectSquares([[2,1], [3,2]], [[6,3],[9,6]]));
