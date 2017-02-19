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
