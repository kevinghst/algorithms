function bisectSquares(one, two){
  let oneCenter = [(one[0][0] + one[1][0])/2, (one[0][1] + one[1][1])/2];
  let twoCenter = [(two[0][0] + two[1][0])/2, (two[0][1] + two[1][1])/2];

  let xCoords = [one[0][0], one[1][0], two[0][0], two[1][0]];
  let yCoords = [one[0][1], one[1][1], two[0][1], two[1][1]];

  let xMax = Math.max(...xCoords);
  let xMin = Math.min(...xCoords);
  let yMax = Math.max(...yCoords);
  let yMin = Math.min(...yCoords);

  if (oneCenter[0] === twoCenter[0]) {
    return [[oneCenter[0], yMin], [oneCenter[0], yMax]];
  }

  if (oneCenter[1] === twoCenter[1]) {
    return [[xMin, oneCenter[1]], [xMax, oneCenter[1]]];
  }

  let slope = (oneCenter[1] - twoCenter[1])/(oneCenter[0] - twoCenter[0]);
  if(slope === 1){
    return [[xMin, yMin], [xMax, yMax]];
  }

  if(slope === -1){
    return [[xMin, yMax], [xMax, yMin]];
  }

  if(slope > 0 && slope < 1 || slope < 0 && slope > -1){
    let deltaXUpper = xMax - oneCenter[0];
    let yUpper = slope * deltaXUpper + oneCenter[1];

    let deltaXLower = xMin - oneCenter[0];
    let yLower = slope * deltaXLower + oneCenter[1];

    return[[xMin, yLower], [xMax, yUpper]];
  }

  if(slope > 1 || slope < -1){
    let deltaYUpper = yMax - oneCenter[1];
    let xUpper = (deltaYUpper / slope) + oneCenter[0];

    let deltaYLower = yMin - oneCenter[1];
    let xLower = (deltaYLower / slope) + oneCenter[1];

    return [[xLower, yMin], [xUpper, yMax]];
  }

}



function bestLine(graph){
  let line = [];
  let maximum = 0;
  let hash={};
  graph.forEach(function(point) {
    hash[point] = {};
    graph.forEach(function(other){
      if(point !== other){
        let slope = (other[1] - point[1])/(other[0] - point[0]);
        if(hash[point][slope]){
          hash[point][slope] = hash[point][slope] + 1;
        } else {
          hash[point][slope] = 1;
        }
        if(hash[point][slope] > maximum){
          maximum = hash[point][slope];
          line = [point, slope];
        }
      }
    });
  });
  return line;
}


function masterMind(solution, guess){
  let pseudohits = 0;
  let hitsNumber = 0;

  hits = {};

  for(i=0; i<4; i++){
    if (solution[i] === guess[i]){
      hitsNumber += 1;
      hits[solution[i]] = true;
    }
  }

  for(i=0; i<4; i++){
    if(typeof hits[guess[i]] === 'undefined'){
      for(j=0; j<4; j++){
        if(guess[i] === solution[j]){
          hits[guess[i]] = true;
          pseudohits += 1;
          break;
        }
      }
    }
  }
  return `pseudohits: ${pseudohits}, hits: ${hitsNumber}`;
}

function subSort(array){
  let start = null;
  let end = null;
  let max = array[0];
  let min = array[array.length-1];

  for(let i=0; i<array.length-1; i++){
    if(array[i+1] < array[i]){
      start = i+1;
      max = array[i];
      break;
    }
  }

  if (start === null){
    return "array already sorted";
  }

  for(let x=array.length-1; x>0; x--){
    if(array[x-1] > array[x]){
      end = x-1;
      min = array[x];
      break;
    }
  }

  for(let w=start; w<=end; w++){
    if(array[w] > max){
      max = array[w];
    }
    if(array[w] < min){
      min = array[w];
    }
  }

  for(let i=0; i<array.length; i++){
    if(min < array[i]){
      start = i;
      break;
    }
  }

  for(let j=array.length-1; j>=0; j--){
    if(max > array[j]){
      end = j;
      break;
    }
  }


  return [start, end];
}



function contigSeq(array, biggest, prev){
  if (array.length === 0){
    return biggest;
  }
  else {
    if(array[0] > biggest){
      biggest = array[0];
    }

    if(array[0] > 0){
      if(prev !== null){
        prev = prev + array[0];
        if (prev > biggest){
          biggest = prev;
        }
        return contigSeq(array.slice(1,array.length), biggest, prev);
      } else {
        return contigSeq(array.slice(1,array.length), biggest, array[0]);
      }
    } else {
      if(prev === null){
        return contigSeq(array.slice(1,array.length), biggest, null);
      } else {
        if(prev + array[0] > 0){
          prev = prev + array[0];
          return contigSeq(array.slice(1,array.length), biggest, prev);
        } else {
          return contigSeq(array.slice(1,array.length), biggest, null);
        }
      }
    }
  }
}

function contigSeqIter(array){
  let maxSum = array[0];
  let sum = 0;

  for(i=0; i<array.length; i++){
    if(array[i] > maxSum){
      maxSum = array[i];
    }
    if(sum + array[i] > 0){
      sum += array[i];
      if(sum > maxSum){
        maxSum = sum;
      }
    } else {
      sum = 0;
    }

  }
  return maxSum;
}



function patternMattching(pattern, value){

}

console.log
