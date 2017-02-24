function NumberSwapper() {
  a = a + b;
  b = a - b;
  a = a - b;
}

function wordFrequencies(array, word, hash) {
  if (hash === null) {
    let hash = [];
    for(i=0; i<array.length; i++) {
      if (hash[array[i]]) {
        hash[array[i]] += 1;
      } else {
        hash[array[i]] = 1;
      }
    }
    return [hash[word], hash];
  } else {
    return hash[word];
  }
}


function intersection(first, second) {
  debugger
  if(first[0][0] > second[0][0] && first[0][0] > second[1][0] && first[1][0] > second[0][0] && first[1][0] > second[1][0]){
    return false;
  }
  if(first[0][0] < second[0][0] && first[0][0] < second[1][0] && first[1][0] < second[0][0] && first[1][0] < second[1][0]){
    return false;
  }

  let firstSmallerX;
  let firstBiggerX;
  let secondSmallerX;
  let secondBiggerX;

  let firstSmallerY;
  let firstBiggerY;
  let secondSmallerY;
  let secondBiggerY;

  if(first[0][0] > first[1][0]){
    firstSmallerX = first[1][0];
    firstBiggerX = first[0][0];
    firstSmallerY = first[1][1];
    firstBiggerY = first[0][1];
  } else {
    firstBiggerX = first[1][0];
    firstSmallerX = first[0][0];
    firstBiggerY = first[1][1];
    firstSmallerY = first[0][1];
  }

  if(second[0][0] > second[1][0]){
    secondSmallerX = second[1][0];
    secondBiggerX = second[0][0];
    secondSmallerY = second[1][1];
    secondBiggerY = second[0][1];
  } else {
    secondBiggerX = second[1][0];
    secondSmallerX = second[0][0];
    secondBiggerY = second[1][1];
    secondSmallerY = second[0][1];
  }

  let slopeSecond = (second[1][1] - second[0][1])/(second[1][0] - second[0][0]);
  let slopeFirst = (first[1][1] - first[0][1])/(first[1][0] - first[0][0]);


  if (firstSmallerX > secondSmallerX) {
    secondSmallerY = slopeSecond * (firstSmallerX - secondSmallerX) + secondSmallerY;
  } else {
    firstSmallerY = slopeFirst * (secondSmallerX - firstSmallerX) + firstSmallerY;
  }

  if (firstBiggerX > secondBiggerX) {
    firstBiggerY = slopeFirst * (secondBiggerX - firstSmallerX) + firstSmallerY;
  } else {
    secondBiggerY = slopeSecond * (firstBiggerX - secondSmallerX) + secondSmallerY;
  }

  if (firstBiggerY > secondBiggerY && firstSmallerY > secondSmallerY){
    return false;
  } else if (firstBiggerY < secondBiggerY && firstSmallerY < secondSmallerY){
    return false;
  } else {
    return true;
  }
}

function ticTacWin(board) {
  if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
    return true;
  } else if (board[2][0] !== null && board[2][0] === board[1][1] && board[1][1] === board[0][2]){
    return true;
  }

  for(let i=0; i<3; i++){
    if (board[i][0] !== null && board[i][1] === board[i][0] && board[i][2] === board[i][1]){
      return true;
    }
    if (board[0][i] !== null && board[1][i] === board[0][i] && board[2][i] === board[1][i]){
      return true;
    }
  }
  return false;
}


function facZeros(number){
  let sum = 0;
  for(let i = number; i >= 1; i--){
    if(i % 5 === 0){
      sum += getFives(i);
    }
  }
  return sum;
}

function getFives(i){
  result = 0;
  while(i%5===0){
    i = i/5;
    result += 1;
  }
  return result;
}


function smallestDiff(one, two){

}

let one = [1,3,15,11,2];
let two = [23,127,235,19,8];
console.log(smallestDiff(one,two));
