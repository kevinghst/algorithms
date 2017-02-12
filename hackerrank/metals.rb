# https://www.hackerrank.com/contests/juniper-hackathon/challenges/metals

def highest_profit(cpc, mp, metals)
  highest = 0

  max = metals.max

  i = 1
  while i <= max
    profit = current_profit(cpc, mp, metals, i)
    highest = profit if profit > highest
    i = i+1
  end

  return highest
end


def current_profit(cpc, mp, metals, length)
  numbers = 0
  cuts = 0

  metals.each do |metal|
    numbers += (metal / length)
    cut = metal / length

    if metal % length == 0
      cuts += (cut - 1)
    else
      cuts += cut
    end

  end
  return length * numbers * mp - cuts * cpc
end

cpc = cost per cut
mp = metal price
metals = an array of metal lengths

# Explanation:
# First, I iterate through the array of metal lengths to find the longest one. We know that the final length of uniform metals must be somewhere between
# 1 and the max number. Then, I iterate through 1 and the maximum length, for each length, I calculate the profit that would be generated if all the metals
# were cut into that length, and constantly compares and stores the highest profit in a variable.
# The method current_profit is used to calculate the profit given a predetermined final length. The formula for calculating the profit would be
# (metal price)*(total number of metals)*(final_length) - (number of cuts)*(cost per cut). We already know metal price, final_length, and cost per cut.
# To find total number of metals, we iterate over the metal length array, get the rounded down division product of the current metal length by final_length which
# accounts for the number of final_metals that can be cut from the current metal, and add it to a total number index. To get the total number of cuts, we
# perform the same operation sequence except that the number of cuts for a target metal length is (target metal length / final length) - 1 if the target metal length
# can be cut evenly.
