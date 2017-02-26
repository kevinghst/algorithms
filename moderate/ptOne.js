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
  one.sort(function(a,b) { return  a-b; });
  two.sort(function(a,b) { return  a-b; });
  if(one[0] > two[two.length-1]){
    return (one[0] - two[two.length-1]);
  }
  if (two[0] > one[one.length-1]){
    return (two[0] - one[one.length-1]);
  }

  let biggerArr;
  let smallerArr;

  if(one[0] > two[0]){
    biggerArr = one;
    smallerArr = two;
  } else {
    biggerArr = two;
    smallerArr = one;
  }

  let minimum = biggerArr[0] - smallerArr[0];
  let smallerMore = 0;
  let biggerCurrent = 0;

  while(biggerArr[biggerCurrent] <= smallerArr[smallerArr.length-1]){
    while(smallerArr[smallerMore] < biggerArr[biggerCurrent]){
      smallerMore += 1;
    }

    let local_minimum;
    let diffOne = Math.abs(smallerArr[smallerMore] - biggerArr[biggerCurrent]);
    let diffTwo = Math.abs(smallerArr[smallerMore-1] - biggerArr[biggerCurrent]);

    if (diffOne > diffTwo){
      local_minimum = diffTwo;
    } else {
      local_minimum = diffOne;
    }

    if (minimum > local_minimum) { minimum = local_minimum; }
    biggerCurrent += 1;
  }

  return minimum;

}

function englishInt(num){

  if(num === 0) { return "zero"; }

  let string = num.toString();

  let output = "";
  let shift = 0;

  let i = string.length - 1;
  while(i>=0){
    let frag;
    if(i-1 < 0){
      frag = "00" + string[i];
    } else if (i-2 < 0){
      frag = "0" + string.substring(i-1, i+1);
    } else {
      frag = string.substring(i-2, i+1);
    }
    output = threeDigit(frag, shift) + " " + output;
    i = i-3;
    shift += 1;
  }
  return output.trim();
}

function threeDigit(string, shift){
  let shiftHash = { 0: "", 1:"thousand", 2: "million", 3: "billion" };
  let teens = {"10": "ten", "11": "eleven", "12": "twelve", "13": "thirteen", "14": "fourteen", "15": "fifteen", "16": "sixteen", "17": "seventeen", "18": "eighteen", "19": "nineteen" };
  let tens = {"9": "ninety", "8": "eighty", "7": "seventy", "6": "sixty", "5": "fifty", "4": "forty", "3": "thirty", "2": "twenty", "1": "ten"};
  let ones = {"1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine"};

  if (string === "000") {
    return "";
  } else {


    let output = "";
    if(string[0] !== "0"){
      output = ones[string[0]] + " hundred";
    }

    if(string[1] !== "0"){
      if(string[2] === "0"){
        output = output + " " + tens[string[1]];
        return (output + " " + shiftHash[shift]).trim();
      } else {
        if(string[1] === "1"){
          output = output + " " + teens[string.substring(1,3)];
          return (output + " " + shiftHash[shift]).trim();
        } else {
          output = output + " " + tens[string[1]] + " " + ones[string[2]];
          return (output + " " + shiftHash[shift]).trim();
        }
      }
    }

    if(string[2] !== "0"){
      output = output + " " + ones[string[2]];
    }

    let final_output = output + " " + shiftHash[shift];

    return final_output.trim();

  }

}

function multiply(one, two){
  let smaller;
  let larger;

  if (one > two) {
    larger = one;
    smaller = two;
  } else {
    smaller = one;
    larger = two;
  }

  product = larger;
  for(i=0; i<smaller-1; i++){
    product += larger;
  }
  return product;
}

function substract(one, two){
    if(one === two){
      return 0;
    }

    let final = 0;
    let smaller;
    let larger;

    if (one > two) {
      larger = one;
      smaller = two;
    } else {
      smaller = one;
      larger = two;
    }

    let increment = 1;
    let steps = 0;
    let array = [];
    let stopped = false;

    while (smaller < larger){
      if(smaller + increment <= larger){
        if (smaller + increment === larger){
          if (one > two){
            return steps + increment;
          } else {
            return "-" + (steps + increment).toString();
          }
          return steps + increment;
        } else {
          smaller = smaller + increment;
          steps = steps + increment;
          if(stopped === false){
            array.unshift(increment);
            increment = increment + increment;
          }
        }
      } else {
        stopped = true;
        for(let i =0; i<array.length; i++){
          if(array[i] + smaller <= larger){
            increment = array[i];
          }
        }
      }
    }


    if (one > two){
      return smaller;
    } else {
      return "-" + smaller.toString();
    }
}

function divide(one, two){
  if (two > one){
    return 0;
  }

  if (two === one){
    return 1;
  }

  let final = 0;
  let twoMod = two;
  let hash = { 0: 0 };
  hash[two] = 1;
  let hash_keys = [two, 0];
  let fin = final;

  while(twoMod < one){

    if(final === 0){ final = 1; fin = 1; }
    if(twoMod+two <= one){
      twoMod = twoMod + two;
      final = final + fin;
      hash_keys.unshift(twoMod);
      hash[twoMod] = final;
      fin = final;
      two = twoMod;
    } else {
      for(let i=0; i<hash_keys.length; i++){
        if(twoMod + hash_keys[i] <= one){
          if (hash_keys[i] === 0) {
            return final;
          } else {
            two = hash_keys[i];
            fin = hash[hash_keys[i]];
            break;
          }
        }
      }
    }
  }
  return final;
}


function livingPeople(people){


}


let people = {
  "a": {
    "birth": 6,
    "death": 8
  },

  "b": {
    "birth": 3,
    "death" : 6
  },

  "c": {
    "birth": 4,
    "death" : 7
  },

  "d": {
    "birth": 1,
    "death" : 6
  },

  "e": {
    "birth": 4,
    "death" : 8
  },

};


function divingBoard(n){
  if (n===1) {
    let hash = {};
    hash[1] = true;
    hash[2] = false;
    return hash;
  } else {
    let result = {};
    let prev = divingBoard(n-1);
    let prev_keys = Object.keys(prev);
    prev_keys.forEach(function(key) {
      if (prev[key] === true){
        result[key+1] = true;
        result[key+2] = false;
      } else {
        result[key+2] = false;
      }
    });
    return Object.keys(result);
  }
}
