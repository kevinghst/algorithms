
class Link
  attr_accessor :key, :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end
end

class LinkedList
  include Enumerable

  def initialize
    @head = Link.new(nil,nil)
    @tail = Link.new(nil,nil)
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head
  end

  def last
    @tail
  end

  def empty?
    self.first.next == self.last
  end

  def get(key)
    return nil if empty?
    current = self.first
    until current == self.last
      return current.val if current.key == key
      current = current.next
    end
    return nil
  end

  def include?(key)
    return false if empty?
    current = self.first
    until current == self.last
      return true if current.key == key
      current = current.next
    end
    return false
  end

  def insert(key, val)
    link = Link.new(key,val)
    last.prev.next = link
    link.prev = last.prev
    last.prev = link
    link.next = last
    link
  end

  def insertLink(link)
    last.prev.next = link
    link.prev = last.prev
    last.prev = link
    link.next = last
    link
  end

  def remove_pos(i)
    current = nil;
    self.each_with_index do |link, j|
      if i == j
        current = link
        current.prev.next = current.next
        current.next.prev = current.prev
        current.next = nil
        current.prev = nil
        break
      end
    end
  end

  def remove(key)
    current = self.first
    until current == self.last
      if current.key == key
        current.prev.next = current.next
        current.next.prev = current.prev
        current.next = nil
        current.prev = nil
        break
      end
    current = current.next
    end
  end

  def each(&prc)
    current = self.first.next
    until current.key == nil
	prc.call(current)
      current = current.next
    end
  end

  def count
    num = 0
    self.each do |link|
      num += 1
    end
    num
  end

  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
