require_relative "static_array"

class RingBuffer
  attr_reader :length

  def initialize
    self.store = StaticArray.new(8)
    self.length = 0
    self.capacity = 8
    self.start_idx = 0
  end

  def idx(i)
    (self.start_idx + i)% self.capacity
  end

  # O(1)
  def [](index)
    raise "index out of bounds" if index > (self.length - 1)
    self.store[idx(index)]
  end

  # O(1)
  def []=(index, val)
    self.store[idx(index)] = val
  end

  # O(1)
  def pop
    raise "index out of bounds" if self.length == 0
    self.length -= 1
    self.store[idx(self.length)]
  end

  # O(1) ammortized
  def push(val)
    resize! if self.length == self.capacity
    self.store[idx(self.length)] = val
    self.length += 1
  end

  # O(1)
  def shift
    raise "index out of bounds" if self.length == 0
    val = self[0]
    self.start_idx = (self.start_idx + 1) % self.capacity
    self.length -= 1
    val
  end

  # O(1) ammortized
  def unshift(val)
    resize! if self.length == self.capacity
    idx = idx(-1)
    self.store[idx] = val
    self.start_idx = idx
    self.length += 1
  end

  protected
  attr_accessor :capacity, :start_idx, :store
  attr_writer :length

  def check_index(index)
  end

  def resize!
    new_capacity = @capacity * 2
    new_store = StaticArray.new(new_capacity)
    self.length.times{ |idx| new_store[idx] =  self[idx] }
    self.start_idx = 0
    self.capacity = new_capacity
    self.store = new_store
  end
end
