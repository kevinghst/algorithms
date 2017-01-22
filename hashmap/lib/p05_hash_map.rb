require_relative 'p02_hashing'
require_relative 'p04_linked_list'

class HashMap
  attr_reader :count, :store
  include Enumerable

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    @store[bucket(key)].include?(key)
  end

  def count
    count = 0
    @store.each do |list|
      list.each do |link|
        count += 1 if link.val
      end
    end
    count
  end

  def set(key, val)
    resize! if @count == num_buckets
    if @store[bucket(key)].include?(key)
      @store[bucket(key)].each do |link|
        link.val = val if link.key == key
      end
    else
      @store[bucket(key)].insert(key, val)
      @count += 1
    end
  end

  def get(key)
    @store[bucket(key)].get(key)
  end

  def delete(key)
    @store[bucket(key)].remove(key)
  end

  def each(&prc)
    @store.each do |list|
      list.each do |link|
        prc.call(link.key, link.val)
      end
    end
  end

  # uncomment when you have Enumerable included
  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k.to_s} => #{v.to_s}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    temp = @store.dup
    @store = Array.new(num_buckets * 2) { LinkedList.new }
    temp.each do |list|
      list.each do |link|
        self.set(link.key, link.val)
      end
    end
  end

  def bucket(key)
    num = key.to_s.hash
    num % num_buckets
  end
end

# list = LinkedList.new
# link = list.insert(2, 4)
# map = HashMap.new
# map.set(2, link)
# p map.get(2).val
