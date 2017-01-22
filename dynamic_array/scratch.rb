class DynamicArray
  def initialize(capacity = 8)
    @store = StaticArray(capacity)
    @count = 0
    @capacity = capacity
    @start_idx = 0
  end

  # do modular arithmetic
  def idx(i)
    (@start_idx + i)% @capacity
  end

  def[](i)
    @store[idx(i)]
  end

  def[](i, val)
      @store[idx(i)] = val
  end

  def push(val)
    resize! if @count == @capacity
    @store[idx(@count)] = val
    @count += 1
  end

  def pop
    @count -= 1
    @store[idx(@count)]
  end

  def unshift(val)
    resize! if @count == @capacity
    idx = idx(-1)
    @store(idx) = val
    @start_idx = idx
    @count += 1
  end

  def shift
    val = self[0]
    @start_idx = (@start_idx + 1) % @capacity
    @count -= 1
    val
  end

  def resize!
    new_capacity = @capacity * 2
    new_store = StaticArray(new_capacity)
    @count.times{ |idx| new_store[idx] = self[idx] }
    @start_idx = 0
    @capacity = new_capacity
    @store = new_store
  end


end
