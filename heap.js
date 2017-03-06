function BinaryMinHeap(array){
  this.array = array;

}

BinaryMinHeap.prototype.left_child = function(parent){
  if(parent * 2 + 1 < this.array.length){
    return parent * 2 + 1;
  } else {
    return null;
  }
};

BinaryMinHeap.prototype.right_child = function(parent){
  if(parent * 2 + 2 < this.array.length){
    return parent * 2 + 2;
  } else {
    return null;
  }
};

BinaryMinHeap.prototype.parent = function(child){
  return Math.floor((child-1)/2);
};


BinaryMinHeap.prototype.heapyify_down = function(idx){
  while((this.array[idx] > this.array[this.left_child(idx)] && this.left_child(idx) !== null) || (this.array[idx] > this.array[this.right_child(idx)] && this.right_child(idx) !== null)){
    if(this.left_child(idx) === null){
      let temp = this.array[idx];
      this.array[idx] = this.array[this.right_child(idx)];
      this.array[this.right_child(idx)] = temp;
      idx = this.right_child(idx);
    } else if(this.right_child(idx) === null){
      let temp = this.array[idx];
      this.array[idx] = this.array[this.left_child(idx)];
      this.array[this.left_child(idx)] = temp;
      idx = this.left_child(idx);
    } else {
      let minPos = this.left_child(idx);
      if(this.array[this.left_child(idx)] > this.array[this.right_child(idx)]){
        minPos = this.right_child(idx);
      }
      let temp = this.array[idx];
      this.array[idx] = this.array[minPos];
      this.array[minPos] = temp;
      idx = minPos;
    }
  }
};

BinaryMinHeap.prototype.heapyify_up = function(idx){
  while(this.array[this.parent(idx)] > this.array[idx]){
    let temp = this.array[idx];
    this.array[idx] = this.array[this.parent(idx)];
    this.array[this.parent(idx)] = temp;
    idx = this.parent(idx);
  }
};

BinaryMinHeap.prototype.push = function(int){
  this.array.push(int);
  this.heapyify_up(this.array.length-1);
};

BinaryMinHeap.prototype.peek = function(){
  return this.array[0];
};

BinaryMinHeap.prototype.extract = function(){
  this.array[0] = this.array[this.array.length-1];
  this.array.pop();
  this.heapyify_down(0);
};

BinaryMinHeap.prototype.count = function(){
  return this.array.length;
};


let heap = new BinaryMinHeap([]);

heap.push(7);
heap.push(10);
heap.push(12);
heap.push(8);
heap.push(5);
heap.push(15);
heap.push(11);



console.log(heap.array);
heap.extract();
console.log(heap.array);

Array.prototype.heap_sort = function(array){
  //Step 1 - make array into minheap
  let wall = 1;
  while(wall < array.length){
    
  }
};
