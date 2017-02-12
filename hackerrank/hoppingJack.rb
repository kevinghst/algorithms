# https://www.hackerrank.com/contests/juniper-hackathon/challenges/hopping-jack

def hoppingJack(n, k)
  hash = {}

  step = 0

  i = 1
  while n > 0
      step = step + i
      hash[step] = true
      i = i+1
      n = n-1
  end

  if hash[k]
    return step-1
  else
    return step
  end
end

n = number of hops
k = broken stair index

# Explanation:
# Let us temporarily assume that there is no broken step. In this case, the maximum staircase index that can be reached is simply (1 + 2 + 3 + ... + n).
# If k did exist, it can be either located at 1) one of the staircase index that the person hops on, or 2) one of the staircase index that the person hops over.
# In the second scenario, it does not affect our maximum staircase index, since the person simply hops over it. So if it was the first scenario, what would we do
# differently to ensure that the person reaches the maximum highest? To do this, we would simply tell our hopper to remain in position for the first hop, where n = 1,
# and let all the subsequent steps remain the same, so that the person would reach (2 + 3 + ... + n) steps after n turns. This will ensure that the person never lands 
# on the broken staircase index, since he will always land one step before index k.
# For my code, I used a hash to store all the indexes the person will hop on assuming there is no missing steps, and find the maximum height in this hypothetical scenario.
# Then, I find out whether the missing step is included in the hash. If it is not, then I return the maximum height; if it is, I return maximum height - 1.
