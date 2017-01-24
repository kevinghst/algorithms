require 'byebug'

class BSTNode
  attr_accessor :left, :right, :value, :parent
  attr_reader :value

  def initialize(value)
    @left = nil
    @right = nil
    @value = value
    @parent = nil
  end
end

class BinarySearchTree
  attr_accessor :root

  def initialize
    @root = nil
  end

  def insert(value)
    if @root == nil
      @root = self.class.insert!(nil, value)
    else
      self.class.insert!(@root, value)
    end
  end

  def self.insert!(node, value)
    if node
      if value > node.value
        node.right = BinarySearchTree.insert!(node.right, value)
        node.right.parent = node
      else
        node.left = BinarySearchTree.insert!(node.left, value)
        node.left.parent = node
      end
      return node
    else
      return BSTNode.new(value)
    end
  end

  def find(value)
    self.class.find!(@root, value)
  end

  def inorder
    self.class.inorder!(@root)
  end

  def postorder
    self.class.postorder!(@root)
  end

  def preorder
    self.class.preorder!(@root)
  end

  def height
    self.class.height!(@root)
  end

  def min
    self.class.min(@root)
  end

  def max
    self.class.max(@root)
  end

  def delete(value)
    self.class.delete!(@root, value)
  end

  def next_node(node, level, value)
    if level == 0
      if node.right != nil
        return node.right.value
      else
        next_node(node, 1, value)
      end
    else
      if node == @root
        return nil
      else
        if node.parent.value >= value
          return node.parent.value
        else
          next_node(node.parent, 1, value)
        end
      end
    end
  end



  # DFS
  def self.find!(node, value)
    if node == nil
      return nil
    elsif node.value == value
      return node
    else
      result_left = self.find!(node.left, value)
      return result_left unless result_left == nil
      result_right = self.find!(node.right, value)
      return result_right unless result_right == nil
    end
  end

  def self.inorder!(node)
    if node
      return self.inorder!(node.left) + [node.value] + self.inorder!(node.right)
    else
      return []
    end
  end

  def self.preorder!(node)
    if node
      return [node.value] + self.preorder!(node.left) + self.preorder!(node.right)
    else
      return []
    end
  end

  def self.postorder!(node)
    if node
      return self.postorder!(node.left) + self.postorder!(node.right) + [node.value]
    else
      return []
    end
  end

  def self.height!(node)
    if node
      if node.left == nil && node.right == nil
        return 0
      else
        left = self.height!(node.left) # -1
        right = self.height!(node.right) # 1
        max = left > right ? left : right
        return 1 + max
      end
    else
      return -1
    end
  end

  def self.max(node)
    if node
      return node if node.right == nil
      self.max(node.right)
    else
      return nil
    end
  end

  def self.min(node)
    if node
      return node if node.left == nil
      self.min(node.left)
    else
      return nil
    end
  end

  def self.delete_min!(node)
    if node
      if node.left == nil
        return node.right
      else
        node.left = self.delete_min!(node.left)
      end
    else
      return nil
    end
  end

  def self.delete!(node, value)
    if node
      target = self.find!(node, value)
      return nil if target == nil
      if target.parent
        if target.parent.left == target
          target.parent.left = nil
        else
          target.parent.right = nil
        end
      else
        target = nil
      end
    else
      return nil
    end
  end
end



tree = BinarySearchTree.new
tree.insert(5)
tree.insert(3)
tree.insert(10)
tree.insert(1)
tree.insert(4)
tree.insert(0)
tree.insert(2)
tree.insert(4)
tree.insert(8)
tree.insert(15)
tree.insert(7)
tree.insert(9)
tree.insert(14)
tree.insert(16)

node = tree.find(2)

p tree.next_node(node, 0, node.value)
