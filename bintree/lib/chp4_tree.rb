require_relative "bst.rb"
require_relative "p04_linked_list.rb"
require "byebug"

# Given a sorted (increasing order) array with unique integer elements, write an
# algorithm to create a binary search tree with minimal height.

tree = BinarySearchTree.new

def minimal_tree(tree, array)
  if array.length == 1
    tree.insert(array[0])
  else
    middle = array.length / 2
    middle_el = array[middle]

    tree.insert(middle_el)

    left_arr = array[0...middle]
    right_arr = array[middle+1...array.length]

    minimal_tree(tree, left_arr) if left_arr.length > 0
    minimal_tree(tree, right_arr) if right_arr.length > 0
  end
end

minimal_tree(tree, [2,3,5,7,8,9,10])


# Give a binary tree, design an algorithm which creates a linked list of all the
# nodes at each depth (e.g: if you have a tree with depth D, you'll have D liked lists)

def listDepth(tree)
  queue = [tree.root]
  i = 0
  until i == queue.length
    queue.push(queue[i].left) unless queue[i].left == nil
    queue.push(queue[i].right) unless queue[i].right == nil
    i += 1
  end
  queueValue = []
  queue.each do |node|
    queueValue.push(node.value)
  end
  lists = []

  i = 0
  j = 0
  while i < queueValue.length
    if (i + 2**j) > queueValue.length
      sub_arr = queueValue[i...queueValue.length]
    else
      sub_arr = queueValue[i...i+2**j]
    end
    list = LinkedList.new
    sub_arr.each do |value|
      list.insert(value, value)
    end
    lists.push(list)
    i = i + 2**j
    j = j + 1
  end
  return lists
end


# T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create an
# algorithm to determine if T2 is a subtree of T1.

def check_subtree(sub_root, small_root)
  if sub_root.value != small_root.value
    raise "does not match"
  elsif sub_root == nil && small_root == nil
    return nil
  else
    if sub_root.left != nil
      left_value = check_subtree(sub_root.left, small_root.left)
    end
    if sub_root.right != nil
      right_value = check_subtree(sub_root.right, small_root.right)
    end
  end
end

def subtree(big, small)
  smallQueue = [small.root]
  i = 0
  until i == smallQueue.length
    if smallQueue[i].left != nil
      smallQueue.push(smallQueue[i].left)
    end
    if smallQueue[i].right != nil
      smallQueue.push(smallQueue[i].right)
    end
    i = i+1
  end

  smallDepth = small.height
  bigDepth = big.height

  level = 0
  x = 0
  y = 1

  bigQueue = [big.root]
  i = 0
  until level > (bigDepth - smallDepth)
    if x == 0
      x = y
      y = 0
      level += 1
    end
    x = x - 1
    if bigQueue[i].left != nil
      bigQueue.push(bigQueue[i].left)
      y += 1
    end
    if bigQueue[i].right != nil
      bigQueue.push(bigQueue[i].right)
      y += 1
    end
    i = i+1
  end
  i = 0
  while i < bigQueue.length
    begin
      if check_subtree(bigQueue[i], small.root) == nil
        return true
      end
    rescue
      i = i + 1
    end
  end
  return false
end
