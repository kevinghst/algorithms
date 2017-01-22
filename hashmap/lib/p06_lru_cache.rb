require_relative 'p05_hash_map'
require_relative 'p04_linked_list'
require 'byebug'

class LRUCache
  attr_reader :count
  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    @map.count
  end

  def update_link(key, value)
    if @map.include?(key)
      @store.remove(key)
      @store.insert(key, value)
    else
      link = @store.insert(key, value)
      @map.set(key, link)
      eject! if @map.count > @max
    end
  end

  def get(key)
    # @map.get(key) returns nil
    if @map.get(key)
      @map.get(key).val
    else
      value = @prc.call(key)
      self.update_link(key, value)
      value
    end
  end

  def to_s
    "Map: " + @map.to_s + "\n" + "Store: " + @store.to_s
  end

  private

  def calc!(key)
    # suggested helper method; insert an (un-cached) key
  end

  def eject!
    delete_key = @store.first.next.key
    @store.remove(delete_key)
    @map.delete(delete_key)
  end

  def bucket(key)
    num = key.to_s.hash
    num % @map.num_buckets
  end
end
