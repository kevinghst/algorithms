require 'byebug'

class Fixnum
  # Fixnum#hash already implemented for you
end

class Array
  def hash
    hash_prod = self[0]
    (1...self.length).each do |i|
      hash_prod = hash_prod ^ (self[i].to_s + i.to_s).to_i
    end
    hash_prod.hash
  end
end

class String
  def hash
    int_array = []
    i = 0
    while i < self.length
      int_array << self[i].ord
      i = i+1
    end
    int_array.hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    comb_array = []

    self.each do |key, val|
      comb_array.push((key.to_s + val.to_s).hash)
    end

    comb_array.sort!

    comb_array.hash
  end
end
