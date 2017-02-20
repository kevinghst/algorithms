function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.count = 0;
}

function BinarySearchTree(){
  this.root = null;
}

BinarySearchTree.prototype.push = function(val) {

  var root = this.root;

  if (root === null) {
    this.root = new Node(val);
  } else {

    var currentNode = this.root;
    var newNode = new Node(val);

    while (currentNode) {
      if (val <= currentNode.value) {
        if (currentNode.left === null) {
          currentNode.count += 1;
          currentNode.left = newNode;
          break;
        } else {
          currentNode.count += 1;
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.count += 1;
          currentNode.right = newNode;
          break;
        } else {
          currentNode.count += 1;
          currentNode = currentNode.right;
        }
      }
    }
  }
};

BinarySearchTree.prototype.indexOf = function(node, value, counter) {
  if (node === null) {
    return 0;
  } else {
    if (node.value === value) {
      let count = 0;
      if (node.left !== null) { count = node.left.count + 1; }
      return counter + count;
    } else if (value > node.value) {
      let count = 0;
      if (node.left !== null) { count = node.left.count + 1; }
      return this.indexOf(node.right, value, (counter + count + 1));
    } else {
      return this.indexOf(node.left, value, counter);
    }
  }


};

function PeakValleys(array) {
  let first_change = 0;
  let sign = null;

  let i = 0;
  while (i < array.length-1) {
    if(array[i+1] !== array[i]){
      first_change = i;
      if (array[i+1] > array[i]) {
        sign = true;
      } else {
        sign = false;
      }
      break;
    } else {
      if (i === array.length - 2) { return array; }
      i = i+1;
    }
  }

  let j = i+1;
  while (j < array.length-1) {
    if (sign === false) {
      if (array[j+1] > array[j]) {
        sign = true;
      } else {
        let temp = array[j+1];
        array[j+1] = array[j];
        array[j] = temp;
        sign = true;
      }
    } else {
      if (array[j+1] < array[j]) {
        sign = false;
      } else {
        let temp = array[j+1];
        array[j+1] = array[j];
        array[j] = temp;
        sign = false;
      }
    }
    j = j+1;
  }
  return array;
}

let array = [6,5,1,3,8,4,7,9,2];

console.log(PeakValleys(array));
