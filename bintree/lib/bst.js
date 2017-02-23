function BSTNode (value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
}


function BST () {
  this.root = null;
}


BST.prototype.insert = function(node, value) {
  let newNode = new BSTNode(value);
  if(this.root === null){
    this.root = newNode;
  } else {
    if(value <= node.value){
      if(node.left === null){
        node.left = newNode;
        newNode.parent = node;
      } else {
        this.insert(node.left, value);
      }
    } else {
      if(node.right === null){
        node.right = newNode;
        newNode.parent = node;
      } else {
        this.insert(node.right, value);
      }
    }
  }
};

BST.prototype.inorder = function(node){

  if(node===null){
    return [];
  } else {
    let left_array = this.inorder(node.left);
    let right_array = this.inorder(node.right);
    return left_array.concat([node.value]).concat(right_array);
  }
};

BST.prototype.preorder = function(node){

  if(node===null){
    return [];
  } else {
    let left_array = this.preorder(node.left);
    let right_array = this.preorder(node.right);
    return [node.value].concat(left_array).concat(right_array);
  }
};


BST.prototype.delete = function(node, value){
  if(node === null) {
    throw "no node available!";
  } else if (node.value === value){
    if(node.left === null && node.right === null){
      if(node.parent.left === node){
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
    } else if
  } else {
    if (value > node.value){
      this.delete(node.right, value);
    } else {
      this.delete(node.left, value);
    }
  }

};


let newTree = new BST();

newTree.insert(newTree.root, 5);
newTree.insert(newTree.root,3);
newTree.insert(newTree.root,7);

newTree.insert(newTree.root, 2);
newTree.insert(newTree.root,4);
newTree.insert(newTree.root,6);
newTree.insert(newTree.root,15);


console.log(newTree.preorder(newTree.root));
