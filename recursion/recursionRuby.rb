require "byebug"

def tripleSteps(n, hash)
  if hash[n]
    return hash[n]
  else
    value = tripleSteps(n-1, hash) + tripleSteps(n-2, hash) + tripleSteps(n-3, hash)
    hash[n] = value
    return value
  end
end



def robotGrid(width, height, hash, current_pos)
  x = current_pos[0]
  y = current_pos[1]

  if width == x && height == y
    return [current_pos]
  elsif x > width || y > height || hash[current_pos]
    return nil
  else
    value = robotGrid(width, height, hash, [x+1, y])
    if value
      return [current_pos] + value
    else
      sec_value = robotGrid(width, height, hash, [x, y+1])
      if sec_value
        return [current_pos] + sec_value
      else
        return nil
      end
    end
  end
end


def magicIndex(array, diff)
  if array.length == 0
    return nil
  end

  mid = array.length / 2
  left = array[0...mid]
  right = array[mid+1...array.length]

  if mid == array[mid] - diff
    return mid
  elsif array[mid] > mid
    return  magicIndex(left, diff)
  else
    new_diff = 1 + left.length
    result = magicIndex(right, new_diff)
    if result == nil
      return nil
    else
      return left.length + 1 + result
    end
  end
end

def powerSet(array)
  if array.length == 0
    return [array]
  else
    last = array.pop
    result = powerSet(array)
    new_arr = []
    result.each do |arr|
      dup = arr.dup
      dup.push(last)
      new_arr.push(dup)
    end
    return result + new_arr
  end
end

def recursiveMultiply(x, y, remainder, level)
  if level == 0
    if y > x
      recursiveMultiply(y, x, 0, 1)
    else
      recursiveMultiply(x, y, 0, 1)
    end
  else
    if y == 1
      return x + remainder
    else
      new_x = x + x
      new_y = y / 2
      if y % 2 == 0
        recursiveMultiply(new_x, new_y, remainder, 1)
      else
        recursiveMultiply(new_x, new_y, remainder + x, 1)
      end
    end
  end
end

def tower(stacks, n, b, e, o)
  if n == 1
    holder = stacks[b].pop
    stacks[e].push(holder)
    return stacks
  else
    interm = tower(stacks, n-1, b, o, e)
    holder = interm[b].pop
    interm[e].push(holder)
    final=tower(interm, n-1, o, e, b)
    return final
  end
end

def brutePermutation(string)
  if string.length == 1
    return [string]
  else
    final = []

    i = 0
    while i < string.length
      dup = string.dup
      char = dup.slice!(i)

      values = brutePermutation(dup)

      values.map! {|substr| char + substr}

      final = final + values

      i+=1
    end
    return final
  end
end

def permutation(string, hash)
  if string.length == 1
    return [string]
  else
    final = []

    i = 0
    while i < string.length
      dup = string.dup
      char = dup.slice!(i)

      if hash[dup]
        values = hash[dup].dup
        values.map! {|substr| char + substr}
      else
        values = permutation(dup, hash)
        values.map! {|substr| char + substr}
        hash[string] = values
      end

      final = final + values

      i+=1
    end
    return final
  end
end

p brutePermutation("abcdefghijz")
# p permutation("abcdefghijz", {})
