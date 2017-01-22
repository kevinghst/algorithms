require_relative 'p04_linked_list'



# 2.1: Write code to remove duplicates from an unsorted linked list


def removeDup(list)
  hash = {}
  count = list.count
  i = 0
  while i < count
    key = list[i].key
    if hash[key]
      list.remove_pos(i)
      i = i-1
      count = count-1
    else
      hash[key] = true
    end
    i = i+1
  end
end

# 2.2: implement an algorithm to find the kth to last element of a singly linked list

def returnK(list, k)
  count = list.count
  target = count - k
  list.each_with_index do |link, j|
    if j == target
      return link
    end
  end
end

def deleteNode(n)
  n.key = n.next.key
  n.val = n.next.val
  n.next.next.prev = n
  n.next = n.next.next
end

def partition(list, x)
  count = list.count
  counter = 0
  i = 0

  while counter < count
    current = list[i]
    if current.val >= x
      list.remove_pos(i)
      list.insert(current.key, current.val)
      i -= 1
    end
  i += 1
  counter += 1
  end
end


def sumLists(one, two)
  list = LinkedList.new
  countOne = one.count
  countTwo = two.count
  bigger = one
  smaller = two

  if countTwo > countOne
    bigger = two
    smaller = one
  end

  biggerCount = bigger.count
  smallerCount = smaller.count

  buffer = 0
  i = 0
  while i < biggerCount
    valX = bigger[i].val
    valY = 0
    valY = smaller[i].val if i < smallerCount

    sum = valX + valY + buffer
    buffer = 0

    if sum >= 10
      sum -= 10
      buffer = 1
    end

    list.insert("what", sum)

    i = i+1
    if (i==biggerCount && buffer == 1)
      list.insert("what", 1)
    end
  end
  return list
end


def palindrome?(list)
	list.each_with_index do |link, j|
		if link.next.key == nil
			x = 0
			y = j
			linkX = list.first.next
			linkY = link
			until x > y
				if linkX.key != linkY.key
					return false
				end
				linkX = linkX.next
				linkY = linkY.prev
				x += 1
				y -= 1
			end
		end
	end
	return true
end

def intersection(listOne, listTwo)
	hash = {}
	listOne.each do |link|
		hash[link] = true
	end

	listTwo.each do |link|
		if hash[link]
			return true
		end
	end
	false
end


def loopDetection(list)
	current = list.last.prev
	hash = {}
	while true
		if hash[current]
			return current
		else
			hash[current] = true
			current = current.prev
		end
	end
end

# Chp 3.6

class Shelter
  attr_accessor :dog_queue, :cat_queue, :counter

  def initialize
    @dog_queue = LinkedList.new
    @cat_queue = LinkedList.new
    @counter = 0
  end

  def queueDog(name)
    self.dog_queue.insert(name, "Dog", self.counter)
    self.counter += 1
  end

  def queueCat(name)
    self.cat_queue.insert(name, "Cat", self.counter)
    self.counter += 1
  end

  def dequeueAny
    if self.dog_queue.count > 0 || self.cat_queue.count > 0
      if self.dog_queue.count == 0
        self.dequeueCat
      elsif self.cat_queue.count == 0
        self.dequeueDog
      else
        if self.dog_queue.first.next.counter > self.cat_queue.first.next.counter
          self.dequeueCat
        else
          self.dequeueDog
        end
      end
    end
  end

  def dequeueDog
    if self.dog_queue.count > 0
      target = self.dog_queue[0]
      self.dog_queue.remove_pos(0)
      return target
    end
  end

  def dequeueCat
    if self.cat_queue.count > 0
      target = self.cat_queue[0]
      self.cat_queue.remove_pos(0)
      return target
    end
  end

end

shelter = Shelter.new

shelter.queueDog("kevin")
shelter.queueCat("bruce")
shelter.queueDog("Snoop")
shelter.queueCat("Cindy")

p shelter.dequeueCat.key
