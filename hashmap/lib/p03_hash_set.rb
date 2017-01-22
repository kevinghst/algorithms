require_relative 'p02_hashing'
require 'byebug'

# The point of a hashset is to allow us to insert things other than numbers
# into our set

class HashSet
  attr_reader :count, :store

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    num = key.hash
    resize! if @count == num_buckets
    @store[self[num]].push(key)
    @count += 1
  end

  def include?(key)
    num = key.hash
    @store[self[num]].include?(key)
  end

  def remove(key)
    num = key.hash
    @store[self[num]].delete(key)
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
