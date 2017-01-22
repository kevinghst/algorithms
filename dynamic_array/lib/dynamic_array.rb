require_relative "static_array"
require "byebug"

class DynamicArray
  attr_reader :length

  def initialize
    self.store = StaticArray.new(8)
    self.length = 0
    self.capacity = 8
    self.start_idx = 0
  end

  # O(1)
  def [](index)
    raise "index out of bounds" if index > (self.length - 1)
    self.store[index]
  end

  # O(1)
  def []=(index, value)
    self.store[index] = value
  end

  # O(1)
  def pop
    if self.length == 0
      raise "index out of bounds"
    end
    self.length -= 1
    self.store[self.length]
  end

  # O(1) ammortized; O(n) worst case. Variable because of the possible
  # resize.
  def push(val)
    resize! if self.length == self.capacity
    self[self.length] = val
    self.length += 1
  end

  # O(n): has to shift over all the elements.
  def shift
    raise "index out of bounds" if self.length == 0
    first = self[0]
    self.length = self.length - 1
    (self.length).times{ |idx| self.store[idx] = self.store[idx+1] }
    return first
  end

  # O(n): has to shift over all the elements.
  def unshift(val)
    resize! if self.length == self.capacity
    self.length.times{ |idx| self[self.length-idx] = self[self.length-idx-1] }
    self[0] = val
    self.length = self.length + 1
  end

  protected
  attr_accessor :capacity, :store, :start_idx
  attr_writer :length

  def check_index(index)
  end

  # O(n): has to copy over all the elements to the new store.
  def resize!
    new_capacity = @capacity * 2
    new_store = StaticArray.new(new_capacity)
    self.length.times{ |idx| new_store[idx] = self[idx] }
    self.capacity = new_capacity
    self.store = new_store
  end
end
