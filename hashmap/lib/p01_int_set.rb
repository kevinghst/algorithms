class MaxIntSet
  def initialize(max)
    @store = Array.new(max, false)
    @max = max
  end

  def insert(num)
    validate!(num)
    @store[num] = true
  end

  def remove(num)
    validate!(num)
    @store[num] = false
  end

  def include?(num)
    validate!(num)
    @store[num]
  end

  private

  def is_valid?(num)
    num <= @max && num > 0
  end

  def validate!(num)
    raise "Out of bounds" unless is_valid?(num)
  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    @store[self[num]].push(num)
  end

  def remove(num)
    @store[self[num]].delete(num)
  end

  def include?(num)
    @store[self[num]].include?(num)
  end

  private

  def [](num)
    num % num_buckets
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    resize! if @count == num_buckets
    @store[self[num]].push(num)
    @count += 1
  end

  def remove(num)
    @store[self[num]].delete(num)
  end

  def include?(num)
    @store[self[num]].include?(num)
  end

  private

  def [](num)
    num % num_buckets
  end

  def num_buckets
    @store.length
  end

  def resize!
    new_store = Array.new(num_buckets * 2) { Array.new }
    @store.each do |bucket|
      bucket.each do |number|
        new_store[number % (num_buckets * 2)].push number
      end
    end
    @store = new_store 
  end
end
