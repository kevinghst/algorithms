function radixSort(array){
  let hash = {"0":[], "1":[], "2":[], "3":[], "4":[], "5":[], "6":[], "7":[], "8":[], "9":[]};
  let biggest = 0;
  for(let i=0; i<array.length; i++){
    array[i] = array[i].toString();
    if(biggest < array[i].length){
      biggest = array[i].length;
    }
  }

  for(let j=0; j<array.length; j++){
    let diff = biggest - array[j].length;
    for(let z=0; z<diff; z++){
      array[j] = "0" + array[j];
    }
  }

  for(let x=0; x<biggest; x++){
    sort(array, x, biggest-1, hash);
  }
}


function sort(array, time, length, hash){
  array.forEach(function(x){
    hash[x[length-time]].push(x);
  });

  let count = 0;

  for(i=0;i<=9;i++){
    while(hash[i.toString()].length > 0){
      array[count] = hash[i.toString()].shift();
      count += 1;
    }
  }
}

function countingSort(array){
  let biggest = array[0];
  let smallest = array[0];
  for(let i=0; i<array.length; i++){
    if(array[i] > biggest){
      biggest = array[i];
    }
    if(array[i] < smallest){
      smallest = array[i];
    }
  }

  let hash = {};

  for(let x=smallest; x<=biggest; x++){
    hash[x] = 0;
  }

  array.forEach(function(x){
    hash[x] += 1;
  });

  counter = 0;
  for(let x=smallest; x<=biggest; x++){
    counter = counter + hash[x];
    hash[x] = counter;
  }

  let output = new Array(array.length);

  array.forEach(function(x){
    output[hash[x]-1] = x;
    hash[x] = hash[x] - 1;
  });

  for(let i=0;i<output.length;i++){
    array[i] = output[i];
  }
}

//

let arr = [10,15,1,60,5,100,25,50];

countingSort(arr);

console.log(arr);
