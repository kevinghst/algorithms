function sortFunction(a,b){
  if(a[0] === b[0]){
    return 0;
  } else {
    return (a[0]<b[0]) ? -1 : 1;
  }
}

function circusTower(array){
  array.sort(sortFunction);

  let output = [];
  output.push([array[0]]);

  for(let i=1; i<array.length; i++){
    let maxIdx = -1;
    let maxLength = 0;
    for(let j=0; j<output.length; j++){
      let localLength = 0;
      for(let x=0; x<output[j].length; x++){
        if(output[j][x][1] < array[i][1]){
          localLength += 1;
        } else {
          break;
        }
      }
      if(localLength > maxLength){
        maxLength = localLength;
        maxIdx = j;
      }
    }
    if(maxLength === 0){
      output.push([array[i]]);
    } else {
      if(output[maxIdx].length === maxLength){
        output[maxIdx].push(array[i]);
      } else {
        let sub = output[maxIdx].slice(0, maxLength);
        sub.push(array[i]);
        output.push(sub);
      }
    }
  }

  let maxLength = 0;
  let maxIdx = 0;

  for(let i=0; i<output.length; i++){
    if(output[i].length > maxLength){
      maxIdx = i;
      maxLength = output[i].length;
    }
  }

  return output[maxIdx];


}


let array = [[65,90], [70,150], [56,100], [75,190], [60,95], [68,110]];

console.log(circusTower(array));
