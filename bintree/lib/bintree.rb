require "byebug"

class BTnode
  attr_accessor :left, :right, :value, :parent
  attr_reader :value

  def initialize(value)
    @left = nil
    @right = nil
    @value = value
    @parent = nil
  end
end


def checkBalanced(node, level)
  if node == nil
    return level
  else
    level = level + 1
    left_depth = checkBalanced(node.left, level)
    right_depth = checkBalanced(node.right, level)

    if (left_depth - right_depth).abs > 1
      raise "not balanced"
    else
      return [left_depth, right_depth].max
    end
  end
end


# Implement a function to check if a binary tree is a binary search tree

def validateBST(root)
  queue = [root]

  i = 0
  until i == queue.length
    current = queue[i]
    if current.left == nil && current.right == nil
      i = i + 1
      next
    elsif current.left && current.right == nil
      if current.left.value > current.value
        return false
      else
        queue.push(current.left)
      end
    elsif current.right && current.left == nil
      if current.right.value <= current.value
        return false
      else
        queue.push(current.right)
      end
    else
      if (current.left.value > current.value) || (current.right.value <= current.value)
        return false
      else
        queue.push(current.left)
        queue.push(current.right)
      end
    end
    i = i+1
  end
  return true
end
