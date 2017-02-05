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


p robotGrid(3, 3, {[3,1] => true}, [0,0])
