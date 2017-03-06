function conversion(a, b){
  let count = 0;
  for(let c = a ^ b; c !== 0; c = c >> 1){
    count += c & 1;
  }
  return count;
}

function pairwiseSwap(int){
  let evenMask = 0xaa;
  let oddMask = evenMask >> 1;

  return (((int >> 1) & oddMask) | ((int << 1) & evenMask)).toString(2);
}

function drawLine(array, width, x1, x2, y){
  let start = width / 8 * y + Math.floor(x1/8);
  array[start] = (parseInt(array[start], 2) | (parseInt("11111111",2) >> x1%8)).toString(2);

  let end = width / 8 * y + Math.floor(x2/8);
  for(let i = start+1; i<end; i++){
    array[i] = "11111111";
  }
  array[end] = (parseInt(array[end], 2) | ((parseInt("11111111",2) << (8-x2%8-1)) & parseInt("11111111",2))).toString(2);
  return array;
}


let array = [
  "00101100",
  "00111110",
  "00000000",
  "11110000",
  "11011001",
  "11110001",
  "00110010",
  "00011100"
];

console.log(drawLine(array, 16, 3, 12, 2));
