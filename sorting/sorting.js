function ListySearch(array, value) {
  let i = 0;
  let idx = Math.pow(2, i) - 1;
  while (array[idx] > 0) {
    if (array[idx] === value) {
      return idx;
    }
    else if (array[idx] > value) {
      break;
    } else {
      i += 1;
      idx = Math.pow(2, i) - 1;
    }
  }

  let upper_bd = idx;
  let lower_bd = Math.pow(2, i-1) -1;
  return BinSearch(array, lower_bd, upper_bd, value);
}

function BinSearch(array, lower_bd, upper_bd, value) {
  if (lower_bd > upper_bd) {
    return null;
  } else {
    let mid = Math.floor((upper_bd + lower_bd)/2);
    if (array[mid] === value) {
      return mid;
    } else {
      if (array[mid] < 0 || array[mid] > value) {
        let left_value = BinSearch(array, lower_bd, mid-1, value);
        if(left_value) {
          return left_value;
        } else {
          return null;
        }
      } else {
        let right_value = BinSearch(array, mid+1, upper_bd, value);
        if(right_value){
          return right_value;
        } else {
          return null;
        }
      }
    }
  }
}


function SparseSearch(string, array){
  if (array.length < 1) {
    return null;
  } else {
    let mid = Math.floor(array.length / 2);
    if (array[mid] === string) {
      return mid;
    } else {
      if (array[mid] === "") {
        let left_pos = mid-1;
        let right_pos = mid+1;
        let new_mid = null;
        while (left_pos >= 0 || right_pos < array.length) {
          if (array[right_pos] !== "") {
            if (array[right_pos] === string) { return right_pos; } else {
              new_mid = right_pos;
              break;
            }
          }

          if (array[left_pos] !== "") {
            if (array[left_pos] === string) { return left_pos; } else {
              new_mid = left_pos;
              break;
            }
          }
          left_pos += 1;
          right_pos += 1;
        }
        if (new_mid) {
          mid = new_mid;
        } else {
          return null;
        }
      }

    let left = array.slice(0, mid);
    let right = array.slice(mid+1, array.length);

    if (array[mid] > string){
      let left_answer = SparseSearch(string, left);
      if(left_answer === null) {
        return null;
      } else {
        return left_answer;
      }
    } else {
      let right_answer = SparseSearch(string, right);
      if(right_answer === null) {
        return null;
      } else {
        return 1 + left.length + right_answer;
      }
    }
    }
  }
}


function FindDuplicates(array) {
  let bitVector = new Array(8);
  bitVector.fill(0);

  for(i=0; i<array.length; i++){
    if (bitVector[array[i]] === 1) {
      console.log(array[i]);
    } else {
      bitVector[array[i]] = 1;
    }
  }
}

function findLowerBound(array, value) {
  if (array.length <= 1){
    return null;
  } else {
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid+1, array.length);

    if (array[mid][0] === value) {
      return [mid, 0];
    } else {
      if (array[mid][0] > value) {
        if (typeof array[mid-1] === 'undefined'){
          return null;
        } else if (array[mid-1][0] === value) {
          return [mid-1, 0];
        } else if (array[mid-1][0] < value) {
          return mid-1;
        } else {
          let first = findLowerBound(left, value);
          if (first !== null) {
            return first;
          } else {
            return null;
          }
        }
      } else {
        if (typeof array[mid+1] === 'undefined'){
          return null;
        } else if (array[mid+1][0] === value) {
          return [mid+1, 0];
        } else if (array[mid+1][0] > value) {
          return mid;
        } else {
          let second = findLowerBound(right, value);
          if (second !== null) {
            return 1 + left.length + second;
          } else {
            return null;
          }
        }
      }
    }
  }
}

function findUpperBound(array, value, length) {
  if (array.length <= 1){
    return null;
  } else {
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid+1, array.length);

    if (array[mid][length-1] === value) {
      return [mid, length-1];
    } else {
      if (array[mid][length-1] > value) {
        if (typeof array[mid-1] === 'undefined'){
          return null;
        } else if (array[mid-1][length-1] === value) {
          return [mid-1, length-1];
        } else if (array[mid-1][length-1] < value) {
          return mid;
        } else {
          let first = findUpperBound(left, value, length);
          if (first !== null) {
            return first;
          } else {
            return null;
          }
        }
      } else {
        if (typeof array[mid+1] === 'undefined'){
          return null;
        } else if (array[mid+1][length-1] === value) {
          return [mid+1, length-1];
        } else if (array[mid+1][length-1] > value) {
          return mid + 1;
        } else {
          let second = findUpperBound(right, value, length);
          if (second !== null) {
            return 1 + left.length + second;
          } else {
            return null;
          }
        }
      }
    }
  }
}

function binarySearch(array, value){
  if (array.length < 1) {
    return null;
  } else {
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid+1, array.length);

    if (array[mid] === value) {
      return mid;
    } else if (array[mid] > value) {
      let leftResult = binarySearch(left, value);
      if (leftResult !== null) {
        return leftResult;
      } else {
        return null;
      }
    } else {
      let rightResult = binarySearch(right, value);
      if (rightResult !== null) {
        return 1+ left.length + rightResult;
      } else {
        return null;
      }
    }
  }
}


function sortedMatrixSearch(array, value){
  let length = array[0].length;
  let lower_bound = findLowerBound(array, value);
  let upper_bound = findUpperBound(array, value, length);

  if (lower_bound === null) {
    if (array[0][0] > value) {
      return null;
    } else {
      lower_bound = array.length - 1;
    }
  } else if (lower_bound.constructor === Array) {
    return lower_bound;
  }

  if (upper_bound === null) {
    if (array[array.length-1][length-1] < value) {
      return null;
    } else {
      upper_bound = 0;
    }
  } else if (upper_bound.constructor === Array) {
    return upper_bound;
  }

  for(i=upper_bound; i<=lower_bound; i++){
    let temp = binarySearch(array[i], value);
    if (temp !== null) {
      return [i, temp];
    }
  }

  return null;
}
