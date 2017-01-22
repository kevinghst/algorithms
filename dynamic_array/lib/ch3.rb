require_relative "static_array"
require_relative "dynamic_array"
require "byebug"

# Describe how you could use a single array to implement three stacks

class TripleStack
  attr_accessor :store, :capacities, :lengths

  def initialize
    self.store = StaticArray.new(15)
    self.lengths = { 0 => 0, 1 => 0, 2 => 0 }
    self.capacities = { 0 => 5, 1 => 5, 2 => 5 }
  end

  def [](stack)
    pos = self.lengths[0]
    if stack == 1
      pos = self.capacities[0] + self.lengths[1]
    elsif stack == 2
      pos = self.capacities[0] + self.capacities[1] + self.lengths[2]
    end
    return pos
  end

  def peek(stack)
    pos = self[stack] - 1
    self.store[pos]
  end

  def pop(stack)
    pos = self[stack] - 1
    if self.lengths[stack] > 0
      self.store[pos] = nil
      self.lengths[stack] = self.lengths[stack] - 1
    end
  end

  def push(stack, val)
    resize!(stack) if self.lengths[stack] == self.capacities[stack]

    pos = self[stack]

    self.store[pos] = val
    self.lengths[stack] += 1
  end

  def length
    self.capacities[0] + self.capacities[1] + self.capacities[2]
  end

  def resize!(stack)
    new_capacity = self.capacities[0] + self.capacities[1] + self.capacities[2] + self.capacities[stack]
    new_store = StaticArray.new(new_capacity)

    breakpoint = self.capacities[0]
    if stack == 1
      breakpoint = self.capacities[0] + self.capacities[1]
    elsif stack == 2
      breakpoint = self.length
    end
    i = 0
    j = 0
    while i < self.length
      if j == breakpoint
        j += self.capacities[stack]
      end
      new_store[j] = self.store[i]
      i = i+1
      j = j+1
    end
    self.capacities[stack] = self.capacities[stack] * 2
    self.store = new_store
  end

end


# how would you design a stack which, in addition to push and pop, has a function min which returns the minimum
# element? Push, pop, and min should all operate in O(1) time.

class Stack

  attr_accessor :length, :capacity, :store, :minHash, :timepoint

  def initialize
    self.store = StaticArray.new(8)
    self.length = 0
    self.capacity = 8
    self.minHash = {}
    self.timepoint = 0
  end

  def [](index)
    if index > (self.length  - 1)
      raise "index out of bounds"
    end
    self.store[index]
  end

  def []=(index, value)
    self.store[index] = value
  end

  def push(val)
    resize! if self.length == self.capacity
    self[self.length] = val
    self.length += 1
    self.timepoint += 1

    if self.timepoint == 1
      self.minHash[1] = val
    else
      if self.minHash[self.timepoint-1]
        minimum = self.minHash[self.timepoint - 1]
        minimum > val ? self.minHash[self.timepoint] = val : self.minHash[self.timepoint] = minimum
      end
    end
  end

  def min
    self.minHash[self.timepoint]
  end

  def pop
    raise "index out of bounds" if self.length == 0

    var = self[self.length - 1]
    self[self.length - 1] = nil

    self.length -= 1


    self.minHash[timepoint] = self.minHash[timepoint - 1]
    return var
  end

  def peek
    self[self.length - 1]
  end

  def resize!
    new_capacity = @capacity * 2
    new_store = StaticArray.new(new_capacity)
    self.length.times{ |idx| new_store[idx] = self[idx] }
    self.capacity = new_capacity
    self.store = new_store
  end
end

# write a program to sort a stack such that the smallest items are on the top. You can use
# an additional temporary stack, but you may not copy the elements into any other data structure
# (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty


def sortStack(stack)
  new_stack = Stack.new
  until stack.length == 0
    if new_stack.length == 0
      new_stack.push(stack.pop)
    elsif stack.peek >= new_stack.peek
      new_stack.push(stack.pop)
    else
      var = stack.pop
      until new_stack.length == 0 || new_stack.peek < var
        stack.push(new_stack.pop)
      end
      new_stack.push(var)
      until stack.length == 0 || stack.peek < new_stack.peek
        new_stack.push(stack.pop)
      end
    end
  end
  return new_stack
end
