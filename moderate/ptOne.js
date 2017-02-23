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


function intersection(lineOne, lineTwo) {
  let lineOneYFirst = lineOne[0][1];
  let lineOneYSecond = lineOne[1][1];
  let lineTwoYFirst = lineTwo[0][1];
  let lineTwoYSecond = lineTwo[1][1];

  let lineOneXFirst = lineOne[0][0];
  let lineOneXSecond = lineOne[1][0];
  let lineTwoXFirst = lineTwo[0][0];
  let lineTwoXSecond = lineTwo[1][0];

  if (lineOneYFirst > lineTwoYFirst && lineOneYFirst > lineTwoYSecond && lineOneYSecond > lineTwoYFirst && lineOneYSecond > lineTwoYSecond){
    return false;
  }

  if (lineOneYFirst < lineTwoYFirst && lineOneYFirst < lineTwoYSecond && lineOneYSecond < lineTwoYFirst && lineOneYSecond < lineTwoYSecond){
    return false;
  }

  if (lineOneXFirst > lineTwoXFirst && lineOneXFirst > lineTwoXSecond && lineOneXSecond > lineTwoXFirst && lineOneXSecond > lineTwoXSecond){
    return false;
  }

  if (lineOneXFirst < lineTwoXFirst && lineOneXFirst < lineTwoXSecond && lineOneXSecond < lineTwoXFirst && lineOneXSecond < lineTwoXSecond){
    return false;
  }
  return true;
}

console.log(intersection([[1,4],[9,9]], [[2,9],[10,4]]));
