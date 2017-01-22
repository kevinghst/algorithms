# This class just dumbs down a regular Array to be staticly sized.
class StaticArray
  def initialize(length)
    arr = []
    i = 0
    while i < length
      arr.push(nil)
      i = i+1
    end
    self.store = arr
  end

  # O(1)
  def [](index)
    self.store[index]
  end

  # O(1)
  def []=(index, value)
    self.store[index] = value
  end

  protected
  attr_accessor :store
end



# arr = [1,2,6,6,1]
# arr[4]
