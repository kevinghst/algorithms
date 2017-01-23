three = Node.new(3)
four = Node.new(4)
five = Node.new(5)
six = Node.new(6)
ten = Node.new(10)

three.children = [four, five, six]

six.children = [ten, three]

graph = Graph.new

graph.nodes = [three, four, five, six, ten]

p graph.route_exist?(three, ten)

class Graph
  attr_accessor :nodes

  def initialize
    @nodes = []
  end

  def route_exist?(one, two)
    if one.visited
      return false
    else
      one.visited = true
    end

    if one == two
      return true
    elsif one.children.length == 0
      return false
    else
      one.children.each do |child|
        result = self.route_exist?(child, two)
        unless result == false
          return result
        end
      end
    end
    return false
  end

  def reset_visit
    self.nodes.each do |node|
      node.visited = false
    end
  end
end

class Node
  attr_accessor :children, :visited, :val

  def initialize(val)
    @children = []
    @visited = false
    @val = val
  end
end

# Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.
